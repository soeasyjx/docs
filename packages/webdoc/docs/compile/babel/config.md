---
title: 配置文件
---
## 前言
babel 的配置文件类型有很多，有时候不晓的应该用哪种类型的配置文件，不同类型的配置文件又有啥区别呢

## 项目范围的配置

项目范围的配置在实际开发中，一般都是使用在项目根目录中的

- babel.config.*文件，具有以下扩展名：.json, .js, .cjs, .mjs

## 文件相关配置

当存在子项目或具有 monorepo 结构是使用文件相关的类型

- .babelrc.*文件，具有以下扩展名：.json, .js, .cjs, .mjs
- .babelrc文件
- package.json文件，babel 属性

 `*.js、*.cjs、*.mjs 可以使用Node API来根据条件进行动态生成配置文件`

## 推荐使用的配置文件类型
- .babelrc
- .babelrc.json
- babel.config.json

```tree
babel-base-demo
├── babel.config.json [项目范围]
├── package.json
├── packages
│   ├── test1
│   │   ├── .babelrc [文件相关配置]
│   │   ├── index.js
│   │   └── package.json
│   └── test2
│       ├── .babelrc [文件相关配置]
│       ├── index.js
│       └── package.json
├── pnpm-lock.yaml
├── src
│   ├── caniuse.js
│   ├── test.js
│   └── test2.js
```

:::tip
.babelrc.mjs、babel.config.mjs 类型配置文件在 babel>=7.8.0 才支持

.babelrc.json、.babelrc.cjs 类型配置文件在 babel>=7.7.0 才支持
:::

## 确定配置文件类型

有这么多的配置文件类型，那到底在实际工作开发应该怎么去选择呢？其实没有必要搞这么复杂，根据以下原则来进行选择即可：

1. 单目录结构：
```tree
babel-base-demo
├── babel.config.json [项目范围]
├── package.json
├── pnpm-lock.yaml
├── src [开发目录]
│   ├── caniuse.js
│   ├── test.js
│   └── test2.js
```
选择.babelrc、babel.config.json 都行没有区别，如果你需要使用node 编译时候的一些信息来动态生成配置文件，也可以使用babel.config.js、.babelrc.js

2. Monorepo目录结构：
```tree
babel-base-demo
├── babel.config.json [项目范围]
├── package.json
├── packages
│   ├── test1
│   │   ├── .babelrc/.babelrc.json [文件相关配置]
│   │   ├── index.js
│   │   └── package.json
│   └── test2
│       ├── .babelrc/.babelrc.json [文件相关配置]
│       ├── index.js
│       └── package.json
├── pnpm-lock.yaml
├── src
│   ├── caniuse.js
│   ├── test.js
│   └── test2.js
```

这两个我更愿意将其称为全局配置 (babel.config.js) 和局部配置 (.babelrc) 便于理解一些

## 参考
[config file](https://zhuanlan.zhihu.com/p/367724302)