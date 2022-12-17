---
title: node 程序 esModule 与 cjs模块相互引用
---

## 前言

现在 ESModule 模块现在越来越成为规范了，在 Node 中也有很多的库现在都支持或者只支持通过 import 的方式进行引用，现在有个问题就是，如果我们的 node 以`commonjs`规范运行程序，则引入模块只能通过 require 方式，并且被引入的模块需要支持通过 require 引用，否则将报错，同理，如果我们 node 以`module`规范运行程序，则引入模块的方式只能是 import，而有些第三方库只支持通过`require`或`import`其中一种方式引用，这必然就会带来一个问题，在 node 为`module` 的程序中，如何引入`cjs`模块呢

## 模块类型

node 程序模块类型的选择是通过 `package.json` 文件中的`type`属性

#### 语法

`type: commonjs | module`

#### 示例

```json
{
  "type": "commonjs"
}
```

## CommonJS 模块加载 ES6 模块

CommonJS 的 require()命令不能加载 ES6 模块，会报错，只能使用 import()这个方法加载

```js
(async () => {
  await import("./my-app.mjs");
})();
```

当然，如果 node>=14.8.0，则可以直接使用顶级 await，省略 async，[top level await](https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/)

```js
await import("./my-app.mjs");
```

## CommonJS 模块加载 ES6 模块

ES6 模块的 import 命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项

```js
import packageMain from "commonjs-package";
```


## 同时支持两种格式的模块
一个模块同时要支持 CommonJS 和 ES6 两种格式，也很容易。

如果原始模块是 ES6 格式，那么需要给出一个整体输出接口，比如export default obj，使得 CommonJS 可以用import()进行加载。

如果原始模块是 CommonJS 格式，那么可以加一个包装层。

```js
import cjsModule from '../index.js';
export const foo = cjsModule.foo;
```
上面代码先整体输入 CommonJS 模块，然后再根据需要输出具名接口。

你可以把这个文件的后缀名改为.mjs，或者将它放在一个子目录，再在这个子目录里面放一个单独的package.json文件，指明{ type: "module" }。

另一种做法是在package.json文件的exports字段，指明两种格式模块各自的加载入口。
```json
"exports"：{
  "require": "./index.js"，
  "import": "./esm/wrapper.js"
}
```
上面代码指定require()和import，加载该模块会自动切换到不一样的入口文件。

## 参考

[CommonJS exports](https://2ality.com/2022/10/commonjs-named-exports.html?utm_source=ESnextNews.com&utm_medium=Weekly+Newsletter&utm_campaign=2022-10-04)

[package.json exports](https://nodejs.org/api/packages.html#exports)

[package.json exports](https://www.cnblogs.com/taohuaya/p/15573719.html#%E2%80%9Cexports%E2%80%9D-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)

[package.json exports](https://blog.csdn.net/u012384510/article/details/124958427)