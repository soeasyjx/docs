---
title: 进阶-html,css,image
---

## 前言
在第一节的入门中，我们并没有通过 html 引入打包好的脚本，来测试一下到底打包出来的能不能用，这节我们就加入 html 来引用我们的打包脚本

## 创建项目

### 安装依赖

```bash
pnpm init
pnpm add webpack webpack-cli -D
```

### 生成配置

```bash
pnpm dlx webpack-cli init
```

[pnpm dlx](https://pnpm.io/zh/cli/dlx) 类型于 npx 不了解的可自己脑补

这里我们看一下自动生成的配置文件里都有些啥，主要多了两样东西（当然根据我们自己的选择，配置文件会添加不一样的东西，这里我选择的最最简单的，尽量减少干扰）,因为我选择了 HTML 和使用 ES6，webpack-cli 非常贴心的给我们添加了以下两个插件，这里解释一下 HtmlWebpackPlugin，之前说过 webpack 默认只能处理 javascript 和 json 对于像 html 类型的文件需要借助 loader 和 plugin，因此这里就添加了负责解析编译 html 文件的插件(HtmlWebpackPlugin)  
该插件还有一个作用，就是会自动将我们打包好的 bund 通过 script 标签的形式插件到 html 中，不需要再手动引入脚本了

最终的目录结构如下：
```tree
webpack_simple_react
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── src
│   └── index.js
└── webpack.config.js
```

- [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
- [babel](https://www.babeljs.cn/)

## 启动

```bash
pnpm serve
```
[webpack serve](https://webpack.docschina.org/configuration/dev-server/)会去启动一个服务，将资源都暂时存放到我们电脑的内存中

## 修改 index.js

我们在 src/index.js 中添加一些 ES6 语法

```js
(function () {
  const hello = (name, ...params) => {
    const obj = { [name]: name };
    console.log("params", params);
    return { ...obj };
  };

  hello("jiagnxin", 2, 3);
})();
```

### 打包

```bash
pnpm build:dev
```

再次查看 dist/main.js 可以看到我们的编写的代码已经不一样了，这是因为 babe 编译了我们的代码

## 样式

我们再来添加新的文件类型，现在我们的需要添加样式文件，按照之前说的，css 文件不属于 webpack 默认能编译的类型，因此需要借助 loader 或 plugin

### 安装依赖

- [style-loader](https://webpack.docschina.org/loaders/style-loader/) 
- [css-loader](https://webpack.docschina.org/loaders/css-loader/)

```bash
pnpm add css-loader style-loader -D
```

### 修改配置文件

添加 rule

```js
{
    test: /\.css$/i,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }]
}
```

### 添加 index.css

写入以下样式

```css
body {
  background-color: "red";
}
```

### 引入样式

在 index.js 中引入样式文件

```js
import "./index.css";
```

### 启动

```bash
pnpm serve
```

可以看到我们的 body 已经变成了红色背景，我们通过 F12 审查 html 代码可以看到 webpack 将 css 都提取到了 style 标签中，好处是可以有效的减少 http 请求，但是这样做有一个不好的地方，就是不能很好的利用浏览器缓存，因为 css 都被包在了 style 标签中，当然这是 webpack 的设计理念，如果我们要将 css 提取为单独的 css 文件在 html 中通过 link 标签的方式，其实也是有办法的

### 提取 css

提取 css 成一个单独的 css 文件，需要帮助[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

#### 安装

```bash
pnpm add mini-css-extract-plugin -D
```

#### 修改配置文件

```diff
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
+ const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.js",
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
    }),
+ new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      },
      {
        test: /\.css$/i,
+        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }]
      }
    ]
  }
};
```

:::caution
mini-css-extract-plugin 不可跟style-loader一起使用
:::

## 图片
图片资源也是我们前端项目中必不可少的类型文件，webpack也能很好的进行处理

在src目录下添加任意图片

### 修改配置文件
在rule中添加如下规则
```json
{
    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
    type: "asset"
}
```

其实如果你使用的是webpack-cli创建的项目，它已经很贴心的为我们添加了对图片，字体资源的支持，这也是只有当webpack>=5才有的功能，如果是之前的版本，是需要手动安装loader [asset-modules](https://webpack.docschina.org/guides/asset-modules/)

### 启动
```bash
pnpm serve
```

如果顺利就可以在页面中看到所添加的图片了


## 源码
[webpack_simple_html](https://gitee.com/soeasyjx/webpack_simple_html)