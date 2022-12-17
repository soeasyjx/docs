---
title: 进阶-react
---

## 前言

前两个章节都大概的讲了一些 webpack 的基础知识，并没有引入第三方的库，因此我打算讲一下，如何在 webpack 中引入处理第三方库，这里以 react 为例，其它的库都一样，万变不离其宗，都当成普通的 js 来看就行了

## 创建项目

这里我们还是选择 webpack-cli 来进行自动化创建

### 安装依赖

```bash
mkdir webpack_simple_react && cd webpack_simple_react
pnpm init
pnpm add webpack webpack-cli -D
```

执行webpack-cli
```bash
pnpm dlx webpack-cli init
```

生成的目录结构如下：

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

### 安装 React

```bash
pnpm add react react-dom
```

## 编写 Demo

熟悉 react 的同学，应该都知道，正常情况下都会使用`.jsx`文件类型去编写一个 react 程序，因此我们将 src 下的 index.js 修改成 index.jsx

webpack 默认是不支持对.jsx 的编译的，需借助 loader 或 plugin ，对于 react 的编译自然就选择使用 babel-loader 和@babel/preset-react

```bash
pnpm add babel-loader @babel/preset-react -D
```

同时需要修改.babelrc 文件，添加对 react 的编译

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ],
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ]
  ]
}
```

编写 react 组件

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return <div>这是一个React 项目</div>;
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 启动

```bash
pnpm serve
```

顺利的话就可以在浏览器中看到我们编写的内容了

## 优化

webpack 默认会将所有的 js 都打包成一个脚本，其实像 react 这样的库不像我们的业务代码会经常性的去变化，当我们在项目中选定了一个版本后，除非有重大 bug 不然，是不会轻易去升级变化它的，因此我们需要将像 react 这样的库抽离出来，通过 script 标签的形式去引用，这样可以很好的利用浏览器的缓存

[optimization](https://webpack.docschina.org/configuration/optimization/)是 webpack 中一个比较核心的优化手段，尤其是[optimization.splitChunks](https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks)更是我们需要了解的重点与难点

其实默认情况下 optimization.splitChunks 已有自己拆分 chunk 的规则[defaults](https://webpack.docschina.org/plugins/split-chunks-plugin/#defaults)，如果你想自己定义规则，也可以关闭默认规则

想要开启默认 optimization（优化）其实很简单，在 webpack.config.js 中添加如下属性

```json
{
  "optimization": {
    "splitChunks": {
      "chunks": "all"
    }
  }
}
```

通过执行`pnpm build:dev`我们可以发现，生成了两个 Bundle 其中一个其实就是 react 源码，webpack 会帮助我们在 html 中通过 script 标签引用

但是生成的 react 名称不是我们想要的，我们需要改成我们自己的规则，这时候就需要自己去定义优化规则了

```json
{
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /node_modules\/(react|react-dom)/,
          name: "react",
          chunks: "initial"
        }
      }
    }
  }
}
```
重新打包后可以发现，也是生成了两个Bundle ，其中`react.1e193e069e7b26a226ee.bundle.js`就是react相关的库，这名字看起来是不是清爽多了

optimization包含的东西比较多，一时半会也讲不完，只能在以后慢慢添加了，大家也可自行到webpack官网去学习，这里有一点建议，当我们要了解学习optimization每个属性的作用时，应该创建一个干净的webpack项目，不要去添加其他不相关的东西，一个一个属性的试，看输出，这样就能更好的理解其作用


## 源码
[webpack_simple_react](https://gitee.com/soeasyjx/webpack_simple_react)

## 参考
[chunk bundle](https://www.jianshu.com/p/9fd84ef2a074)


