---
title: 数据类型检查
---

import {CheckTypeDemo} from "@site/src/toolFragmentDemo/checktype";

## 方法

### isString

```js showLineNumbers
const isString = (val) => {
  return Object.prototype.toString.call(val) === "[object String]";
};
```

### isObject

```js showLineNumbers
const isObject = (val) => {
  return Object.prototype.toString.call(val) === "[object Object]";
};
```

### isArray

```js showLineNumbers
const isArray = (val) => {
  return Object.prototype.toString.call(val) === "[object Array]";
};
```

### isFunction

```js showLineNumbers
const isFunction = (val) => {
  return Object.prototype.toString.call(val) === "[object Function]";
};
```

### isNull

```js showLineNumbers
const isNull = (val) => {
  return Object.prototype.toString.call(val) === "[object Null]";
};
```

### isUndefined

```js showLineNumbers
const isNull = (val) => {
  return Object.prototype.toString.call(val) === "[object Undefined]";
};
```

## Demo

<BrowserWindow>
<CheckTypeDemo/>
</BrowserWindow>
