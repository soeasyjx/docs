---
title: create-fastman2-app
toc: false
---

## create-fastman2-app

[![chiyoucli](https://img.shields.io/npm/v/create-fastman2-app?color=%231890ff)](https://www.npmjs.com/package/create-fastman2-app) [![chiyoucli](https://img.shields.io/npm/dy/create-fastman2-app)](https://www.npmjs.com/package/create-fastman2-app)

开始一个新的业务办理最简单的方法是使用`create-fastman2-app`。这个 CLI 工具使您能够快速开始并创建新的业务办理应用程序，并为您设置好一切。要使用，请使用以下命令:

### 使用

您可以通过运行以下命令交互式地创建一个新项目:

#### 全局安装
```bash
npm i -g create-fastman2-app
# 在项目根目录运行该命令
create-fastman2-app
```
#### npx
```bash
npx create-fastman2-app@latest
```

#### pnpm

```bash
pnpm create fastman2-app
# or
pnpm dlx create-fastman2-app
```

#### npm

```bash
npm create fastman2-app
# or
npm init fastman2-app
```

脚手架会询问你需要执行的命令：

```bash
? 请选择您需要执行的命令: › - Use arrow-keys. Return to submit.
❯   create - 用于生成一个新的业务办理目录
	createWiki
    remove
    --help
    --info
```

### 命令

#### create
> 创建新的业务目录
```
数据来源
packages/fastman-business-slots
packages/fastman2-business-atomics
packages/fastman2-business-scenes
```

命令会要求您输入项目的名称，然后询问您是否要这样做：

```bash
✔ 请选择您需要执行的命令: › create

基础信息

? 请输入业务名称 › 
```

接下去，开发者可根据实际业务需要自行进行<u>平台</u>，`场景`，`原子`，`插槽`的选择

#### createWiki
> 该命令可根据wiki前端设计流程配置信息一键生成指定业务

```bash
✔ 请选择您需要执行的命令: › createWiki


==========wiki授权登录==========

✔ 请输入Wiki登录用户名: … usename
✔ 请输入Wiki登录密码: … xxxxxx

===============================

✔ 登录成功
✔ 资源获取成功


? 请选择您需要开发的任务 › 
❯   两融北交所权限开通
    退市整理可转债权限开通
    模板test
```

**由于wiki服务器，网络等原因可能会出现登录授权失败的问题，如出现此问题，请继续登录授权**

#### remove
>该命令提供删除业务操作，但请谨慎使用，**一但删除，将不可恢复**

```bash
✔ 请选择您需要执行的命令: › remove
✔ 请输入需要删除的业务名称 … business-bjs
? 确认删除【business-bjs】业务相关文件么? › 取消 / 确认
```

#### createVisual
>通过HTTP形式读取JSON数据服务【JSON数据格式已约定】，使用当前命令选项-u来传递服务调用地址

```json
{
  "projectName": "test-aa",// 业务名称
  "platforms": [], //业务需要发布平台 以此生成业务运行脚本命令
  "slots": [],//插槽
  "configJson": [],//场景json数据
  "metadataJson": {}//metadata.js数据
}
```
###### 使用
```bash
npx create-fastman2-app@latest createVisual -u http://xxxxxxxxxx
```

#### --help

```bash
Usage: create-fastman2-app [options] [command]

Options:
  -V, --version           output the version number
  -I,--info               打印环境信息
  -h, --help              display help for command

Commands:
  create [business-name]  该命令用于创建新业务
  remove [business-name]  该命令用于删除已存在业务，使用时应特别小心！！
```

#### --info
> 查看当前运行环境信息，方便排查运行出错

```
✔ 请选择您需要执行的命令: › --info

Environment Info:

  current version of create-fastman2-app: 1.0.3
  running from /Users/xxxxx/.npm/_npx/8046d77be6620dc5/node_modules/create-fastman2-app/dist

  System:
    OS: macOS 13.2
    CPU: (8) x64 Intel(R) Core(TM) i5-8259U CPU @ 2.30GHz
  Binaries:
    Node: 18.14.1 - ~/.nvm/versions/node/v18.14.1/bin/node
    npm: 9.3.1 - ~/.nvm/versions/node/v18.14.1/bin/npm
  npmPackages:
    fastman-oemapp-compatible: 1.1.12 => 1.1.12 
    fastman-pbapp-compatible: 1.0.0 => 1.0.0 
    fastman2: 2.7.8 => 2.7.8 
  npmGlobalPackages:
    create-fastman2-app: Not Found
```
