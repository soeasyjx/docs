---
title: 进阶-实战3
---

继续接着上一篇来讲，我们尽量控制文章的篇幅，太长的，不好消化

上一篇我们讲了如何来区分多运行环境的配置，但是不晓的大伙有没有发现一个问题，就是我们的脚本命令`business-test-serve-mock`会不会随着业务的增加变的越来越多

脚本命令过多就会带来两个问题

1. package.json 变得非常臃肿，里面充斥的各种脚本命令
2. 打包发布的时候，一个业务需要分别打**(dev，sit，prod)**环境对应的包，有时候业务过多，会占用大量的时间，也容易导致环境打错

针对以上两个问题，我们也是有优化方案的，之所以说是优化方案，因为这个需求也是看公司业务要求，如果你觉得能接受，那就可以直接跳过

1. 我们只区分两个环境，这样每个业务最多也就两个命令吧
   - 开发【dev】/生产【prod】，只要不要生产环境，其他的环境一律称之为开发环境
2. 开发环境打包好，在 web 页面放置可切换环境**(dev，sit，uat)**的按钮，测试人员只需要切换到对应的环境即可
3. 脚本命令添加环境参数，这是为什么呢，因为前端开发人员，在电脑上调试 h5 页面会比较方便，主要是给开发人员用的一个后门吧

好了我们的方案确定了，就可以着手改造了

## package.json

我们先来改写脚本命令

:::tip
一般生产环境只会需要打包，不会需要启动服务，而开发环境会同时需要打包和启动服务命令，因为 webpack 打包/启动服务是通过 webpack 和 webpack serve 两个命令来执行的，因此我们的开发环境也需要分别写上这两个命令，并且只要是打包指令，我们都会将--mode 设置为 production
:::

```json
{
  "scripts": {
    "business-test-dev": "cross-env SERVICE_ENV=sit webpack serve",
    "business-test-dev:build": "cross-env SERVICE_ENV=dev webpack --mode=production --node-env=production",
    "business-test-prod:build": "cross-env SERVICE_ENV=prod webpack --mode=production --node-env=production"
  }
}
```

## 调整环境配置脚本

由于现在我们只分开发环境(dev)和生产环境环境(prod)，因此我们需要将所有开发环境(mock，dev，sit，uat)的配置文件合并，这里有两种方案可以使用

1. 保留配置文件`config.dev.js`和`config.prod.js`，其它的都可以删除，将原有已删除的环境配置文件(mock，sit，uat)相关值，合并到`config.dev.js`中，格式如下：
   - ```json
     {
       "mock": {
         "SERVICEAPI": ""
       },
       "dev": {
         "SERVICEAPI": ""
       },
       "sit": {
         "SERVICEAPI": ""
       },
       "uat": {
         "SERVICEAPI": ""
       }
     }
     ```
2. 在 webpack 中获取所有开发环境配置文件，通过 javascript 编程方式合并其值最终组合成上面的 JSON 格式

在这里我们就选择第二种方案了，这样能使目录更清晰

## getDevConfig

在根目录新建`utils`文件夹并添加 index.js 脚本

编写 getDevConfig 方法，其作用是获取 config 文件夹下所有配置文件，并组合成 json 格式返回

这里需要安装`fs-extra`文件操作库，使用 node 提供的 fs 也是可以的

```js
const fs = require("fs-extra");
const path = require("path");

const configPath = path.resolve(__dirname, "..", "config");

/**
 * 判断是否dev环境
 * @param {} e
 * @returns
 */
const isDev = (e) => {
  return (e + "").toLowerCase() === "dev".toLowerCase();
};
/**
 * 判断是否prod环境
 * @param {*} e
 * @returns
 */
const isProd = (e) => {
  return (e + "").toLowerCase() === "prod".toLowerCase();
};

/**
 * 获取开发环境配置文件
 * @param {*} e  用来标识是dev/prod
 * @param {*} action  用来标识是serve/build
 * @returns
 */
const getDevConfig = (e, action) => {
    console.time()
  // REACT_ENV用来说明调用个服务
  // 可通过REACT_ENV 来直接指定开发环境(mock,dev,sit,uat)，默认通过e入参来获取相应的配置文件
  const serverenv = process.env.SERVICE_ENV ?? "mock";
  const devconfig = {};

  // 生产环境，直接获取生产环境的配置即可
  if (isProd(e)) {
    const filepath = path.resolve(__dirname, "..", "config", "config.prod.js");
    return (devconfig.prod = require(filepath));
  }

  // 开发环境启动服务  非build
  if (isDev(e) && action === "serve") {
    const filepath = path.resolve(
      __dirname,
      "..",
      "config",
      `config.${serverenv}.js`
    );
    const isExist = fs.pathExistsSync(filepath);
    if (!isExist) {
      console.error(`不存在${serverenv}环境的配置文件`);
      process.exit(1);
    }
    devconfig[serverenv] = require(filepath);
    return devconfig;
  }
  // 开发环境启动服务  build  【需要排除mock,prod环境】给测试人员用的

  fs.readdirSync(configPath)
    .filter((file) => {
      if (isDev(e) && action === "build") {
        const [, env] = file.split(".");
        return env !== "mock" && env !== "prod";
      }
      return true;
    })
    .forEach((config) => {
      console.log("config", config);
      const filepath = path.resolve(__dirname, "..", "config", config);

      const isExist = fs.pathExistsSync(filepath);
      if (!isExist) {
        console.error(`不存在${serverenv}环境的配置文件`);
        process.exit(1);
      }
      const [, env] = config.split(".");

      if (fs.pathExistsSync(filepath)) {
        const content = require(filepath);
        devconfig[env] = content;
      }
    });
    console.timeEnd()
  return devconfig;
};

module.exports = {
  getDevConfig
};
```

