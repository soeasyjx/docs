---
title: npm 同时安装同一个包的多个版本
description: 使用别名同时安装同一个包的多个版本
---

## 前言

npm 上的包大多数都会存在多个版本，如果在我们项目中想使用新版本，又要保留老版本，怎么办呢，这里可以使用 npm 别名来进行处理

### 语法

### [npm](https://docs.npmjs.com/cli/v8/commands/npm-install#description)

<code>npm install &lt;alias-package&gt;@npm:&lt;package&gt;</code>

### [cnpm](https://docs.npmjs.com/cli/v8/commands/npm-install#description)

<code>cnpm install &lt;alias-package&gt;@npm:&lt;package&gt;</code>

### [yarn](https://classic.yarnpkg.com/en/docs/cli/add)

<code>yarn add &lt;alias-package&gt;@npm:&lt;package&gt;</code>

### [pnpm](https://pnpm.io/zh/aliases)

<code>pnpm add &lt;alias-package&gt;@npm:&lt;package&gt;</code>

### 安装

以 vue 为例, 同时安装 vue 的 2.6 版本和 vue 的 3.2 版本

首先分别起名 vue2 和 vue3 当然这个名字，你可以随便取，符合语义就行了

```bash
npm install vue
npm install vue2@npm:vue@^2.6.14
npm install vue3@npm:vue@^3.2.37
```

### package.json

```json
{
    "devDependencies":{
        "vue":"vue",
        "vue2":"npm:vue@^2.6.14",
         "vue3":"npm:vue@^3.2.37
    }
}
```

### 使用

```js title=app.js
import Vue from "vue";
import Vue2 from "vue2";
import { createApp } from "vue3";
```

