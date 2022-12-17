---
title: package.json冷门知识
---

## 前言

`package.json` 是大家开发中不可或缺的文件。但是前端经过这么多年的发展，我们会发现这个文件里的字段越来越多，打开一个开源项目，你可能会发现压根不晓得有些字段到底是干嘛用的。

虽然大部分字段都在 [npm 文档](https://docs.npmjs.com/cli/v8/configuring-npm/package-json) 中说明了，但是还有一部分字段是单独给 Node、builder 等工具使用的，并且不存在该文档中。但是这些字段又与我们的日常开发相关，尤其是对于有开发 npm 包需求的工程师来说，因此本文会梳理并介绍这些字段的作用

## types

指向 TypeScript 的入口文件，比如说 index.d.ts。有时候你会发现别人在使用 typings，这两者作用相同

## main

指向支持 CommonJS 模块的入口文件，比如说 index.common.js。这个文件名是自己打包文件的时候配置的，只需要该文件及其依赖文件支持 CommonJS 模块即可

## module

指向支持 ESM 模块的入口文件，比如说 index.esm.js，同样该文件名也是自定义的

## engines
指定包管理器的版本

语法
```json
  "engines": {
    "node": ">=14",
    "pnpm": ">=7"
  }
```

## browser

指向支持 UMD 模块的入口文件，通常是 index.js，同样该文件名也是自定义的  
另外这个字段也会被一些公共 CDN 使用，比如 unpkg 及 jsdelivr。当然你也可以直接通过声明 unpkg 及 jsdelivr 字段来配置入口文件

## exports

这个字段很实用，已经被很多开源库拿来使用了。当打包工具支持该字段时，上文的四个字段都会被忽略，当然前提是我们在 exports 中做了相应的配置

该字段的作用分为两部分：

- 可以用来配置哪些文件是可以被用户导入的
- 可以根据不同的条件来配置哪些文件被导入。比如说可以根据当前环境来区分被导入的文件，开发环境时使用未压缩的文件，正式环境时反之

接下来我会用一个简短的配置来说明各自的作用，当然你也可以通过 Webpack 文档 了解更详细的内容

```json
// 部分配置来自 Vue
"exports": {
    ".": {
      // 用户 import 使用时
      "import": {
        // 根据环境引入不同的文件
        "node": "./dist/vue.runtime.mjs",
        "default": "./dist/vue.runtime.esm.js"
      },
      // 除了 require 对应 main 字段之外，其它都一样
      "module": "index.esm.js",
      "browser": "index.umd.js",
      "require": "index.common.js",
      "types": "index.d.ts"
    },
    // 用户可以导入 dist 文件夹下的文件
    "./dist/*": "./dist/*",
 }
```

## sideEffects

这是一个很重要但是容易被忽略的一个字段，错误配置的话会导致出现意料之外的问题

首先这个字段是被 Webpack 使用的，作用是协助 Webpack 进行 tree shaking
:::tip
tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。
:::

多数情况下我们可以直接设置值为 false，这样 Webpack 就会自动帮助我们删除未被 import 的代码，但是在一些情况下不能这样设置。比如说：

- 是否会对包之外的对象进行修改，比如说在 window 上挂载属性等等行为
- 是否在包内 import 了 CSS 文件，尤其对于组件库而言。如有此行为并且将 sideEffects 设置为了 false，那么用户使用组件库的时候就会出现样式丢失的情况，因为 Webpack 在打包过程中没有把 CSS 文件包含进来

当遇到上述情况时，我们可以将 sideEffects 设置为 true 或者通过类似 sideEffects: ["*.css"] 的方式告知 Webpack 有哪些文件是需要被打包进来的

## packageManager

这个看英文大家就能知道意思：包管理器。这个是 Node 在 v16.9.0 中新增的一个字段，用于管理包管理工具

大家可能在日常开发中遇到过这个场景：明明大家是在项目中使用 `yarn` 的，偏偏有个同事使用了 `npm` 来安装依赖包，还把 `package-lock.json` 文件给提交了上来，这时候 `packageManager` 就派上用场了

假如我们使用 `yarn` 来安装依赖包，那么设置 "packageManager": `yarn@2.0.0` 即可，甚至还能精确到版本号

但是目前该功能是属于实验性质的，并且依托于 corepack，在使用之前我们需要先开启 corepack

```bash
$ corepack enable

# 使用非 yarn 的包管理工具会报错
$ npm install
Usage Error: This project is configured to use yarn
```

另外在使用这个功能时，即使我们没有全局安装相应的包管理工具，corepack 会直接使用它内置的

## 资源
[package.json](https://cloud.tencent.com/developer/article/2112048)

[package.json2](https://blog.csdn.net/u012384510/article/details/124958427)

[package.json3](https://juejin.cn/post/7145001740696289317)