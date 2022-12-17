---
id: graytest
title: 前端灰度发布
description: 前端灰度发布落地方案
displayed_sidebar: baseSidebar
---

import Thumbnail from '@site/src/components/Thumbnail';

## 前言

前段时间在面试的时候遇到过前端灰度发布相关的问题，刚好在之前公司有设计过前端灰度发布的方案，这套方案也在多个系统上得到过验证了，最近有时间整理，现在也拿出来和大家交流下

关于灰度规则的一些放量算法也比较容易找到，这篇文章重点不是讲算法，只是更多贴合实际场景把灰度方案落地，对于放量算法有高要求的伙伴可以自行搜一下放量算法相关，桶漏、令牌算法等

## 什么是灰度发布

将某个功能灰度发布（逐渐放量）给特定线上人群，避免新功能全量上线带来的风险

上白话文，某项目当前处于 1.0 版本，但是想更新一个 1.1 版本，1.1 版本内测没有问题了，但是由于改动了关键的功能，想要实现只给一部分线上用户使用体验，看看反馈。这个时候线上就需要一部分用户继续用 1.0 版本，一部分用 1.1 的版本，如果 1.1 版本接收到反馈的问题严重到影响上线了，那么就回退 1.0 版本，影响的用户范围比较小，如果 1.1 版本稳定，那就直接给所有用户过度到 1.1 版本。实现这种场景效果，就是灰度发布。

什么是灰度规则？灰度规则可以是用户等级、性别、地区、客户端等业务信息或者设备信息，比如灰度规则设定为广东地区的用户放问 1.1 版本，那么广东用户访问项目的时候就算命中了灰度规则，给他们转去 1.1 版本，其他地区的用户继续使用 1.0 版本

## 常见灰度发布方案

灰度方案各式各样，既有多样就有对比，没有最好，只有最合适自己的业务场景，这里给大家介绍几种方案，以便大家做比较选择

### 简单 ngxin 分流

推荐指数：⭐️

本身只依赖 nginx 来做的分流还算不上灰度发布的，但是偶然间跟朋友聊起了他们小公司的骚操作实现，赖着说要我写进来，说他们已经试验过了

- 两份代码，分别部署
- 通过 nginx 加权轮询来控制访问百分比（在客户端 cookie 不存在标识的前提）
- 前端引入了 sdk（瞄了下源码，其实就是往 cookie 存入一个随机不重复（还只是大概率不重复吧）的标识
- 二次访问的时候，nginx 通过对 cookie 中的唯一标识来返回对应的版本

优点： 简单，不涉及后端操作缺点：

1. 只能简单依赖 nginx 加权轮询百分比来控制流量，全靠前端，无法结合业务做分流
2. 可控性弱，在灰度版本出现问题的时候，只能通过修改 nginx 配置来让用户回退版本
3. 问题收集能力差，只能等待用户反馈
4. 在客户端 cookie 被清理掉后，用户需要重新通过 nginx 的加权轮询进入，有可能被分配到与上一个分配不同的版本

### nginx + lua + redis

推荐指数：⭐️⭐️

:::tip
这套方案可能是我没找到好的资料或者对这套方案理解得不够深刻，我觉得灵活性有些欠缺，比较难结合复杂的业务做过多的灰度逻辑判断，如果有大佬用过这套方案的，求不吝赐教
:::

- 当用户请求到达前段代理服务 nginx，內嵌的 lua 模块解析 nginx 配置文件中的 lua 脚本代码
- lua 变量获取到客户端的 ip 地址，去查询 redis 缓存内是否有该建值，如果有返回值执行灰度版本逻辑，否则执行当前生产环境版本

nginx + lua + redis 方案网上的资料也比较多，大家可以自行了解，虽然我对着套方案理解不透彻，从整个链路长度理论来看这套方案效率应该是比较高的，所以还是给大家贴了一些文章参考:  
https://zhuanlan.zhihu.com/p/311539717
https://www.jianshu.com/p/fadab3d092c5

### 服务端渲染分流

推荐指数：⭐️⭐️⭐️

服务器渲染分流的方案，其实也是我觉得比较好使的一个方案，这里我先做一些流程简述，后续也会单独对着一块做一些介绍

- 前端打包好的两份代码分别部署到服务器上（这里以单页面应用为例，多页面的话需要单独处理一些其他细节）
- 在后台管理添加版本（实际上就是让服务端读取单页面的 index.html）
- 客户端访问服务端，服务端根据灰度规则 set-cookie 并在 redis 存储，返回对应版本的 index.html
- 二次访问通过服务端的时候，如果存在 cookie 并且 redis 已经存在对应的版本信息，则直接返回，否则重新走灰度流程

<Thumbnail
  src='/myimage/graytest1.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

优点：灵活、可控性强，可结合业务体系做灰度放量规则 缺点：几乎是后端一把梭，对服务器有压力，需要多做相关优化，多页面应用使用比较麻烦

