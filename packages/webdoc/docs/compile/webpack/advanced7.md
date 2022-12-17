---
title: 进阶-实战6(webpack插件开发)
---

import Thumbnail from "@site/src/components/Thumbnail";

我们将发一个 webpack 插件，通过 webpack 给我们提供的 hook，介入 webpack 编译阶段，完成我们自己想做的事情

我们插件需要达到的目的是：在 webpack 编译的时候，往 index.html 文件中插入 html 版本，由于我们的上篇文章组件是使用 webcomponent 写的，最简单的使用方式自然是，直接在 html 中通过`<script>`标签来使用，我们的组件只是赋予了 DOM 移动的能力，因此 DOM 的内容还需要通过插件去生成，好了这就是我们要实现的功能

在上篇文章中，我们已将名为`switchservice`的包发布到了 npm 中，通过 unpkg 可获取其 cdn 链接：

https://unpkg.com/switchservice@0.0.1/dist/switchservice.min.js

## 编写插件

node 中操作 dom 我们还是借助[jsdom](https://github.com/jsdom/jsdom#readme)库会方便些

```bash
pnpm add jsdom -D
```

直接上代码了，都是一些 node 相关的知识

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class HtmlScriptPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("MyPlugin", (compilation) => {
      console.log("The compiler is starting a new compilation...");

      // Static Plugin interface |compilation |HOOK NAME | register listener
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "MyPlugin", // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          console.log("data", data);
          // Tell webpack to move on
          const _data = this.#createDom(data.html);
          data.html = _data;
          cb(null, data);
        }
      );
    });
  }

  #createDom(data) {
    const dom = new JSDOM(data);
    const {
      window: { document }
    } = dom;

    // 插入自定义组件
    const envswitchbutton = document.createElement("env-switch-button");
    const _script = document.createElement("script");
    _script.setAttribute("defer", "defer"),
      _script.setAttribute("type", "text/javascript");
    _script.setAttribute(
      "src",
      "https://unpkg.com/switchservice@0.0.1/dist/switchservice.min.js"
    );
    const _createSelectScript = document.createElement("script");
    _createSelectScript.setAttribute("type", "text/javascript");
    _createSelectScript.textContent = `
        (function(){
            setTimeout(() => {
                const sl = document.createElement("select");
                console.log("window.DEVCONFIG", window.DEVCONFIG);
                const options = Object.keys(window.DEVCONFIG).map((item) => {
                  const currentenv = localStorage.getItem("SERVICEENV");
                  const o = document.createElement("option");
                  if (item === currentenv) {
                    o.setAttribute("selected", "selected");
                  }
                  o.setAttribute("value", item);
                  o.textContent = item;
                  return o;
                });
                options.forEach((item) => {
                  sl.appendChild(item);
                });
                sl.addEventListener("change", (e) => {
                  console.log("切换", e.target.value);
                  localStorage.setItem("SERVICEENV", e.target.value);
                  var r = confirm(
                    "已切换至：" + e.target.value + "，将要进行页面刷新"
                  );
                  if (r == true) {
                    location.reload();
                  } else {
                    location.reload();
                  }
                });
                document
                  .querySelector("env-switch-button")
                  .shadowRoot.appendChild(sl);
              }, 500);
        })()
    `;
    document.body.prepend(envswitchbutton);
    document.body.appendChild(_script);
    document.body.appendChild(_createSelectScript);
    return document.documentElement.outerHTML;
  }
}

module.exports = HtmlScriptPlugin;
```

这里稍微讲解一下思路：  
通过`html-webpack-plugin`提供的 hook 我们在 webpack 编译的时候，注入自己的能力，参与其编译的过程，`#createDom`方法动态创建了两个`script`标签，引用上一篇发布到 npm 上的包(通过 cdn 的方式)，创建 select 标签，将成填充到可移动组件中，并注册`onChange`事件，监听选择项的变化，修改 localStorage.getItem("SERVICEENV")值，刷新页面。这就是大概的思路

## 使用插件

我们在 webpack.config.js 中引入插件，并在 plugins 中添加

```js
const HtmlScriptPlugin = require("./utils/htmlscriptplugin");
{
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body"
    }),
    new webpack.DefinePlugin({
      INJECTWINDOW:
        action === "build"
          ? `function(){
            var currentenv=localStorage.getItem('SERVICEENV');
            var SERVICEENV=currentenv?currentenv:${JSON.stringify(
              process.env.SERVICE_ENV ?? "mock"
            )};
            console.log(SERVICEENV);
            window.localStorage.setItem('SERVICEENV',SERVICEENV)
            window.DEVCONFIG=${JSON.stringify(getDevConfig(env, action))}
        }`
          : `function(){
            var SERVICEENV=${JSON.stringify(process.env.SERVICE_ENV ?? "mock")}
              console.log(SERVICEENV);
              window.localStorage.setItem('SERVICEENV',SERVICEENV)
              window.DEVCONFIG=${JSON.stringify(getDevConfig(env, action))}

        }`
    }),
    ...(action === "build" ? [new HtmlScriptPlugin()] : [])
  ];
}
```

好了到，这一个简易可切换环境的组件就写好了，并与 webpack 进行的结合，也方便今后扩展更多的环境

效果如下：

<Thumbnail
  src="/myimage/compile/webpack_image2.png"
  alt="Choose either AWS or GCP"
  width="200px"
/>

:::tip
如何你觉得不会写 webpack 插件，其实想要实现这个功能，还有另一个简单的方式，就是创建两个 index.html 模板，根据命令来分别引用不同的模板 

根据命令来动态修改template所引用的html模板

```js
new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body"
    }),
```

:::

不过看到里，发现了一个问题，在 webpack.config.js 中写了一些关于 serve 和 build 的特性代码，根据这两个环境分别执行不同的方法，感觉这样写不便扩展而且所有的东西都放到了一个配置文件里，以后会越来越臃肿，而且开发环境和生产环境的构建目标也会存在差异，因此我们需要根据 serve 和 build 来分别创建两个配置文件，这样会使结构更清楚

我们在下一篇文章中将讲解如何进行配置文件的分离
