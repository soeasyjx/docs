---
title: hello world
---

## 前言

在接下去的几篇文章中我们会一步步的从 0 开始，搭建只包含 babel 的测试小用例，专门用来测试讲解 babel 相关的知识点，其实大伙在学习 babel 的时候，也应该是如此，不要混入太多的其它构建工具或知识，这样只会增加学习成本和理解难度

## 新建目录

```bash
mkdir babel-simple-demo
cd babel-simple-demo && mkdir src
cd src
touch index.js
```

### pnpm

在接下去的示例中，我们都会通过`pnpm`来进行包的管理，有关`pnpm`的相关知识参考，[pnpm 转送门](https://pnpm.io/)

## 安装依赖

`pnpm init`：初始化项目，类型 npm init
`pnpm add`：安装依赖包，babel 相关的依赖我们都应该在安装命令后添加 -D 关键属性，表示将依赖包写入到 package.json->devDependencies 且该包不会用生产环境

```bash
pnpm init
# @babel/core @babel/cli @babel/preset-env 是babel的三个核心库，需要都安装
pnpm add @babel/core @babel/cli @babel/preset-env -D
```

## babel.config.json

根目录下新建`babel.config.json` 文件，并添加如下内容：

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "modules": "cjs",
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

### modules
这个参数项的取值可以是"amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false。在不设置的时候，取默认值"auto"。

该项用来设置是否把ES6的模块化语法改成其它模块化语法。

我们常见的模块化语法有两种：
1. ES6的模块法语法用的是import与export；
2. commonjs模块化语法是require与module.exports。

在该参数项值是'auto'或不设置的时候，会发现我们转码前的代码里import都被转码成require了。

如果我们将参数项改成false，那么就不会对ES6模块化进行更改，还是使用import引入模块。

使用ES6模块化语法有什么好处呢。在使用Webpack一类的打包工具，可以进行静态分析，从而可以做tree shaking等优化措施。

[参考](https://www.jiangruitao.com/babel/babel-preset-env/)

通过配置文件来告知 babel 怎样去编译转换我们的 javascript，最后输出成啥样子，所以搞懂 babel.config.json 中的属性，是非常重要的

## 添加运行脚本

在 package.json 中添加如下运行脚本

```json
  "scripts": {
    "babel": "babel src --out-dir lib"
  },
```

`--out-dir`：表示编译后文件的输出目录，请 src 中的脚本输出到 lib 文件夹

## 运行打包

在src/index.js 中添加测试脚本，运行编译命令，之后可以lib文件夹下看到被编译后的脚本，大伙可以尝试在配置文件中，修改添加不同的属性，要查看输出文件的变化，这里我就不一一列举了

```bash
pnpm babel
```

## 参考
[babel](https://www.jiangruitao.com/babel/)