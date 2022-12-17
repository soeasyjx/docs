---
title: 进阶-实战
---

import Thumbnail from "@site/src/components/Thumbnail";

## 前言

前面用了几个章节，简单的介绍了一下 webpack 的基础知识，由于 webpack 的知识点太多了，不可能通过一两篇文章就能讲的清楚，同时也相信，对于前端专业的小伙伴来说对 webpack 怎么也多多少少都知道些，讲的太细反而会很啰嗦，对于这类知识集较多的工具，只能结果工作实际一点点来积累，不太可能通过几天或几个文章就能说的完，下面将结合我目前工作中的实际业务情况，一步步的来搭建一套完整的脚手架

## 脚手架

在开始之前，先问大伙一个问题，那就是如果是你去开发一个项目，你会怎样开始一个项目呢，一般而言如果是个人私人项目选择市场上已有的即可，如果是公司项目则应该根据业务搭建自己的脚手架，当然你也可以选择一些优秀的第三方脚手架，下面就推荐几个比较好的第三方脚手架

1. [create-react-app](https://create-react-app.bootcss.com/)
2. [create-vue](https://github.com/vuejs/create-vue)
3. [@ant-design/pro-cli](https://pro.ant.design/zh-CN/docs/getting-started/)
4. [modernjs](https://modernjs.dev/)

这里就先介绍这三个，日后遇到优秀的再添加

## 准备工作

在着手编写我们自己的脚手架之前我们应该先确定最基础的技术栈

### 技术栈

这里说的技术栈就是我们在业务开发中需要实际使用到的技术，前端最关键的无非就三个

- html （react，vue）
- javascript (js，ts)
- css（less，scss，css）

基于这三个技术栈，又可以分身出很多的技术，在对于技术栈的选择，我们就该从哪些方面进行考量呢，不可能看哪个热门就用哪个吧，我个人觉得，应该从以下几点考虑技术栈的选择

1. 公司/小组已有的技术栈，有些公司或者小组有着自己的技术栈，这样我们就不需要另辟蹊径了，除非技术栈非常的陈旧，不然就可以直接使用已有的技术栈
2. 组员技术集中点，如果说小组成员大部分都是使用 react 或 vue 的，这时可选择 react 做为我们的 UI 渲染框架
3. 业务层面，一切的一切都要服务于我们的业务，再牛 B 的技术离开了业务都是瞎扯蛋
4. 脚手架搭建者对技术的熟悉程序，在脚手架搭建的过程中必然会有各种各样的坑问题，倘若使用不熟悉的技术栈，遇到了问题，将是非常头痛的事情，一般而言都会选择自己熟悉的，因为有之前的经验，可以很好的避坑
5. 框架的生态和建设者的力量，我相信没人会选择一次非常冷门且常年无人维护的库吧

说了这么多下面就开始选择我们的技术栈了（基于我们组的实际情况）

#### html

由于我们组大部分人都是使用 react 库进行 UI 渲染的，因此这里对于 html 技术栈，我就直接选择 react 了，本人正好也比较熟它

> **react**

#### 脚本语言

对于脚本开发的选择，我觉得，就是选择使用 typescript 还是无类型检查的 javascript 了，这里也是主要看组里面技术侧重点了，为了减轻入门门槛，就选择无类型的 javascript 了，脚手架也是一个不断升级改造的过程，不可用一次性写好，永远不变的，我们之后再升级成 TS

> **javascript**

#### 样式

样式的话最主要就看你要不要使用预处理器了(less，scss)，这两个都非常类似，选择哪一个我觉得问题都不大，这里就直接选择 scss 了

> **scss**

## 搭建项目

技术栈选择好了，我们就可以开始搭建脚手架了，自己搭建脚手架其实还有一个好处，就是更可控，遇到问题可很快修改好

这里我们还是选择 webpack-cli 来进行自动化创建

### 安装依赖

```
mkdir webpack_simple_react && cd webpack_simple_react
pnpm init
pnpm add webpack webpack-cli -D
```

执行 webpack-cli

```bash
pnpm dlx webpack-cli init
```

webpack-cli 为我们提供了选项，可以根据选项为我们创建和安装对应的配置文件及依赖，下面就是我的选项：
<Thumbnail
  src="/myimage/compile/webpack_image1.png"
  alt="Choose either AWS or GCP"
  width="556px"
/>

我们来运行一下`pnpm serve`检查是否可正常使用，顺利的话，可在浏览器中看到 html 页面内容

### 调整开发目录

在实际业务开发过程中，我们不可能将所有的业务都写到 src/index.js 下，我们目前的的命名，是以业务为名称，在 src 下创建文件夹，
例如：我有一个业务名叫"test"，因此我会在 src 目录下新建名为`business-test`的文件夹，当然你也不一定要按照我这个规则吧，主要是有意义的名称

:::caution
由于我们在业务开发的过程中，所涉及到的业务不可能只有一个，所有在这里建议小伙伴们，单独打包每个一业务，不要一起打包所有的业务，这样能确保其他的业务代码的稳定，倘若一个命令全量打包，谁能保证 node_modules 没有更新小版本，而导致不相干的业务代码变化了,因此在 package.json 的命令中会有很多根据业务类型分类的脚本命令

当然如果你做是一个后台管理系统，就没有必要分的这么细了
:::

现在我新建了一个名为`business-test`的文件夹，那我们又应当怎么去组织这个文件夹下的目录结构呢，其实你也可以不用组织，但是为了统一风格，我们还是稍微整理一下

1. `index.jsx`为业务入口，每个业务都应该也必须都这个文件
2. 一个业务不可能只有一个页面，有可能有很多的页面，一起组成了这个业务，我们将所有的页面放到`page`文件夹下

可以要求组员这两个是必须的，如有必要可以使用 node 技术进行目录结构的检查

现在 src 下的目录结构应当如下：

```tree
src
└── business-test
    ├── index.jsx
    └── page
        ├── index.js
        └── main.jsx
```

### 安装依赖

```bash
pnpm add react react-dom

pnpm add @babel/preset-react -D
```

### 修改配置文件

```diff
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
- entry: "./src/index.js",
+ entry: {
+   "business-test": { import: "./src/business-test/index.jsx" }
+ },
  output: {
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    open: true,
    host: "localhost"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }
    ]
  },
+ resolve: {
+    extensions: [".jsx", "..."]
+  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
```

配置文件(webpack.config.js)的绝大部分内容都是先前使用 webpack-cli 生成的，我们并没有在这里做过多的修改，暂时只调整了两处

- [entry](https://webpack.docschina.org/configuration/entry-context/#entry)
- [resolve.extensions](https://webpack.docschina.org/configuration/resolve/#resolveextensions)

resolve.extensions: 在开发中我们引入模块常常不会添加文件的后缀史，webpack 之所以能正确的找到文件，正是它（extensions）在起作用，默认值为['.js', '.json', '.wasm']，由于我们使用的是`.jsx`文件，因此如果不配置 extensions，webpack 将找不到`index.jsx`文件

webpack 会按照 extensions 值顺序进行模块的获取，匹配到模块就停止  
例如：会依次获取 index.js->index.json->index.wasm，发现这些类型的模块都没有，将报错

显然.jsx 类型的模块 webpack 是找不到的，为了让 webpack 能正确解析到.jsx 模块，必须在 extensions 添加对`.jsx`的支持
:::tip
... 表示继承默认扩展（['.js', '.json', '.wasm']）
:::

现在我们来启动试试`pnpm serve`，基本没啥问题，可在浏览器看到`business-test`的内容，一般情况下链接为：http://localhost:8080/ 可能端口号会不一样

http://localhost:8080/ 不太符合我们的预期，为什么这样说呢，因为前面就说过了，我们是按业务来单独打包每一个业务的，打包好的文件我们是直接丢服务器上，需要在服务器上新建一个文件夹来放当前的业务，所以访问路径应该是**http://localhost:8080/buisness-test/index.html**，但是如果让布署人员去在服务器手动新建 buisness-test，显然也是不对的，人家可能要骂娘了，正确的做法是我们打包的时候，就将资源统一放到以业务名为文件夹的目录下

webpack 默认是放打包的资源放到 dist 文件夹下，要修改输出，很快主能联想到应当在[output](https://webpack.docschina.org/configuration/output/)属性上做文章，在这之前我们先来看一下，默认的输出结构：

```tree
dist
├── business-test.js
└── index.html
```

我们想得到的输出结构如下：

```tree
business-test
├── app-e040cbdb57caff11e75a.js
└── index.html
```

由于业务脚本的迭代更新是比较频繁的，为了避免客户端不能及时更新到最新的脚本，我们应当在输出的名称中使用[contenthash](https://webpack.docschina.org/configuration/output/#template-strings)，即 webpack 会根据入口文件的内容来生成对应的 hash 值，如果模块脚本有变，就会生成新的 hash 值，这样可以解决浏览器缓存的问题

#### 修改配置文件

```diff
const config = {
  entry: {
    "business-test": { import: "./src/business-test/index.jsx" }
  },
  output: {
-   path: path.resolve(__dirname, "dist"),
+   path: path.resolve(__dirname, "business-test"),
+   filename: "app-[contenthash:16].js"
  },
  devServer: {
    open: true,
+   open: `business-test/index.html`,
-   host: "localhost",
+   host: "0.0.0.0",
+   devMiddleware: {
+     publicPath: "/business-test"
+   }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }
    ]
  },
  resolve: {
    extensions: [".jsx", "..."]
  }
};
```

- [devMiddleware.publicPath](https://github.com/webpack/webpack-dev-middleware#publicpath)：映射服务的目录，也就是在哪个文件夹下启动服务，如果不配置，将直接在 http://localhost:8080/ 打开我们的页面，这显示不符合我们的预期，我们想要的链接是:http://localhost:8080/business-test/index.html

- [open](https://webpack.docschina.org/configuration/dev-server/#devserveropen): 自动打开浏览器，如果指定了页面，将打开特写页面

- host:0.0.0.0 启动服务后，可以通过 localhost 和本地 ip 访问服务，这对手机访问电脑服务很有用(网络处于同一个局域网中)

再次执行`pnpm serve`就可以打开我们`buisness-test`下的`index.html`页面了

### 动态生成业务目录

在实际业务开发中我们当然不仅仅只有一个业务，不晓的大伙有没有发现，我们上面的配置文件(webpack.config.js)输入(entry)，输出(output)，服务(devServer)都是写死`business-test`，这明显是不太合理的，难道我们只有一个业务么，因此我们需要将`business-test`改成动态值

那么我们应该用什么来承载我们业务信息呢，换句话说，我们在运行`pnpm serve`命令的时候，怎么通知 webpack.config.js 我当前启动的是那个业务，首先前面我们说过，我们打包是基于业务去打包的，因此写在 package.json->scripts 中的命令，也应该是根据业务名来书写的，即：每个业务都有其特有的命令，对于`business-test`我们对应的命令就需要有

```json
{
  "scripts": {
    "business-test-serve": "webpack serve"
  }
}
```

webpack.config.js 中运行在 node 环境中，我们可以通过 node 的知识去获取一些命令运行参数，就像`business-test-serve`，每显然我们只需要获取`business-test-serve`就可以知道当成启动的是哪个业务了，截取`business-test`即可

在 node 中通过[process.env.npm_lifecycle_event](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html) 就可以获取当前运行的脚本名，当然你也可以通过传参的形式去指定名称，但我觉得使用 process.env.npm_lifecycle_event 会更方便一些，命名规范，比如像：`business-test-serve`

`business-test`是业务名，`serve`是命令的作用

修改后的配置文件如下：

```diff
const {
  groups: { filename }
} = currentScript?.match?.(/(?<filename>\w+-{1}\w+)-{1}\w+/i);

const config = {
  entry: {
-  "business-test": { import: `./src/business-test/index.jsx` }
+  [filename]: { import: `./src/${filename}/index.jsx` }
  },
  output: {
    clean: true,
-   path: path.resolve(__dirname, "business-test"),
+   path: path.resolve(__dirname, filename),
    filename: "app-[contenthash:16].js"
  },
  devServer: {
-   open: `business-test/index.html`,
+   open: `${filename}/index.html`,
    host: "0.0.0.0",
    devMiddleware: {
-     publicPath: `/business-test`
+     publicPath: `/${filename}`
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }
    ]
  },
  resolve: {
    extensions: [".jsx", "..."]
  }
};
```

当然如果这里严谨一些应当先检查脚本名称是否符合预定格式，不符合直接报错了

## 源码
[webpack_simple_cli](https://gitee.com/soeasyjx/webpack_simple_cli)

好了，为了控制篇幅这节我们就先讲这么多了
