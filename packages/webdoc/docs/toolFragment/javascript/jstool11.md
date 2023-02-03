---
title: 随机获取数组元素
---

import {GetRandomItemDeom} from "@site/src/toolFragmentDemo/getRandomArray";

## 方法

### getUUID

```js showLineNumbers
const getRandomItem = <T extends any[]>(array: T) => {
  const mode = array;
  const modeIndex = Math.floor(Math.random() * mode.length);
  return mode[modeIndex] as T[number];
};
```

## Demo

<BrowserWindow>
<GetRandomItemDeom/>
</BrowserWindow>
