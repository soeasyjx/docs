---
title: 展示最新包版本小部件
---

import Thumbnail from '@site/src/components/Thumbnail';

## 前言
呃！说来惭愧，这个npm 包的版本小部件我竟然一直不知道`version badge` 这是个啥玩样呢，当我们将包发布到npm 上后，都会版本号，使用dumi/vuepress/storybook为其编写文档的时候，如何自动关联包的最新版本呢？？

## 组件文档版本号显示

显示版本号方案：
1. 手动写入版本号
2. 通过第三方引入自动关联npm包最新版本号

第一种方式是我之前在使用的 🤪 🤪，后来无意中看到一些组件文档会有如下图的版本badge：
<Thumbnail
  src='/myimage/webother9_img1.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

就F12审查了一下源代码
<Thumbnail
  src='/myimage/webother9_img2.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

:::tip
直接在浏览器打开：https://img.shields.io/npm/v/@tuya/dumi-theme-tuya/latest.svg，发现该组件的版本badge，奇怪的是，这个链接上并没有版本的相关信息。于是就分析，应该是有一个专门查版本的公共服务，提供包名就可以返回给我们包最新版本的badge。其实通过对链接分析就能大概看出这个服务的链接：https://shields.io/
:::

### [shields](https://shields.io/)
提供npm 包最新版本等等各种badge，shields相当强大，不权仅仅能提供版本号badge，还可以提供像下载量，测试覆盖率等等众多badge，还可以选择样式，配置颜色

#### 使用方法
选择你需要的badge ,我们这里选择`Version`找到npm，点击，它会提供一个可视化的配置界面如下面：
<Thumbnail
  src='/myimage/webother9_img3.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

输入包的名字，就会自动生成链接，我们可以直接复制链接放置到需要的地方就可以展示出来了,
在这里我们选择成生`markdown` 当然它也提供很多链接类型，你可以根据实际需要选择生成即可
```
[![npm version](https://img.shields.io/npm/v/easy-component-base?style=plastic)](https://www.baidu.com)
```

### [badge](https://badge.fury.io/)
跟`shields`功能类似，没有`shields`强大，不能配置颜色，样式
<Thumbnail
  src='/myimage/webother9_img4.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

### [cnpm](https://npmmirror.com/)
cnpm 也提供了version badge功能，不过不好用，需要自己明确写包的版本才行（有可能是我没研究透），不推荐使用：
```
[![test](https://npmmirror.com/badge/v/easy-component-base.svg?version=1.0.3)](https://www.baidu.com)
```

如果你对cnpm 情有独钟可自行研究