---
title: 获取数组最大/最小值
description: Math
---

## Demo

```js live noInline
const Demo = () => {
  const nums = [2, 4, 6, 8, 1, 3, 5, 7];

  Math.min(...nums);
  return (
    <>
      <div>最大值：{Math.max(...nums)}</div>
      <div>最小值：{Math.min(...nums)}</div>
    </>
  );
};
render(<Demo />);
```