### 客户端注释判断

推荐指数：不推荐

客户端通过注释条件编译，来做灰度，其实就是根据灰度规则对应在代码层面上做判断显示哪些版本的功能，这种方案也有公司在使用，灰度功能一但多了，极其难维护，不推荐，这里就不过多介绍了

### nginx + 服务端 + redis + [前端 sdk]

推荐指数：⭐️⭐️⭐️  
整体方案概述

- 我们先把线上的稳定版本称为 stable 版，本次发布的新功能版本称为 beta 版
- 开发人员给 stable 和 beta 版本各自启动了 nginx 服务，在运维层启动了一层入口 nginx 服务，作为转发
```nginx
upstream beta {
    server localhost:8001; # beta服务
}
upstream root {
    server localhost:8002; # stable服务
}
# $COOKIE_version的前半部分$COOKIE_是固定格式，后边的version则是cookie的key，$group是别名
map $COOKIE_version $group {
    beta beta; #表示cookie的value=beta，即转发给beta
    default root;
}
server {
    listen 80;
    index index.html;
    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/html/public;
    location {
        add_header x-debug $COOKIE_version;
        proxy_pass http://$group$request_uri;
        proxy_set_header x-Forwarded-For $ remote_addr;
    }
}
```
- 客户端通过域名访问项目，通过请求灰度规则，命中灰度规则后，并给客户端设置 cookie 作为标识，并将用户标识存放到 redis，将用户重定向到指定的版本
- 灰度规则接口请求的时候，如果已经带有 cookie 则直接返回对应版本，不存在 cookie 则去查找 redis，redis 中存在对应信息则直接返回，如果不存在则走灰度规则识别流程
- 前端 sdk 功能：用于控制发起灰度规则请求的时机、回调操作和其他业务操作

#### sdk 的使用场景：

项目中需要在特定的时机触发灰度功能，点击某个按钮，或者进入某个页面，比如某些应用是会弹出弹窗，告诉用户有内测版本，是否需要体验，点击同意后才跳转到灰度版本。

方案设计图示
<Thumbnail
  src='/myimage/graytest3.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

名词代号

- stable：正式生产环境（1.0 版本）
- beta：灰度版本（1.1 版本）
- uuid：代码演示中，没有做账号系统，没有登录行为，所以通过 url 上带上 uuid 作为用户 id 来走流程

具体实现（简单演示）

目录结构

```
front-end
├── etc
└── web
    ├── beta
    │   └── index.html
    ├── publish
    └── stable
        └── index.html
```

1. 分别创建两个 html 假设是两个项目，beta 是新功能灰度版本，stable 是当前生产环境版本
2. 在前端引入 sdk（前端 sdk 非必须，看业务场景使用）
3. 前端发起请求，获取版本信息（如果引入了 sdk，可以通过配置做这一步骤）

发起请求
```js
axios
  .get("/gray/constant/getVersion?uuid=" + getQueryVariable("uuid"))
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });
```

response

```json
{
  "code": 1,
  "ctx": "",
  "data": "beta",
  "message": "重新计算"
}
```

后端部分逻辑

```js
router.get("/getVersion", function (ctx, next) {
  const version = ctx.cookies.get("version");
  // 客户端没有做登录，这里直接用query中的字段代表用户信息，在实际项目中，这里应该是读取客户端的用户信息
  const uuid = ctx.query.uuid; // 这里只是演示，直接通过链接获取用户ID，实际场景应该是通过获取用户会话去判断用户相关信息
  const uuids = ["123", "456", "789"]; // 可以进入灰度版本的uuid，存放到数据库中
  // redis 中存放了用户id
  const redisUuids = [
    { id: "789", version: "beta" },
    { id: "333", version: "stable" }
  ];
  let cache = false;
  // cookie 中存在版本信息，并且用户id在redis中有记录
  // cookie中存在version ，那么说明已经给客户端判断过版本了，再去各redis中的用户id集合比对，判断是否存在，存在则不重新获取，如果不存在了，说明需要用户重新获取
  if (version) {
    cache = true;
  } else {
    const uItem = redisUuids.find(function (i) {
      return i.id === uuid;
    });
    if (uItem) {
      //redis中存在，则直接返回redis存放的版本
      ctx.cookies.set("version", uItem.version);
    } else {
      // 这里设置cookie的时长为1小时，可以根据自己的场景灵活调整，如果是时间设置长了，最好在会话过期或者退出登录的时候需要做清除cookie操作
      if (uuids.includes(uuid)) {
        ctx.cookies.set("version", "beta", { maxAge: 3680000 });
      } else {
        ctx.cookies.set("version", "stable", { maxAge: 3680000 });
      }
    }
    ctx.body = {
      code: 1,
      data: uuids.includes(uuid) ? "beta" : "stable",
      ctx: ctx.request.href,
      message: cache ? "缓存" : "重新计算"
    };
  }
});
```

