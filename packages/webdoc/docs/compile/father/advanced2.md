---
title: 进阶-react
---

还是基于`father-simple-demo`项目来进行开发，本章主要讲讲如何使用 father 开发自己的 react 组件库，其实流程都一样的，没啥特别

## 创建工作目录

在 packages 下新建`father-react-demo`文件夹，之后的目录结构如下：

```tree
father-simple-demo
├── example
│   ├── README.md
│   ├── build
│   ├── package.json
│   ├── public
│   └── src
├── package.json
├── packages
│   ├── father-lodash-demo
│   └── father-react-demo (react组件库)
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

### 修改

1. 将 father-react-demo/src/index.ts 文件改为 index.tsx
2. tsconfig 添加`jsx`和`esModuleInterop`

```json
{
  "compilerOptions": {
    "jsx": "react",
    "strict": true,
    "declaration": true,
    "skipLibCheck": true,
    "baseUrl": "./",
    "esModuleInterop": true
  }
}
```

## 安装依赖

这里我们使用了[styled-components](https://styled-components.com/)来实现 css-in-js 功能

```bash
pnpm add react react-dom styled-components --save-peer
pnpm add @types/react @types/react-dom @types/styled-components --save-peer
```

## 编写组件

```tsx
import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.div`
  color: red;
  padding: 10px 1px;
  background-color: yellow;
`;

export const Button = () => {
  return (
    <ButtonStyle onClick={() => console.log("aaaa")}>
      这是一个按钮-update
    </ButtonStyle>
  );
};
```

## 执行打包

```bash
pnpm build-react
```

### 输出

```js
var _templateObject;

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

import React from "react";
import styled from "styled-components";
import { jsx as _jsx } from "react/jsx-runtime";
var ButtonStyle = styled.div(
  _templateObject ||
    (_templateObject = _taggedTemplateLiteral([
      "\n  color: red;\n  padding: 10px 1px;\n  background-color: yellow;\n"
    ]))
);
export var Button = function Button() {
  return /*#__PURE__*/ _jsx(ButtonStyle, {
    onClick: function onClick() {
      return console.log("aaaa");
    },
    children: "\u8FD9\u662F\u4E00\u4E2A\u6309\u94AE-update"
  });
};
```

## 本地测试
### 安装依赖
```bash
pnpm --filter=examples add father-react-demo
# 启动 查看效果
pnpm run start --filter=example
```

## 源码
[father-simple-demo](https://gitee.com/soeasyjx/father-simple-demo)