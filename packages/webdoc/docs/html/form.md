---
title: 从form标签获取所有数据
---

## 前言

这个知识点比较基础，不过，还是记录一下，如何从 form 标签获取数据，想必都难过倒大伙了， 我就直接上代码吧

## Javascript

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
<TabItem value="html" label="html">

```html
<form>
  <input type="text" name="name" />
  <input type="text" name="email" />
  <button type="submit">Submit</button>
</form>
```

</TabItem>
<TabItem value="js" label="javascript">

```js
  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const email = formData.get('email')
    const name = formData.get('name')
  })
```

</TabItem>
</Tabs>

## React

```js
import * as React from "react";

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const name = formData.get("name");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <input type="text" name="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

