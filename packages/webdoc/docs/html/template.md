---
title: template 元素的使用
---

import Thumbnail from '@site/src/components/Thumbnail';

## 前言

`<template>`HTML 元素是用来存储尚未使用的 HTML 的。元素本身和它的所有内容都是不可见的，所以它基本上可以在文档中的任何地方，没有太大的风险

## 干嘛用的

实际上`<template>`元素更像是一种便利工具。如果您有重要或可重复使用的的 HTML 片段需要在运行时注入，使用 [document.createElement](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement) 和 [element.setAttribute](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute) 操作可能会非常麻烦

我们看一下这个例子，使用一个模板（template）来保存一个按钮，通过 JavaScript 在需要注入该按钮，在此之前它无法工作。使用 SVG 在 JS 中手动创建该按钮非常麻烦。通过将 HTML 移动到 JS 逻辑中也会违反适当的关注点分离

```html
<template id="burger-template">
  <button type="button" aria-expanded="false" aria-label="Menu" aria-controls="mainnav">
    <svg width="24" height="24" aria-hidden="true">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z">
    </svg>
  </button>
</template>
```

## 如何使用它

你可以通过 javascript 访问`<template>html element</template>`中的内容并克隆它，在任何你想要的地方呈现它

### javascript 访问 template

```js
const template = document.querySelector("#burger-template");
const content = template.content.cloneNode(true);

container.append(content);
```

它也不限于单次使用。您可以根据需要创建任意数量，[MDN 页面](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)有一个在模板中存储表格行的好示例，因此您可以轻松克隆并按需添加新行

## 浏览器支持

浏览器支持出奇的好。目前几乎 98% 的环境都支持它，因此可以随意的使用它
<Thumbnail
  src='/myimage/template.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>
如果您必须支持较旧的代理，您可以像这样测试支持：

```js
if ('content' in document.createElement('template')) {
  // `<template>` is supported.
}
```