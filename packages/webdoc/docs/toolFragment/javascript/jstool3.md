---
title: 数据千分位
description: 将数字字符串千分位
---

## 前言

我经常需要格式化货币，它需要遵循以下规则：

`123456789 => 123,456,789`

`123456789.123 => 123,456,789.123`

## Demo

```jsx live noInline
const formatMoney = (money) => {
  return money.replace(
    new RegExp(`(?!^)(?=(\\d{3})+${money.includes(".") ? "\\." : "$"})`, "g"),
    ","
  );
};
const Demo = () => {
  return (
    <>
      {formatMoney("123456789")}
      <br />
      {formatMoney("123456789.123")}
      <br />
      {formatMoney("123")}
      <br />
    </>
  );
};
render(<Demo/>)
```

