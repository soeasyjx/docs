---
title: API请求慢
---

import Thumbnail from '@site/src/components/Thumbnail';

## 前言

我们在开发过程中，发现后端 API 请求特别慢，于是跟后端抱怨。  
“怎么 API 这么慢啊，请求一个接口要十几秒”。  
而且这种情况是偶现的，前端开发同学表示有时候会出现，非必现。  
但是后端同学通过一顿操作后发现，接口没有问题，他们是通过 postman 工具以及 test 环境尝试，都发现接口请求速度是没有问题的。

“那感觉是前端问题”?

我们来梳理一下问题，如下：

- 后端 API 请求特别慢，而且是偶现的
- 在 test 环境没有复现
- postman 工具请求没有复现

## 分析问题

**时间都去哪了？**
第一个问题，API 请求耗费的时间都用来做什么了？

我们打开 Chrome 调试工具。在 network 中可以看到每个接口的耗时。

<Thumbnail
  src='/myimage/apislow1.jpg'
  alt='Choose either AWS or GCP'
  width='556px'
/>

hover 到你的耗时接口的 Waterful，就可以看到该接口的具体耗时

<Thumbnail
  src='/myimage/apislow2.jpg'
  alt='Choose either AWS or GCP'
  width='556px'
/>

可以看到，其耗时主要是在 `Stalled`，代表**浏览器得到要发出这个请求的指令到请求可以发出的等待时间**，一般是代理协商、以及等待可复用的 TCP 连接释放的时间，不包括 DNS 查询、建立 TCP 连接等时间等

所以 API 一直在等待浏览器给它发出去的指令，以上面截图的为例，整整等待了 23.84S，它请求和响应的时间很快（最多也就几百毫秒，也就是后端所说的接口并不慢）

那么 API 到底在等待浏览器的什么处理？

### 什么阻塞了请求?

经过定位，我们发现，我们项目中使用 Server-Sent Events（以下简称 SSE）。它跟 WebSocket 一样，都是服务器向浏览器推送信息。但不同的是，它使用的是 HTTP 协议

当不通过 HTTP 2 使用时，SSE 会受到最大连接数的限制，限制为 6 次。此限制是针对每个浏览器 + 域的，因此这意味着您可以跨所有选项卡打开 6 个 SSE 连接到 www.example1.com，并打开 6 个 SSE 连接到 www.example2.com

该问题在 **Chrome[1] 和 Firefox[2] 中被标记为“无法解决”**。
至于偶现，是因为前端开发者有时候用 Chrome 会打开了多个选项卡，每个选项卡都是同一个本地开发地址，就会导致达到 SSE 的最大连接数的限制，而它的执行时间会很长，也就会阻塞其他的请求，一致在等待 SSE 执行完。

## 解决方案

简单粗暴的两个方法：

1. 不要打开太多个选项卡。这样就不会达到它的限制数。（因为我们一个选项卡只请求一个 SSE）
2. 开发环境下，关闭该功能
3. 使用 HTTP 2

使用 HTTP 2 时，HTTP 同一时间内的最大连接数由服务器和客户端之间协商（默认为 100）  
这解释了为什么我们 test 环境没有问题，因为 test 环境用的是 HTTP / 2。而在开发环境中，我们使用的是 HTTP 1.1 就会出现这个问题。

### 如何在开发环境中使用 HTTP 2

我们现在在开发环境，大部分还是使用 webpack-dev-server 起一个本地服务，快速开发应用程序。在文档中，我们找到 [server](https://webpack.docschina.org/configuration/dev-server/#devserverserver) 选项，允许设置服务器和配置项（默认
为 'http'）

只需要加上这一行代码即可

```json
devServer: {
  server: 'spdy',
  port: PORT,
}
```

看看效果，是成功了的

<Thumbnail
  src='/myimage/apislow3.jpg'
  alt='Choose either AWS or GCP'
  width='556px'
/>

原理使用 [spdy](https://www.npmjs.com/package/spdy) 使用自签名证书通过 HTTP/2 提供服务。需要注意的一点是

:::caution
该配置项在 Node 15.0.0 及以上的版本会被忽略，因为 spdy 在这些版本中不会正常工作。一旦 Express 支持 Node 内建 HTTP 2，dev server 会进行迁移
:::

## 总结归纳
原本这个问题认为跟前端无关，没想到最后吃瓜吃到自己头上。提升相关技能的知识储备以及思考问题的方式，可能会方便我们定位到此类问题

充分利用好浏览器的调试工具，对一个问题可以从多个角度出发进行思考。比如一开始，没想到本地也可以开启 HTTP 2。后来偶然间想搜下是否有此类方案，结果还真有！