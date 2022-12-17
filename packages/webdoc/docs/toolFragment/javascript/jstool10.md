---
title: 浏览器端生成UUID
---

import {GetUUIDDemo} from "@site/src/toolFragmentDemo/getuuid";

## 方法

### getUUID

```js showLineNumbers
const getUUID = () => {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
```

## Demo

<BrowserWindow>
<GetUUIDDemo/>
</BrowserWindow>
