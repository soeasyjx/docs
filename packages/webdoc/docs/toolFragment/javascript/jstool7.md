---
title: 随机生成十六进制颜色
description: Math.floor Math.random pandEnd
---

import {RandomHexColorDemo} from "@site/src/toolFragmentDemo/randomHexColor";

## 方法

### randomHexColor

```js
const randomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;
```

## Demo

<BrowserWindow>
<RandomHexColorDemo/>
</BrowserWindow>

