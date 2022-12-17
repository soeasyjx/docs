---
title: npm
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## 前言
npm workspace 是目前比较好的单仓多项目(monorepo)解决方案，本着技多不压身的原则，准备使用一下npm workspace

## 环境
npm>7.7.0

## 创建根目录
我们先新建名为`npm-workspace`文件夹，作为我们项目的根目录
```bash
mkdir npm-workspace
```

## 初始化工程目录
我们需要在其中添加 {"private":"true"} 以避免将根目录发布到 npm
```bash
npm init -y
```

## package.json
```json
{
  "name": "npm_workspace",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "private": "false",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
}

```

## 子项目
npm包管理器可以使用两种方式创建子项目
1. 手动创建
2. npm命令形式创建(**推荐**) `npm init -w ./packages/child-a`

### 创建子项目
这里我们选择命令形式创建
```bash
npm init -w ./packages/child-a -w ./packages/child-b -y
```
执行完上面的命令后，会自动生成packages文件夹并添加了child-a，child-b两个子项目，同时在根目录中的package.json中添加了`workspaces`属性，其实上面说的手动创建，就是自己一步步新建子项目文件夹，并在根目录package.json中添加`workspaces`属性将子项目添加其中

### workspace 目录
```tree
npm_workspace
├── node_modules
│   ├── child-a
│   └── child-b
├── package-lock.json
├── package.json
└── packages
    ├── child-a
    │   ├── package.json
    │   └── src
    │       └── index.js
    └── child-b
        ├── package.json
        └── src
            └── index.js
```

在package.json 中会自动添加`workspaces`属性
```json {13-16}
{
  "name": "npm_workspace",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "private": "false",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "workspaces": [
    "packages/child-a",
    "packages/child-b"
  ]
}

```
:::tip
-w：--workspce的简写形式，这里需要注意，如果要一次性创建多个子项目，**需要在每个子项目名前都添加-w**
:::

### 子项目添加测试代码

<Tabs>
<TabItem value="export" label="child-a">

```js title=src/index.js
const testfun = () => {
  console.log("child-a 模块");
};

export { testfun };
```

</TabItem>
<TabItem value="import" label="child-b">

```js title=src/index.js
const testfun = () => {
  console.log("child-b 模块");
};

export { testfun };
```

</TabItem>
</Tabs>

## 创建 example
让我们新建 example 项目来对子项目进行测试，为了方便我们直接使用 npx create-react-app example命令来创建项目

**注意：create-react-app会默认帮我们安装依赖，这里我们把安装的依赖删除，在根目录执行`npm install`**

根目录执行npm install 会将每子项目的依赖安装到根目录的node_modules里，所以为什么会奇怪example 项目没有依赖也能正确执行`npm run start`

### 添加启动example指令
根目录package.json添加指令
```json
"scripts": {
    "start": "npm run start -w example"
  }
```
### example 安装子项目
```bash
npm install child-a --workspace=example
# 简写
npm i child-b -w exapmle
```

安装完后，就可以在exapmle 中进行使用

## 常用命令

### 创建工作目录
该命令将在packages目录下创建parent-npm-ab文件夹且初始化
>如果`parent-npm-ab`存在，将会直接初始化

```bash
npm init -w packages/parent-npm-ab
```

### 子项目初始安装
>当子项目是后来添加进去，需要执行安装的时候  `child-npm-c` 是后来添加进去的
```bash
npm install -w child-npm-c
```

### 子项目安装依赖
```bash
npm i lodash -w child-a
```

### 所有子项目都安装依赖
```bash
npm i lodash -ws
```

### 执行子项目命令
```bash
npm run test -w child-a
```

### 根目录添加执行子任务命令
> 有时候我们喜欢在根目录中去执行子任务的命令，但是上面的写法太繁琐了，大多数情况都会在根目录的 package.json 中添加子项目的命令

```json
 "scripts": {
    "start": "npm run start -w example",
    "test": "npm run test -w child-a"
  },
```

### 执行所有子项目的同名命令

```bash
npm run test -ws
```

## 注意
npm workspace 默认是将依赖安装到根目录中的node_modules中，在子项目的package.json中添加相应的依赖包名称，这点跟pnpm workspace有点区别，pnpm 需要添加-w参数

## 源码

## 参考