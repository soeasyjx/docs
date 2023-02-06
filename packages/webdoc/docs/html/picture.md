---
title: 使用picture替代img标签
---

import Thumbnail from '@site/src/components/Thumbnail';

## 前言

为什你应该使用`picture`标签而不是`img`标签?

在用户界面中使用图片和动画已经成为现代网络应用的一个普遍现象。尽管这些现代设计的重点是改善你的应用程序的用户体验，但如果这些图像对所有设备都没有响应，事情就会变得适得其反

作为开发者，我们必须满足所有这些要求。但大多数时候，我们错过了一些小东西，而这些小东西可以带来巨大的差异，因为我们正在寻找更高层次的解决方案

在`picture`标签和`img`标签之间做出选择可能是这样一个微小的决定，但如果你做出正确的选择，你将能够改善用户体验和性能

## [picture](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture)

HTML `<picture>`元素还是挺实用的，往往和`<source>`元素（可以多个）、`<img>`元素（最多一个）一同使用

渲染的时候，浏览器优先使用`<source>`元素，`<img>`元素兜底，`<source>`元素标签可以使用多个。

所以，当我们需要在不同场景显示不同图片的时候，`<picture>`元素就特别的实用。

### 不同尺寸显示不同图片

这个功能常使用`HTML media`属性实现

```html
<picture>
  <source srcset="./image/测试图片1.jpg" media="(min-width: 640px)" />
  <img src="./image/测试图片2.jpg" />
</picture>
```

device width(浏览器)>=640 显示：测试图片 1.jpg

device width(浏览器)<640 显示：测试图片 2.jpg

### 不同宽度、屏幕密度显示不同图片

srcset 属性，可以根据图像尺寸（w 描述符），或者设备相似比（x 描述符）显示不同的图像资源，例如：

```html
<picture>
  <source
    srcset="
      ./image/测试图片1.jpg 1x,
      ./image/测试图片2.jpg 2x,
      ./image/60.png    3x
    "
  />
  <img src="./image/测试图片1.jpg" />
</picture>
```

#### DPR 1.0

<Thumbnail
  src='/myimage/picture1.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

#### DPR 2.0

<Thumbnail
  src='/myimage/picture2.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

#### DPR 3.0

<Thumbnail
  src='/myimage/picture3.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

### 不同浏览器显示不同后缀图片

比方说新出了个比 webP 更牛逼的图像格式 AVIF，Chrome 浏览器已经支持了，但是其它浏览器不支持，你又想使用，怎么办呢？

`<picture>`元素可以帮忙，主要是使用`<source>`元素的`type`属性实现，HTML 代码示意：

```html
<picture>
  <source srcset="zxx.avif" type="image/avif" />
  <source srcset="zxx.webp" type="image/webp" />
  <img src="zxx.jpg" />
</picture>
```

如果浏览器支持 avif 格式，那边就加载体积最小的 AVIF 格式（体积 47K），如果浏览器不支持 AVIF 格式，但是支持 WEBP 格式，则加载 zxx.webp（体积 56K），如果 AVIF 和 WEBP 图片格式当前浏览器都不支持，则会加载`<img>`元素兜底的 zxx.jpg（体积 74K）

## 使用的人不多

从上面案例可以看出，如果有不同场景显示不同图片的需求，`<picture>`元素确实很实用，但是为什么日常项目开发很少见到前端同学使用呢？

### HTML 天生劣势，知道的人不多

在前端领域，关于 HTML 的书籍几乎是一片空白，因为出了没人看的  
HTML？不就是一些标签吗？

我使用 Vue 直接 div 一把梭，效果照样 666，有什么好学的。

这样的心态普遍都是，这是很正常的，HTML 深入的东西都不是与功能相关的，而是与用户体验相关的，而大多数的开发人员能够把功能实现就已经很不容易了，没有精力也没有动力去关注过于细节的用户体验相关的东西。

自然，HTML 的东西也就不怎么关心了，关心的人少，自然了解`<picture>`元素的人就少，相关文章的传播也就少，进一步导致大多数前端都不知道有这个一个 HTML 元素，就算晓得有这样一个元素，也不知道它具体是干嘛用的。

本质上还是商业和市场决定的

### 开发成本的问题

一个技术能否流行，能否普及，看的不是其牛不牛，而是容不容易上手，开发成本是不是低。

`<picture>`元素使用的最大问题是，无论什么场景，我们都需要准备多份的素材。

这些多份的素材哪里来呢？

是不是设计师要准备多份，开发要准备多份？

这些都是人力成本，根本不可能持久的，就算开发人员很敬业，专门花时间做了这样很棒的事情，但是以后维护的人呢？100%怎么简单怎么来。

什么 PC 端移动端，什么 1 倍屏 2 倍屏，全部都是 2 倍图一把梭，浪费点流量就流量呗，自己的绩效和考核又不和这个相关

反而我开发人员花时间区分设备使用不同素材可能导致排期来不及，呵呵，那就麻烦大了，这就是现实

当然，最好是用工具处理这个事情。

直接写一段`<img>`，自动提取 src 地址，使用 Node 转格式，转尺寸等。

但是，还是麻烦，而且有可能后患无穷。

当年 Gulp 流行的时候，PNG 雪碧图很流行，我记得是使用一个叫 spritesmith 的工具合成的，直接扔 PNG 小图标，自动合并成雪碧图，CSS 都帮你生成好了，是不是很屌？

MD 这玩意现在搞死人了

## `<picture>`元素有替代方案

`<picture>`元素的设计初衷是好，但是，其可以解决的每一个场景都有替代方案

1. 不同宽度显示不同图片。

如果是背景图，都是 CSS @media 查询一句搞定的，实时渲染响应，维护方便，代码干净，人见人爱。

如果是`<img>`图片，直接 CSS 限定尺寸，然后 object-fit 属性控制显示就好了，简单轻松，代码干净，人见人爱。

2. 不同设备密度显示不同图片

同样的，CSS Medias Query 查询一样支持，如果非要使用`<img>`元素设置，直接一个`<img>`元素就好了，根本无需`<picture>`元素进行嵌套，`<img>`元素也支持 srcset 属性，还支持 sizes 属性，w、x 标识符，很强的。

```html
<img
  src="128px.jpg"
  srcset="128px.jpg 128w, 256px.jpg 256w, 512px.jpg 512w"
  sizes="(max-width: 360px) 340px, 128px"
/>
```

3. 不同浏览器显示不同格式的图片
真实的项目中，这个都是交给云服务厂商处理的，通常COS服务支持通过配置让Chrome等浏览器显示webp，IE、Safari等浏览器显示jpg的

不会说通过前端，一个一个手动转图片格式，然后再使用`<picture>`元素包起来处理的

都是直接一个src地址搞定

