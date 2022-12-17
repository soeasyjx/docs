---
title: 获取前N天的日期
description: Date
---

import {DaysAgoDemo} from "@site/src/toolFragmentDemo/daysAgo";

## 方法

```js showLineNumbers
const daysAgo = (n) => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split("T")[0];
};
```

## Demo

<BrowserWindow>
<DaysAgoDemo/>
</BrowserWindow>

