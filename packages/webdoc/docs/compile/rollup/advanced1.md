---
title: 进阶-babel
---

## 前言
我们在自己编写第三方库的时候，一般来说对于运行它的环境是不能有要求的(这里说的运行环境指的是各个版本的浏览器)，需要使用babel来编译我们的库，使之能运行大绝大部分的浏览器中，不能让使用者来进行编译

接下去我们还将使用上文中项目`rollup-simple-demo`

## 没有使用babel

我们先来看一个在打包的时候我们不使用babel进行编译，输出的代码会是什么样子

执行：
```bash
pnpm build
```

输出：
```js
const Timer = () => {
  console.log("fdsafads");
  const obj = Object.create({ name: "xxxx" });
  return { ...obj, ...{ age: 10 } };
};

export { Timer };
```

可以看出，几乎就是原样输出了，而已我们可以看到代码中我们使用的[扩展运算符](https://es6.ruanyifeng.com/#docs/object#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)，在低版本的浏览器中，会直接报错，但我们又不是让使用者去用babel编译一把

## [添加bable](https://rollupjs.org/guide/en/#babel)

> ` @rollup/plugin-babel`依赖`@babel/core`和`@babel/preset-env` 因此这个包也需要安装，不安装会提示，缺啥安装啥
```bash
pnpm add @rollup/plugin-babel @rollup/plugin-node-resolve -D
pnpm add @babel/core @babel/preset-env -D
```

### rollup.config.js

```js
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      name: "mylib",
      file: "dist/bundle.js",
      format: "es"
    },
    {
      file: "dist/bundle.cjs.js",
      format: "cjs"
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled"
    })
  ]
};

```

### 添加.babelrc.json
```json
{
  "presets": ["@babel/env"]
}
```

最终的目录结构如下：
```tree
rollup-simple-demo
├── babel.config.json
├── dist
│   ├── bundle.cjs.js
│   ├── bundle.iife.js
│   └── bundle.js
├── package.json
├── pnpm-lock.yaml
├── rollup.config.js
└── src
    └── index.js
```

执行：
```bash
pnpm build
```

输出：
```js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
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

var Timer = function Timer() {
  console.log("fdsafads");
  var obj = Object.create({
    name: "xxxx"
  });
  return _objectSpread2(_objectSpread2({}, obj), {
    age: 10
  });
};

export { Timer };

```

我们可以看到添加了babel编译后的代码，输出有啥变化，明显多了很多垫片代码

我们还可以在.babel.json配置文件中进行babel编译的相关属性设置，这个属于babel的范畴了，请参考[babel](/compile/babel/base)
