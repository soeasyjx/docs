---
title: chrome devtools你可能不知道的调试技巧
---

import Thumbnail from '@site/src/components/Thumbnail';

## 保存被修改的资源文件

> 有时候我们在调整已发布到服务器的页面时，需要在浏览器中修改页面的一些资源(js,css,html)，但是修改后，刷新页面，所修改的内容就被重置了，其实在chrome 中可以保存修改的资源

### 步聚

在先本地目录中新建一个空文件夹，如: `source`

依次点击【1-源代码】->【2-替换】->【3-选择放置替换项的文件夹】(这里选择刚刚创建的文件夹-source)，之后在【4-网页】tab找到你所需要修改的资源，修改完成保存，即可实现刷新页面不丢失修改内容的需求

<Thumbnail
  src='/myimage/webother18_2.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

## 运行脚本文件

>在chrome 在运行脚本一般最常用的方式是直接在控制台编写脚本即可，如果脚本过大，这种方法就显示不太方便了，其实还有另一种方法可以运行脚本文件

### 步聚

依次点击【1-源代码】->【2-代码段】->【3-新代码段】,新建脚本：4-myscript，5-在其中编写脚本，点击运行按钮或快捷键6-`command+enter`运行当前脚本

<Thumbnail
  src='/myimage/webother18_1.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>