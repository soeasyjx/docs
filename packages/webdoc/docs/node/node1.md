---
title: nodejs中使用linux命令
---

## 前言
相信大伙或多或少知道如何在终端使用linux命令，但在nodejs中我们又应该如何去使用linux命令呢，主要还是通过[child_process](https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/)

### ls
我们在终端直接输入linux命令[ls](https://www.howtogeek.com/448446/how-to-use-the-ls-command-on-linux/)，会列出当前目录下的一级文件和文件夹，在nodejs中我们可以通过如下方式实现相同的功能：
```js
import { spawn } from "node:child_process";
const child = spawn("ls");
child.stdout.on("data", (data) => {
  console.log(`child stdout:\n${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`child stderr:\n${data}`);
});
```

## execa

> 使用[execa](https://github.com/sindresorhus/execa)库可以很方便的实现相同的功能，推荐以后可以使用此库来进行操作

```js
import { $ } from "execa";
const data = await $`ls`;
```