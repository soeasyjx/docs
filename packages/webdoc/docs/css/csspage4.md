---
id: multipleanimation
title: 多组动画
displayed_sidebar: baseSidebar
---

import { MultipleAnimationsDemo } from "@site/src/docsDemo/MultipleAnimations";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## 前言

在开发中我们常用 css 的 [animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation) 来为元素添加一个`Single animation`或`Multiple animations`多个动画效果，今天我们来讲解一下如果为一个元素添加多组动画

## 属性

- [animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)

animation 属性用来指定一组或多组动画，每组之间用逗号相隔

## 关键样式代码

<Tabs>
<TabItem value="html" label="html">

```html
<div class="div">
  Multiple animationsMultiple animationsMultiple animationsMultiple
  animationsMultiple animationsMultiple animations
</div>
```

</TabItem>
<TabItem value="css" label="css">

```css
.multipleanimations {
  height: 0px;
  width: 300px;
  margin-left: 50%;
  overflow: hidden;
  transform: translateX(-50%);
  background-color: blueviolet;
  // 多组动画
  animation: myanimation1 1000ms ease-in 100ms forwards, myanimation2 2000ms
      ease-out 1100ms forwards;
}

@keyframes myanimation1 {
  0% {
    height: 0px;
  }
  100% {
    height: 200px;
  }
}

@keyframes myanimation2 {
  0% {
    height: 200px;
  }
  100% {
    height: 0px;
  }
}
```

</TabItem>
</Tabs>

## 效果
>点击"重置动画"按钮，可反复查看效果

<BrowserWindow>
<MultipleAnimationsDemo/>
</BrowserWindow>

[animation-delay](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay)：表示动画何时开始

[animation-duration](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-duration): 指定一个动画周期的时长，就是动画从开始第一帧到最后一帧所用的时间

## 结论
动画1（myanimation1）animation-delay：100ms 表示 动画1 延迟100ms 开始动画，如果想要动画2（myanimation2）丝滑的连接上myanimation1，那myanimation2的animation-delay=（myanimation1.animation-delay）+（myanimation1.animation-duration ），这样才能保证动画的连续性

:::caution
@keyframes 最好使用 value% 不要使用 to ,因为 safari 会有兼容性问题，看不到效果
:::
