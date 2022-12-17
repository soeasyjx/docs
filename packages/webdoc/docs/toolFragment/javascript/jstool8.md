---
title: 两日期之间相差天数
description: Math.ceil Math.abs
---

import {DayDiffDemo} from "@site/src/toolFragmentDemo/dayDiff";

## 方法

### dayDiff

```js showLineNumbers
const dayDiff = (d1, d2) =>
  Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / 86400000);
```

## Demo

<BrowserWindow>
<DayDiffDemo/>
</BrowserWindow>

