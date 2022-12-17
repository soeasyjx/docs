---
title: 版本管理
---

import Thumbnail from "@site/src/components/Thumbnail";

## 前端

当我们在编写/修改完自己的第三方库，准备发布到 npm 上时，库的版本号是一个必不可少的信息，即`package.json->version` ，一般情况下，修改版本号的方式有以下几种

1. 手动修改维护版本号，即自己在 package.json->verison 中进行修改
2. [npm verison](https://docs.npmjs.com/cli/v8/commands/npm-version)
3. [changesets](https://github.com/changesets/changesets)

第三种方案`changesets` 是我主要想介绍的方案

**有关 npm 包版本知识可参数[npm 版本号](/webother/webother11)**

## npm-changesets

### 创建项目

项目我们还是使用之前[npm workspace](/compile/workspace/npm)项目

也可以直接在 gitee 上下载[npm workspace](https://gitee.com/soeasyjx/npm-workspacce.git)

### changesets

```bash
# 根目录下安装
npm i @changesets/cli --save-dev
```

### 添加执行命令

为了方便，我们将 changesets 会经常用到命令添加到根目录 scripts 中，[官方文档](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)

```json
{
  "scripts": {
    "changeset": "changeset init",
    "changeset-add": "changeset add",
    "version": "changeset version",
    "publish": "changeset publish"
  }
}
```

- changeset init：初始化 changesets ，执行该命令，会在根目录下生成.changeset 文件夹，里面会生成一个 changeset 的 config 文件 **只需要在初始化的时候执行一次就行了**
- changeset add：add 在 changesets 中算得上比较关键的命令之一了，它会根据 monorepo 下的项目来生成一个 changeset 文件，里面会包含前面提到的 changeset 文件信息(更新包名称、版本层级、CHANGELOG 信息)
- changeset version：version 这个命令这里可以当作 bump version 来理解，这里本质上做的工作是消耗 changeset 文件并且修改对应包版本以及依赖该包的包版本，同时会根据之前 changeset 文件里面的信息来生成对应的 CHANGELOG 信息
- changeset publish：发布包，跟 npm publish 一个用途

### 初始化 changesets

```bash
npm run changeset
```

### 添加变更记录

当我们完全库的可发后，可添加库的变更记录信息

```bash
npm run changeset-add
# or
npx changeset add
```

它将会列出有修改的库，根据提供一步步选择合适的选择即可:
<Thumbnail
  src="/myimage/changeset-img1.png"
  alt="Choose either AWS or GCP"
  width="556px"
/>

### 消费变更记录

> 在 changesets 工作流会将开发者分为两类人，一类是项目的维护者，还有一类为项目的开发者
> 开发者需要去执行 `npm run changeset-add`

项目维护者，一般是小组的组长之类的人吧，会去执行消费命令,其实也就是根据开发者添加的变更记录，去生成对应的版本号操作

```bash
npm run version
# or
npx changeset version
```

### 发布

```bash
# 先登录
npm login
# 发布
npm run publish
# or
npx changeset publish
```

## 依赖包关联升级

changeset 也可以将包关联升级，这是什么意思是：

现在我们有 child-npm-a，child-npm-b 两个包，child-npm-b 依赖了 child-npm-a，child-npm-a 升级了 child-npm-a 也需要升级，即使 child-npm-b 没有修改过代码，要开启该特性，需要使用到`linked`或`fixed`

### [linked](https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#linked-array-of-arrays-of-package-names)


[详细参考](https://github.com/changesets/changesets/blob/main/docs/linked-packages.md)

此选项可用于声明包应该“共享”一个版本，而不是完全独立地进行版本控制，说白了就是 child-npm-a，child-npm-b 两个包的版本号一直都是一样的，其中一个包的版本号变更了，另一个包的版本也会一同变更，然后两个包都需要发布到 npm 上

例如，如果您有一个@changesets/button 组件和一个@changesets/theme 组件，并且您希望确保当一个组件被升级到 2.0.0，另一个也会被升级到 2.0.0。为此，配置如下：

```json
{
  "linked": [["@changesets/button", "@changesets/theme"]]
}
```

在 npm-workspace 项目中，配置如下：

```json
{
  "linked": [["child-npm-a", "child-npm-b"]]
}
```
:::caution
**major**
child-npm-a或child-npm-b **主版本号(major)**变更，则依赖它们的包版本也会**自动变更**，次版本号(mijor)或patch变了，不会自动变更依赖了它们的包的版本号

现在child-npm-b中依赖child-npm-a，child-npm-a升级了主版本号，执行`npx changeset version`也将child-npm-b的版本号也一并修改到child-npm-a的版本号


**patch，mijor**
这里有个地方需要注意，在执行`npx changeset add`命令的时候，changeset 并不是主动去勾选child-npm-a或child-npm-b，需要包管理者在控制台面板中主动选择才会使之共享版本

上面的配置中`child-npm-a`，`child-npm-b`共享同一个版本号，现在只修改了child-npm-a中的代码，然后执行`npx changeset add`的时候选择变更patch或mijor，需要开发者手动选择`child-npm-b`包，才会让`child-npm-b`版本也升级
:::
### [fixed](https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#fixed-array-of-arrays-of-package-names)

```json
{
    "fixed": [["child-npm-a", "child-npm-b"]]
}
```

此选项可用于声明包应该进行版本调整并一起发布。举个例子，如果你有一个child-npm-a组件和一个child-npm-b组件，当child-npm-a组件升级版本号到1.1.0，另一个包child-npm-b也会升级到1.1.0不管它是否有任何变化

因此fixed显示会更强硬一些，不管依赖的包有没有修改，版本号都会变

当有另一个包child-npm-ab引用了child-npm-a或child-npm-b，只要child-npm-a，child-npm-b变化了版本号，child-npm-ab也会变更版本号

fixed，linked属性只能两选一，不能同时存在


## 注意

这里有两点需要注意的地方

1. .changeset->config 中有一个 baseBranch ，它表示我们当前的所处的分支，它默认是`main`，由于我的主分支是`master`，所以这里需要修改成`master`，不会在执行命令的时候会报错
2. 执行`changeset publish`的时候报如下错：

```
🦋  error an error occurred while publishing child-npm-a: EUNSCOPED Can't restrict access to unscoped packages.
🦋  error npm notice Publishing to https://registry.npmjs.org/
🦋  error npm ERR! code EUNSCOPED
🦋  error npm ERR! Can't restrict access to unscoped packages.
🦋  error {
🦋  error   "error": {
🦋  error     "code": "EUNSCOPED",
🦋  error     "summary": "Can't restrict access to unscoped packages.",
🦋  error     "detail": ""
🦋  error   }
🦋  error }
🦋  error
🦋  error npm ERR! A complete log of this run can be found in:
🦋  error npm ERR!     /Users/jiangxin/.npm/_logs/2022-10-30T10_42_38_870Z-debug-0.log
🦋  error
🦋  error packages failed to publish:
```

这个需要将.changeset->config 中`access`值修改成`public`

最终的 config 如下

```json
{
  "$schema": "https://unpkg.com/@changesets/config@2.2.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "master",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

3. 如果在发布的时候需要打标签 tag ，就不能使用 npm run publish 了，因为`npm run publish`不支持透传参数到 changeset publish，只能使用 npx changeset publish --tag beta，目前还没找到执行 npm run publish --tag beta 命令能直接把--tag beta 参数透传到 changeset publish 的方法

## 参考

- [changesets](https://zhuanlan.zhihu.com/p/427588430)
- [changesets](https://modernjs.dev/docs/guides/features/changesets/introduce)
