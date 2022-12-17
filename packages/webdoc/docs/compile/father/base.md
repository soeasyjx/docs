---
title: hello world
---

## 前言

father 是对 rollup 的再封装，可以有效的减少我们对 rollup 的学习成本，我们公司目录也主要是使用[father](https://github.com/umijs/father)进行组件库的开发，在这里也非常推荐大伙使用它来作用主要的库编译工具

## 版本

截止文档编写的时候使用的是**father>=4.1.0**

## 新建目录

father 非常人性化的为我们提供了创建开发目录的指令

```bash
npx create-father father-simple-demo
```

这个过程中会让选择目标平台，就是代码运行会在哪个环境下运行，浏览器中运行还是 node，还是两都要支持，这里我们就先选择`Browser`（浏览器）,包管理工具选择`pnpm`，之后输入关键信息，一路回车下了，得到如下的结构目录：

```tree
father-simple-demo
├── README.md
├── node_modules
│   └── father
├── package.json
├── pnpm-lock.yaml
├── src
│   └── index.ts
└── tsconfig.json
```

默认使用 ts 进行开发，

- src：为我们的开发目录
- .fatherrc.ts：father 配置文件，类似 rollup.config.js 作用

## 执行打包

```bash
pnpm build
```

执行打包指令后，可以看到新生成了 dist 文件夹，这就是打包后的代码：

```bash
father-simple-demo
├── README.md
├── dist
│   └── esm
│       ├── index.d.ts
│       └── index.js
├── node_modules
│   └── father
├── package.json
├── pnpm-lock.yaml
├── src
│   └── index.ts
└── tsconfig.json
```

现在来让我们稍微在 src/index.ts 中添加一些代码，并添加一些 ES6 语法

```ts
export const objMerge = () => {
  const _key = "age";
  const obj1 = {
    name: "jiangxin",
    [_key]: 100
  };
  const obj2 = {
    address: "湖南长沙"
  };

  return { ...obj1, ...obj2 };
};
```

可以看到输出的后的代码已经做了兼容性处理了

> 在使用 rollup 进行打包时，是需要手动添加 babel 的，father已经帮我们添加了babel，我们也可以在.fatherrc.ts

```js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

export var objMerge = function objMerge() {
  var _key = "age";

  var obj1 = _defineProperty(
    {
      name: "jiangxin"
    },
    _key,
    100
  );

  var obj2 = {
    address: "湖南长沙"
  };
  return _objectSpread(_objectSpread({}, obj1), obj2);
};
```

## .fatherrc.ts
father最主要的好处是使用简单，我们其本上不需要编写配置文件，即可打包出我们想要的库
```ts
import { defineConfig } from "father";

export default defineConfig({
  esm:{}
});
```

## 参考
- [father 指南](https://github.com/umijs/father/blob/6451668e5c803276c535187a7fb47e2c7332d094/docs/guide/index.md)
- [father 配置项](https://github.com/umijs/father/blob/6451668e5c803276c535187a7fb47e2c7332d094/docs/config.md)