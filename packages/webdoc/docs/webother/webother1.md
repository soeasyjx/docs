---
title: 前端分支管理
---

import Thumbnail from '@site/src/components/Thumbnail';

## 前言
前端工程分支管理，是一个比较头痛的工作，管理模式太复杂会导致分支过多难免出错并且需要合并大量的合并冲突，太松散又会让保证版本的准确性，版本管理使用哪种方式，应该根据当前项目的复杂程度来确定

## 方案

### AoneFlow分支管理

这是阿里的一套分支管理规则，我们公司也是基于该规则进行分支管理的

三种分支类型：master分支、feature分支、release分支、hotfix分支

master分支：主分支，该分支是永远一直存在，且不能直接在该分支要修改提交，从预分布分支合并到master分支需要打到标签(tag),以便快速回退到之前某个版本

feature分支：功能开发分支，应该当按照功能点来创建该分支，最好不要按照迭代去创建该分支，因为万一产品某天跑过来说，某某功能不能在这个迭代内上线，那就要苦B的回退代码了，feature 分支命名 一般以feature/feature-功能名，当某个功能发布上线后，对应的feature 需要删除，不然分支会太多，容易出错

release分支：预发布分支，当某些功能已达到可以提交测试阶段，就基于master分支创建release分支 如：release/release-v1.0.0 ，将本次可提测的feature合并到release-v1.0.0 ,bug修改在对于的feature修改即可，测试完成之后，就是等待发布状态。基于release 打生产包，之后合并到master分支，记住合并到master分支需要打到Tag，最好删除release-v1.0.0

hotfix分支：线上紧急bug修复分支，时效最短，修改完，提交测试，测试通过，合并到master分支，再次提醒，所有合并master分支的操作都需要打tag ，这个也不例外

优点：这个分支管理策略有啥好处呢，结合我们公司的实际情况，我们公司的app算是一个比较大的app了，产品经理都有好几个，每个产品经理负责各自的业务线，业务迭代周期都可能会不一样，而且临近上线，会突然告诉你某功不合规不能上线，这时你心里会跑着一万头草尼马了。aoneflow 可以每好的处理这个问题，一个功能一个feature，把能提测的feature 合并到release ，如果遇到上面的情况，只需要重新合并新的release即可。当然哪些功能需要提测，这个是由项目经理说的算，跟开发关系不大，一般情不会出现这个问题

### 图示

<Thumbnail
  src='/myimage/gitflow.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

## 参考资料
https://www.cnblogs.com/pluto4596/p/11464819.html#oneflow

https://www.proyy.com/6975811088818372615.html

https://zhuanlan.zhihu.com/p/349805087

https://blog.csdn.net/qq_20097569/article/details/82665013