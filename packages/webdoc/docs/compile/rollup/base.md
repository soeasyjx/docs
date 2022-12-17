---
title: hello world
---

## 前言

Rollup 是一个 JavaScript 模块打包器，当我们需要编写一个组件库，或者工具函数打包发布到 npm 上，我会选择使用 Rollup 来进行前期代码的打包任务，它可以选择输出多种文件类型(amd, cjs, es, iife, umd, system)好了废话不多说，直接开干

## 新建目录

```bash
mkdir rollup-simple-demo
cd rollup-simple-demo && mkdir src
cd src
touch index.js
```

## 安装依赖

`pnpm init`：初始化项目

`pnpm add`：安装依赖包，babel 相关的依赖我们都应该在安装命令后添加 -D 关键属性，表示将依赖包写入到 package.json->devDependencies 且该包不会用生产环境

在这里使用的rollup@3.2.1版本

```bash
pnpm init
pnpm add rollup -D
```

## package.json

```json
{
  "name": "rollup-simple-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    // --config 表示使用哪个配置文件
    "build": "rollup --config rollup.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "rollup": "^3.2.1"
  }
}
```

生成如下目录结构

```tree
rollup-simple-demo
├── node_modules 依赖包
│   ├── @rollup
│   └── rollup
├── package.json
├── pnpm-lock.yaml  pnpm包版本锁
├── rollup.config.js  配置文件
└── src  开发目录
    └── index.js
```

## rollup.config.js

添加配置文件，并添加如下内容

```js
export default {
  input: "src/index.js",
  output: [
    {
      name: "mylib",
      file: "dist/bundle.js",
      format: "es"
    },
    {
      name: "mylib",
      file: "dist/bundle.cjs.js",
      format: "iife"
    }
  ]
};
```

## format选择
[输出类型](https://rollupjs.org/guide/en/#outputformat)有很多种，我们不必要都必上，根据实际需要填写，我的规则是按端(web,node)来填写，即你的库是用在node端，还是web端的
- web端
`es`,`iife`

- node端
`es`,`cjs`

- web端+node端
`umd`

## 添加测试代码

我们在 src/index.js 中添加如下代码，当然也可以随便你添加啥代码都行

```js title=src/index.js
export const Timer = () => {
  console.log("fdsafads");
  const obj = Object.create({ name: "xxxx" });
  return { ...obj, ...{ age: 10 } };
};
```

## 执行打包

```bash
pnpm build
```

执行打包命令后，将在 dist 目录下生成打包后的代码，根据上面的配置文件`rollup.config.js`将会生成三个模块类型的代码，最后的目录如下：

```
rollup-simple-demo
├── dist
│   ├── bundle.cjs.js
│   ├── bundle.js
│   └── bundle.umd.js
├── node_modules
│   ├── @rollup
│   └── rollup
├── package.json
├── pnpm-lock.yaml
├── rollup.config.js
└── src
    └── index.js
```

## 本地测试

### workspace

关于 workspace 请参考[pnpm workspace](/compile/workspace/pnpm)

### pnpm link

1. 在之前我们的库目录中执行`pnpm link --global` 将成挂载到全局
2. `library_test`中 `pnpm add babel-simple-demo` 将其添加到依赖

## .npmignore
将不需要的文件排除，我们发布的时候，有些文件是需要排除不发布的，比如 node_modules
## 发布 npm

> 这里就不细讲发布流程了

```bash
npm login
npm publish
```
