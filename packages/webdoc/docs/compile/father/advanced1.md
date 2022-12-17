---
title: 进阶-lodash
---

## 目录结构调整

为了方便接下去库的本地测试工作，我们现将目录结构调整一下，使用[workspace](/category/workspace)目录结构，调整后的结构如下

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
│   └── father-lodash-demo
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

example：库测试项目，便于测试我们开发的库，直接使用[`npx create-react-app`](https://create-react-app.bootcss.com/)创建即可
packages：库开发目录

## 安装 lodash

> 将外部依赖写进 peerDependencies 中，表示，如果使用该库，必须安装 lodash

这里我们同时安装上@types/lodash

```bash
pnpm add lodash @types/lodash --filter=father-lodash-demo --save-peer
```

## 添加测试代码

```ts {1,3-5}
import { map } from "lodash";
export const objMerge = () => {
  const arr = map([1, 2, 3, 4], (item) => {
    return item + 2;
  });
  const _key = "age";
  const obj1 = {
    name: "jiangxin",
    [_key]: 100
  };
  const obj2 = {
    address: "湖南长沙"
  };

  return { ...obj1, ...obj2, arr };
};
```

## 执行打包

```bash
pnpm build-lodash
```

## 结果

> 可以看到 lodash 的代码并没有被打包进输出文件中，而是只保留了对 lodash 的引用，这里区别于 rollup 的默认行为，rollup 会将其一起打包进 rollup，除非排除，具体可参考[rollup-进阶-lodash](/compile/rollup/advanced2)

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

import { map } from "lodash";
export var objMerge = function objMerge() {
  var arr = map([1, 2, 3, 4], function (item) {
    return item + 2;
  });
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
  return _objectSpread(
    _objectSpread(_objectSpread({}, obj1), obj2),
    {},
    {
      arr: arr
    }
  );
};
```

## 本地测试
得益于我们将项目结构调整为了workspace，因此测试father-simple-demo非常的方便

### example安装依赖
```bash
pnpm add father-lodash-demo --filter=example
# 启动 查看效果
pnpm run start --filter=example
```

## 源码
[father-simple-demo](https://gitee.com/soeasyjx/father-simple-demo)