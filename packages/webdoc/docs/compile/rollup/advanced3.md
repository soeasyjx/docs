---
title: 进阶-react
---

## 前言

没啥好讲的，就是想写一个 react 的组件，练练手，废话不多说，开干！！

> 我们还是基于`rollup-project`项目开发我们的 react 组件

## 创建工作目录

在 packages 下新建`rollup-react-demo`文件夹，之后的目录结构如下：

```tree
rollup-project
├── examples
│   ├── README.md
│   ├── build
│   ├── package.json
│   ├── public
│   └── src
├── package.json
├── packages
│   ├── rollup-lodash-demo
│   ├── rollup-react-demo
│   └── rollup-simple-demo
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## index.jsx

在 rollup-react-demo 下新建 src 文件夹并添加 index.jsx 文件，注意这里的文件类型是**.jsx**，当然使用js类型的组件也是可以的

## 安装依赖

> 由于这里使用的 jsx 类型文件，rollup 默认是不能处理的它的，需要依赖第三方库要处理.jsx，这里我们就直接使用[@babel/preset-react](https://www.babeljs.cn/docs/babel-preset-react)

```bash
pnpm add react react -w -P
pnpm add @rollup/plugin-babel @babel/preset-react -w -D
# 检查一下有没有安装 @rollup/plugin-node-resolve @rollup/plugin-commonjs ，没有的话也是需要安装的
```

## 编写组件

```jsx
import React from "react";

export const Button = () => {
  const clickHandle = () => {
    console.log("点击事件");
  };
  return <div onClick={clickHandle}>这是一个按钮</div>;
};
```

## .babelrc

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ]
  ]
}
```
这里解释一下`automatic`
runtime: 使用哪个方法来转换react元素
- classic：使用`React.createElement`来转换react元素
```js
const Button = () => {
  const clickHandle = () => {
    console.log("点击事件");
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: clickHandle
  }, "\u8FD9\u662F\u4E00\u4E2A\u6309\u94AE");
};
```
- automatic：使用jsx来转换react元素
```js
const Button = () => {
  const clickHandle = () => {
    console.log("点击事件");
  };
  return /*#__PURE__*/jsx("div", {
    onClick: clickHandle,
    children: "\u8FD9\u662F\u4E00\u4E2A\u6309\u94AE"
  });
};
```

具体请参考[react jsx](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md)

## rollup.config.js

```js
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.jsx",
  output: [
    {
      name: "mylib",
      file: "dist/bundle.js",
      format: "es"
    }
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
  plugins: [nodeResolve(), commonjs(), babel()]
};
```

## 执行打包
```
pnpm build-react
```

### 输出
```js
import 'react';
import { jsx } from 'react/jsx-runtime';

const Button = () => {
  const clickHandle = () => {
    console.log("点击事件");
  };
  return /*#__PURE__*/jsx("div", {
    onClick: clickHandle,
    children: "\u8FD9\u662F\u4E00\u4E2A\u6309\u94AE"
  });
};

export { Button };
```

## 本地测试

### 安装依赖
```bash
pnpm --filter examples add rollup-react-demo
```

## 源码
https://gitee.com/soeasyjx/rollup-project.git

