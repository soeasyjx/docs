---
title: node 环境变量设置
---

## 前言

当我们在 node 环境运行脚本的时候，避免不了通过`process.env`获取命令参数或者说环境配置变量等信息，那么我们可以多以下几个方案进行选择

## [process.env](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processenv)

node 中可通过 process.env 来设置环境变量，我们也可以在命令脚本中来为 process.env.[name] 添加我们自已的属性

### package.json

```json
{
  "scripts": {
    "test1-processenv": "NODE_ENV=AAAAAA AAFDFDFD=11111 node index0"
  }
}
```

### index0.js
```js
const { env } = require("node:process");

console.log("process.env", env.AAFDFDFD);

console.log("process.env", env.NODE_ENV);
```

## [env-cmd](https://github.com/toddbluhm/env-cmd)

可以帮助我们轻松的，根据命令脚本入参，动态设置环境参数，使用起来非常简单

### 安装

```bash
pnpm add env-cmd -D
```

### 使用

#### .env-cmdrc

根目录下创建 `.env-cmdrc`文件

```json
{
  "development": {
    "ENV1": "Thanks",
    "ENV2": "For All"
  },
  "test": {
    "ENV1": "No Thanks",
    "ENV3": "!"
  },
  "production": {
    "ENV1": "The Fish"
  }
}
```

#### package.json

```json
{
  "scripts": {
    "test1": "env-cmd -e development node index",
    "test2": "env-cmd -e test node index",
    "test3": "env-cmd -e production node index"
  }
}
```

#### index.js

```js
console.log("process.env.ENV1", process.env.ENV1);
```

#### 执行命令

```bash
pnpm test1
# 输出
"process.env.ENV1 Thanks"
# or
pnpm test2
# 输出
"process.env.ENV1 No Thanks"
# or
pnpm test3
#输出
"process.env.ENV1 The Fish"
```

### 优点

可以.env-cmdrc 文件中读取环境变

## [corss-env](https://www.npmjs.com/package/cross-env)

:::caution
cross-env 仍然运行良好，但处于维护模式。不会添加新功能，只会修复严重和常见的错误
:::

### 安装

```bash
pnpm add cross-env -D
```

### 使用

#### package.json

```json
{
  "scripts": {
    "test1-crossenv": "cross-env MY_ENV=mock node index2",
    "test2-crossenv": "cross-env MY_ENV=sit node index2",
    "test3-crossenv": "cross-env MY_ENV=prod node index2"
  }
}
```

#### index2.js

```js
console.log("process.env", process.env.MY_ENV);
```

#### 执行命令

```bash
pnpm test1-crossenv
# 输出
"process.env mock"
# or
pnpm test2-crossenv
# 输出
"process.env sit"
# or
pnpm test3-crossenv
#输出
"process.env prod"
```

## [node-env-run](https://github.com/dkundel/node-env-run)

### 安装

```bash
pnpm add node-env-run -D
```

### 使用

#### .envrun

`.envrun`可以随意修改成你需要的名字

```
S3_BUCKET = "envrun11111"
OBJECT='{"json":{"name":"xxx"}}'
```

:::tip
node-env-run 默认是获取根目录下的.env 文件，也可以通过配置指定环境配置文件
:::

#### package.json

```json
{
  "scripts": {
    "test1-envrun": "nodenv -E ./.envrun index3.js",
    // 如果根目录下默认有.env文件则可以不需要环境文件
    "test1-envrun": "nodeenv index3.js"
  }
}
```

#### index3.js

```js
console.log("process.env", process.env.S3_BUCKET);

console.log(
  "process.env.OBJECT",
  typeof process.env.OBJECT,
  JSON.parse(process.env.OBJECT)
);
```

#### 执行命令

```bash
pnpm test1-envrun
# 输出
"process.env envrun11111"
"process.env.OBJECT string { json: { name: 'xxx222' } }"
```

## [dotenv](https://www.npmjs.com/package/dotenv)

### 安装

```bash
pnpm add dotenv -D
```

### 使用

#### .env

```
S3_BUCKET = "dotenv"
OBJECT='{"json":{"name":"dotenv"}}'
```

#### package.json

```json
{
  "scripts": {
    "test1-dotenv": "node -r dotenv/config index4"
  }
}
```

#### index4.js

```js
console.log("process.env", process.env.S3_BUCKET);

console.log(
  "process.env.OBJECT",
  typeof process.env.OBJECT,
  JSON.parse(process.env.OBJECT)
);
```

#### 执行命令

```bash
pnpm test1-dotenv
# 输出
"process.env dotenv"
"process.env.OBJECT string { json: { name: 'dotenv' } }"
```

**dotenv 的使用非常强大，这里只是展示了最基础的用法，大伙可自行参考[官方文档](https://www.npmjs.com/package/dotenv)**

### 优点

可使用配置文件，对 webpack 提供插件支持

## 源码

[node-env](https://gitee.com/soeasyjx/node-env)

以上四个环境变量配置库，按业务需要选择使用就行了，哪个简单使用哪个
