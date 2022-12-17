---
title: hello world
---

## 前言

webpack 应该是前端世界说烂了的东西，我再在这里说它是干嘛的，觉得有些多余了，其实说白了 webpack 前端构建工具，就是用来处理我们的前端资源的，哪些资源呢，webpack 默认只有处理 javascript 和 json 文件的能力，其它的资源则只能通过 loader 和 plugin 去处理，也正是因为它强大的插件机制才能让它在前端这场硝烟弥漫的战场中脱颖而出，成为最为热门和持久的技术，它是一系统技术的集合，所以对 webpack 的理解和使用也自然成为衡量程序员等级的参考标准

## 官网文档

- [中文文档](https://webpack.docschina.org/concepts/)
- [英文文档](https://webpack.js.org/concepts/)

**建议大家中/英文对照着看，因可能会出现中文文档翻译滞后的问题**

## 前端资源

- javscript [ts，tsx，jsx]
- html
- css [less，scss]
- 图片

上面这几项都是前端常用资源，当然不仅仅只有这些，我将一步步用小 demo 来，演示在 webpack 中应该如何去加载处理这些资源的，内容可能会比较基础

https://webpack.html.cn/loaders/raw-loader.html

## 新建目录

```bash
mkdir webpack_simple_demo && cd webpack_simple_demo
```

## 安装依赖

```bash
# 初始化工程
pnpm init
# 安装
pnpm add webpack webpack-cli -D
```

目录结构如下：

```tree
webpack_simple_demo
├── package.json
├── pnpm-lock.yaml
├── src
│   └── index.js
├── tsconfig.json
└── webpack.config.ts
```

webpack.config.ts：webpack 配置文件，主要围绕这个配置文件来开展工作 ，注意我们这里使用的是 TS 类型的配置文件，当然更多人喜欢使用 JS 的，这个随意大伙使用了，我比较喜欢使用 TS 的，因为有类型提示

使用 TS 类型的配置文件还需要额外添加几个依赖 [使用 TS 类型配置文件](https://webpack.docschina.org/configuration/configuration-languages/#typescript)

```bash
pnpm add typescript ts-node @types/node @types/webpack -D
```

### tsconfig.json

tsconfig 添加如下内容

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "module": "CommonJS"
  }
}
```

## 编写配置

### webpack.config.ts

```ts
import * as path from "path";
import * as webpack from "webpack";

module.exports = (): webpack.Configuration => {
  return {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.bundle.js"
    }
  };
};
```

## package.json

```json
"scripts": {
    "build": "webpack"
  },
```

## 打包

```bash
pnpm build
```

当我们运行`pnpm build` 会自动一成 dist 文件夹并将打包好的 js 放入其中，最好的目录结构如下：

```tree
webpack_simple_demo
├── dist
│   └── index.bundle.js (打包后的文件)
├── package.json
├── pnpm-lock.yaml
├── src
│   └── index.js
├── tsconfig.json
└── webpack.config.ts
```

有兴趣的朋友可以自己去阅读打包后的代码`index.bundle.js`

## 一键生成

其实 webpack 添加了我们一键生成各种 webpack 资源包括，我们可以尽量使用这些命令来生成自己需要的东西，没必要自己手动，当然如果你想学习一下，手动还是非常有必要的

[webpack init](https://webpack.docschina.org/api/cli/#init)  
[webpack-cli](https://github.com/webpack/webpack-cli/blob/master/packages/generators/INIT.md)

- 配置文件
- loader
- plugin

### 配置文件

```bash title=语法
npx webpack init [generation-path] [options]
```

示例

```bash
npx webpack init
```

也可以手动先安装 `webpack`，`webpack-cli` 然后执行下面的命令：

> 根据选项，选择自己需要的配置即可

```bash
npx webpack-cli init
```

在接下去的示例中我们都将通过自动化指令生成 webpack 相关资源，当然你也可以选择手动自己去创建，不过一般的做法是使用 webpack-cli 指令生成最基础的框子然后根据自己的需求调整成自己想要的，这一节就到这里了，是不是感觉很简单哈！！！

## 源码
[webpack_simple_demo](https://gitee.com/soeasyjx/webpack_simple_demo)

## 编译工具

- webpack

## js

- Typescript

## css

- scss

## UI 渲染

- React