稍微解释一下上面的代码，通过`SERVICE_ENV`环境变量来指定我们开发环境的服务(mock，dev，sit，uat)，其默认值为`mock`，当没有指定特定的服务环境时，会去获取所有的开发环境的配置文件，如果我们打的是生产环境的包，就直接去获取`config.prod.js`即可

前面第二点说过**开发环境打包好，在 web 页面放置可切换环境(dev，sit，uat)的按钮，测试人员只需要切换到对应的环境即可**，因此需要把环境服务配置对象挂载到`window`对象上，这样就可以方便切换服务，我们这里需要借助[DefinePlugin](https://webpack.docschina.org/plugins/define-plugin/)，关于其如何使用，请大伙看官方文档

## DefinePlugin

通过 DefinePlugin 来将环境服务配置挂载到 window 上，其实用法也很简单

```js
/*
 * @Author: jiangxin
 * @Date: 2022-11-06 16:23:28
 * @Company: orientsec.com.cn
 * @Description:
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { getDevConfig } = require("./utils/index");

const isProduction = process.env.NODE_ENV == "production";

// const configenv = require(`./config/config.${process.env.REACT_ENV}.js`);

const stylesHandler = "style-loader";

const currentScript = process.env.npm_lifecycle_event;

// filename:业务名称
// env:开发[dev]/生产[prod]
// action:动作 serve/build
const {
  groups: { filename, env, action = "serve" }
} = currentScript?.match?.(
  /(?<filename>\w+-{1}\w+)-{1}(?<env>\w+)(:{1}(?<action>\w+))?/i
);

console.log("action", action);

const config = {
  entry: {
    [filename]: { import: `./src/${filename}/index.jsx` }
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist/", filename),
    filename: "app-[contenthash:16].js"
  },
  devServer: {
    open: `${filename}/index.html`,
    host: "0.0.0.0",
    devMiddleware: {
      publicPath: `/${filename}`
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new webpack.DefinePlugin({
      INJECTWINDOW: `function(){
            window.localStorage.setItem('SERVICEENV',${JSON.stringify(
              process.env.SERVICE_ENV ?? "mock"
            )})
            window.DEVCONFIG=${JSON.stringify(getDevConfig(env, action))}
        }`
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

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
```

关键代码就是：

> 有兴趣的可以，好好研究一下 DefinePlugin 的高级用法

```js
new webpack.DefinePlugin({
  INJECTWINDOW: `function(){
            window.localStorage.setItem('SERVICEENV',${JSON.stringify(
              process.env.SERVICE_ENV ?? "mock"
            )})
            window.DEVCONFIG=${JSON.stringify(getDevConfig(env))}
        }`
});
```

:::tip
无论是对于开发人员的开发环境，还是对于测试人员的测试环境`SERVICE_ENV` 都表示所指的特定环境，但这里还是有区别的

`"business-test-dev": "webpack serve"`：这个是面向开发人员的，因此不需要全量的服务端环境(mock,dev,sit,uat)，需要通过 SERVICE_ENV 来指明,默认`mock`

`"business-test-dev:build": "cross-env SERVICE_ENV=dev webpack --mode=production --node-env=production"`：一般都是面对测试人员的，需要我们打包好，将资源放到服务器，测试人员可切换不同的测试环境，打包的时候需要全量环境，但是也可以使用 `SERVICE_ENV`来指明默认连接哪个测试环境，这里需要根据公司的实际情况来设置SERVICE_ENV 默认值，我就暂时按我们公司的情况来了，将其默认值设置为`sit`

所以大伙要理解package.json中命令的意义，这非常的重要
:::


## 切换环境变量

测试人员的包是全量的环境，可根据需要动态切换环境，因此我们需要在界面提供一个切换环境的功能，需求如下：

在页面展示一个可切换环境(dev,sit,uat)的按钮或入口，使之可以切换不同的环境，切换完环境，需要重新刷新页面，如果是单页应用需要退回到第一个路由页或者关闭webview

其实原理就是，根据选择环境修改`localStorage SERVICEENV` 值，然后执行`window.location.reload()`就行了

大致的思路就是在页面上显示一个浮动并可移动的`select`标签，选项为所有测试环境，使用者可通过选项，选项指定环境

由于篇幅问题，我们就另外开启新的一篇文章吧