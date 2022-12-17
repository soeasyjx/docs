---
title: 获取URL查询参数 
description: 通过正则或new URL 获取查询通数
---

import {GetURLParametersDemo} from "@site/src/toolFragmentDemo/getURLParameters";

## 方法

### getURLParameters
```js showLineNumbers
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );
```

## Demo

<BrowserWindow>
<GetURLParametersDemo/>
</BrowserWindow>
