---
title: 指定声明文件
---

当前使用 TS 去编写一个库的时候，打包生编译成 js 文件，这时候我们一般都会成生一个.d.ts 的类型声明文件，在 vscode 中通过 import 方式引入库时，可以获得相应的类型提示

## 模板解析

有关 TS 的模块解析策略可以参考[官方文档](https://www.typescriptlang.org/docs/handbook/module-resolution.html)，[官方文档-中文](https://www.tslang.cn/docs/handbook/module-resolution.html)

## package.json

### [main](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#main)

main 字段是用来指定包加载的入口文件。

当不指定 main 字段时，默认值是模块根目录下面的 index.js 文件

```json
{
  "main": "lib/main.js"
}
```

### [types](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

指定入口文件的类型声明文件，默认为`index.d.ts`，但是建议您还是都在 package.json 中指定

```json
{
  "types": "./lib/main.d.ts"
}
```
