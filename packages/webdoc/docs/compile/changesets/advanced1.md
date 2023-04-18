---
title: 预发布
---

## 前言
当我们在开发一个库的时候，不会一开始就弄一个正式的版本号，一般都会先有一个公测的版本号，给使用者用，当使用下来没有问题了，才会发布正式的版本，changeset 也提供了我们一套预发布的流程

这个流程也是我们后来才理解的，首先当我们开发一个库的时候，会大致是以下流程
1. 编写库核心功能代码
2. 预发布到npm （其实也就是给版本号添加特性tag，发布的时候打上tag标签，一般的格式：1.0.0-beta.0）
3. 发布正式版本（当然在发布正式版本之前可能会经过很多的预发布版本）

## 使用npm进行预发布
在说changeset预发布之前，我们使用npm其也可以进行预发布

1. 如果项目是初始创建，则先手动在package.json中添加预发布版本号：  
`1.0.0-beta.0`或者使用npm version prerelease --preid=beta(之后则可通过npm version [major|mijor|patch])，来迭代预发布版本号 ; **prerelease 可以修改成premajor | preminor | prepatch**
2. 发布到npm上，打上tag，通过npm publish 发布到npm上，默认是有latest标签，如果是预发布版本需要添加--tag name （name可根据需要自定义），npm publish --tag beta
3. 正式发布

## 使用changeset进行预发布
1. 进行预开发布开发模式 `npx changeset pre enter beta`，不一定要叫`beta`，此时会在.changeset 下生成`pre.json`文件，你可以认为，有这个文件就表示，当前处理预发布模式下
2. 完成库核心逻辑编写，第一步，第二步顺序没有要求
3. 添加修改信息，生成修改日志 `npx changeset add`，这时会在.changeset 下生成变更集文件，这里可以先不用管
4. 消费版本号 `npx changeset version`
5. 预发布 `npx changeset publish` 会自动打开tag 为`beta`的标签
6. 代码提交git

> 因为我们在第一步就，开启了预发布模式，因此之后的几步都是处于该模式下
这一开发模式(预发布模式)，可能会存在一定的时间，当我们觉得，可以发布正式版本，则需要退出模式发布模式

### 退出预发布模式
当库可以发布正式版本的，需要先退出，预发布模式

1. 执行`npx changeset pre exit`  退出预发布模式
2. 消费多个版本号文件【在预发布中，第三步生成的】`npx changeset version` ,它会删除.changeset `pre.json` 文件
3. 正式发布`npx changeset publish`

通过`预发布`和`正式发布`流程，可完成一个库的完整发布