---
title: 进阶-实战2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

还是接着上一节的文章继续讲[进阶-实战](/compile/webpack/advanced3)

## 环境区分

环境指的是什么，当我们一个在项目开发完成后，应该接着做什么呢

1. 本地联调【mock】，在前后端分离的今天，当前端开发完成后，不可能去等着服务器开发完，再去进行联调，这样太浪费时间了，也不符合前端后分离的规则，因此前端需要有自己的 mock 服务，根据接口文档定义输出，启动服务，前端调用 mock 服务  
   此时我们的请求链接会是：http://localhost:8080/xxxxx
2. 联调环境【dev】，当服务端开发完成后，会将服务布署到 dev 环境，前端请求需链接到这个环境进行联调  
   此时我们的请求链接会是：http://h5itest.dfzq.cn:8080/xxxxx
3. 测试环境【sit】前端跟服务器联调完成，就到了提交测试阶段，说白了就是给测试人员了，这时就需要前端将代码打包一份放到 sit，服务端也需要将代码布署到 sit 服务器  
   此时我们的请求链接会是：http://h5itest.sit.dfzq.cn:8080/xxxxx
4. 生产环境【prod】这个好理解，就是要发布的环境了，跟 sit 环境一样，也需要前后端都进行打包布署
   此时我们的请求链接会是：http://prod.dfzq.cn:8080/xxxxx

以上说的环境，不代表所有公司都是这样，我们公司还多了一个 uat 环境就是生产测试环境，用生产的数据来测试，不管怎样，我相信每个公司至少会有以上两个以上的环境

因此我们可能按照环境结合业务名，来添加单业务多环境的运行脚本命令，规则如下：

- business-test-serve-[env]:[env] webpack serve
- business-test-serve:[env] webpack serve

这里我们可以借助一些第三方库来进行环境变量的挂载(process.env)，大伙有兴趣可以查看[node 环境变量设置](/webother/webother12)

这里我们就选用[cross-env](https://www.npmjs.com/package/cross-env) 来进行环境变量，它已经为我们考虑了不同平台的兼容性，你也可以选择你所熟悉的库，只要能实现多环境的效果即可

## 安装依赖

```bash
pnpm add corss-env -D
```

同时修改 package.json 添加以下脚本命令

```json
{
  "scripts": {
    "business-test-serve-mock": "cross-env SERVICE_ENV=mock webpack serve",
    "business-test-serve-dev": "cross-env SERVICE_ENV=dev webpack serve",
    "business-test-serve-sit": "cross-env SERVICE_ENV=sit webpack serve"
  }
}
```

## 创建环境配置文件

根据业务需要，我们有环境有 mock，dev，sit 因此常用的作法是分别添加三个环境的配置文件，然后在 webpack.config.js 中通过 process.env.REACT.ENV 来动态加载我们对应环境的配置文件

在根目录新建`config`文件夹，添加环境配置文件，最终的目录结构如下：

```tree
config
├── config.dev.js
├── config.mock.js
├── config.prod.js
└── config.sit.js
```

每个环境的都有其特性值，就像上面说的连接服务端的 api 等，我们请求服务端的代码肯定是只有一份的，那么在这种情况下，就需要有一种替换机制，根据环境的不同，在 js 中动态的去替换我们的请求地址(URL)

```js
fetch(url).then((res) => {});
```

这其中的`url`是需要动态替换的，在这里我们还需要使用另一个 webpack 插件[DefinePlugin](https://webpack.docschina.org/plugins/define-plugin/)，我们不能将直接把url换成process.env

:::tip
这里大伙要明白一个事情，那就是process.env 是node环境才有的变量，在浏览器环境中是不存在这玩样的，DefinePlugin能够帮助我们动态去替换js代码中的变量，替换成其对应的值
:::

流程是这样的：
1. 在webpack.config.js中通过 process.env.SERVICE_ENV 获取对应环境的配置文件
2. 使用DefinePlugin插件，替换javascript中的变量，将其替换成值

### 添加环境相关值
<Tabs>
<TabItem value="mock" label="config.mock.js">

```js
module.exports={
    "SERVICEAPI":'"http//mock:8080/xxxxx"',
}
```

</TabItem>
<TabItem value="dev" label="config.dev.js">

```js
module.exports={
    "SERVICEAPI":'"http//dev:8080/xxxxx"',
}
```

</TabItem>
<TabItem value="sit" label="config.sit.js">

```js
module.exports={
    "SERVICEAPI":'"http//sit:8080/xxxxx"',
}
```

</TabItem>
<TabItem value="prod" label="config.prod.js">

```js
module.exports={
    "SERVICEAPI":'"http//prod:8080/xxxxx"',
}
```

</TabItem>
</Tabs>

**注意字符串值，需要使用引号包裹，或者使用JSON.stringify**

## webpack.config.js
```diff
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
+const webpack = require("webpack");

 const isProduction = process.env.NODE_ENV == "production";

+const configenv = require(`./config/config.${process.env.SERVICE_ENV}.js`);

const stylesHandler = "style-loader";

const currentScript = process.env.npm_lifecycle_event;

const {
  groups: { filename }
} = currentScript?.match?.(/(?<filename>\w+-{1}\w+)-{1}\w+/i);

const config = {
  entry: {
    [filename]: { import: `./src/${filename}/index.jsx` }
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, filename),
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
+   new webpack.DefinePlugin(Object.assign({
+   },configenv))
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

## main.tsx

在business-test业务page/main.tsx 添加如下代码：
```jsx
import React from "react";


export const MyApp=()=>{
    return <div>{SERVICEAPI}</div>
}
```

## 启动服务
分别试着启动各环境的服务，就可以看到相对应环境的配置文件值
<Tabs>
<TabItem value="mock" label="mock">

```bash
pnpm business-test-serve-mock
```

</TabItem>
<TabItem value="dev" label="dev">

```bash
pnpm business-test-serve-dev
```

</TabItem>
<TabItem value="sit" label="sit">

```bash
pnpm business-test-serve-sit
```

</TabItem>
</Tabs>

好了，到这就一个比较简单的多运行环境的配置就写好了

