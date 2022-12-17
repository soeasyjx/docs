---
title: npm 版本号
---

## 前言
现在我们要开发一个项目，我们都知道为了方便项目管理，要写一个版本号，那开发的时候初始的版本号是多少呢？是 `1.0.0` 还是 `0.0.1` 开始？

如果一个版本号为 `X.Y.Z`，什么时候是 X 应该加  1，什么时候 Y 应该加 1 ，什么时候 Z 应该加 1，加 1 遵循十进制吗？比如 1.0.9 的下一个版本应该是 1.1.0 吗？

我们经常看到一些项目的版本还带着后缀，比如 React 的 `18.0.0-rc.3`、  Vue 的 `2.7.0-alpha.12`，这些又是什么意思呢？这些后缀是固定字段还是可以自定义的呢？

## SemVer 规范
实际上，语义化的版本控制并不是一个创新性的想法，即便我们不知道这些，我们也在做类似的事情，但一个明确的规范将会让版本逻辑更清晰的传达给其他开发者。
所以由 Gravatars 创办者兼 GitHub 共同创办者 Tom Preston-Werner 就建立了语义化版本控制的规范， `semantic version` 简称 `semver`，于是这个规范就叫做 `SemVer` 规范  

规范地址为：https://semver.org/lang/zh-CN/

我简单讲讲其中的内容，大家也很容易理解：

## 版本号的格式

标准的版本号必须采用 `X.Y.Z` 的格式，其中 X、Y 和 Z 为<u>非负的整数</u>，且禁止在数字前方补零。 

`X->主版本号、Y->次版本号、Z->修订号`，英文对应表示为 `major`、`minor`、`patch`，每个元素必须以数值来递增。例如：1.9.1 -> 1.10.0 -> 1.11.0。

主版本号为零（0.y.z）的软件处于<u>开发初始阶段</u>，一切都可能随时被改变。

`1.0.0` 的版本号用于界定公共 API 的形成

## 版本号的递增逻辑

修订号 Z（x.y.Z | x > 0）必须在只做了向下兼容的修正时才递增。这里的修正指的是针对不正确结果而进行的内部修改。就是修改一些小的bug，不影响正常的使用

次版本号 Y（x.Y.z | x > 0）必须在有向下兼容的新功能出现时递增。在任何公共 API 的功能被标记为弃用时也必须递增。也可以在内部程序有大量新功能或改进被加入时递增，其中可以包括修订级别的改变。每当次版本号递增时，修订号必须归零。

主版本号 X（X.y.z | X > 0）必须在有任何不兼容的修改被加入公共 API 时递增。其中可以包括次版本号及修订级别的改变。每当主版本号递增时，次版本号和修订号必须归零。

### 总结
- 当有不兼容的 API 更改时，则升级主版本号
- 当以向后兼容的方式添加功能时，则升级次版本号
- 当进行向后兼容的缺陷修复时，则升级修订号

## 先行版本

先行版本号可以被标注在修订版之后，先加上一个连接号再加上一连串以句点分隔的标识符来修饰。标识符必须由 ASCII 字母数字和连接号组成，且禁止留白。数字型的标识符禁止在前方补零

举个例子：`1.0.0-alpha.6`


先行版的优先级低于相关联的标准版本，举个例子 `1.0.0-alpha < 1.0.0`

被标上先行版本号则表示这个版本并非稳定而且可能无法满足预期的兼容性需求。

其实规范内容并不多，回到开头时的第一个问题：

Q：在 0.y.z 初始开发阶段，我该如何进行版本控制？  
A：最简单的做法是以 0.1.0 作为你的初始化开发版本，并在后续的每次发行时递增次版本号。

Q：如何判断发布 1.0.0 版本的时机？  
A：当你的软件被用于正式环境，它应该已经达到了 1.0.0 版。如果你已经有个稳定的 API 被使用者依赖，也会是 1.0.0 版。如果你很担心向下兼容的问题，也应该算是 1.0.0 版了。

## alpha/beta/rc

现在我们知道，先行版本中 `-` 后的字符是自定义的，我们经常看到一些库的版本会带 `alpha`、`beta` 之类的字样，就以 Vue 为例，有 `3.0.0-alpha.13`、`3.0.0-beta.1`、`3.0.0-rc.1`，这些表示什么意思呢？

一般来说：  
`alpha` 表示内部测试版，主要给开发和测试找 bug 用，不建议用户下载。

`beta` 表示公开测试版，你可以提前尝试一些功能 rc 是 Release Candidate（候选版本）的缩写，表示该版本功能不再增加，和最终发布版功能一样，有点像预览版，然后可能再改改一些小 bug，就会到正式的版本了。
当然库也可以使用自己的版本逻辑，就比如 React，它还有 next 版和 experimental 版，具体的发布逻辑 React 官网也有写：https://react.docschina.org/docs/release-channels.html

## npm 指定版本范围

我们经常在 `package.json` 文件中看到版本号前出现 `~` `^` 等字符，比如：
```json
{
   "dependencies": {
    "react": "^1.2.3
    "vue": "~1.2.3",
    "lodash":"*"
  }
}
```

这些标识符的作用相信我们多少都知道一点，比如：

**^** 表示次版本号的更新，比如 ^1.2.3就表示以后安装的版本 >=1.2.3 <2.0.0

**~** 表示修订版本号的更新，比如 ~1.2.3就表示以后安装的版本 >=1.2.3 <1.3.0

**\*** 表示任何版本都可以 >= 0.0.0

当然具体的逻辑会更复杂一点，比如：

^只会执行不更改最左边非零数字的更新，所以：

1. ^0.2.3 相当于 >=1.2.3 <2.0.0
2. ^0.0.3相当于>=0.0.3 <0.0.4
3. ^1.2.3-beta.2 相当于 >=1.2.3-beta.2 <2.0.0，这其中 1.2.3-beta.4是可以的，但 1.2.4-beta.2就不行了

~如果指定了次版本号，则会只进行修订版本号的更新，如果没有指定，则会进行此版本号的更新，所以：

1. ~1.2.3 相当于 >=1.2.3 <1.3.0
2. ~1.2相当于 >=1.2.0 <1.3.0 (相当于 1.2.x)
3. ~1 相当于 >=1.0.0 <2.0.0 (相当于 1.x)
4. ~1.2.3-beta.2 相当于 >=1.2.3-beta.2 <1.3.0，这其中 1.2.3-beta.4是可以的，但 1.2.4-beta.2就不行了

除了 ^和 ~，NPM 提供了更多的表示范围版本的方式：
https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies

简单举几个示例：
```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "lat": "latest",
  }
}
```

这其中 latest 表示标签，在默认情况下，npm 使用 latest 标签来标识软件包的当前版本。

对应我们安装包的时候也可以参照这些指定版本安装：
```bash
npm install foo@1.2.3
npm install foo@">=0.1.0 <0.2.0"
npm install foo@latest
```

## npm version
NPM 也提供了 npm version 命令可以更新版本号，具体的语法如下：

```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

其中最主要的就是 `major`、`minor`、`patch`，比如你当下的项目的 `package.json` 的 version 为 `1.0.0`：

当你执行 `npm version major` 后，version 会变成 `2.0.0`

当你执行 `npm version minor`后，version 会变成 `1.1.0`

当你执行 `npm version patch` 后，version 会变成 `1.0.1`

`premajor`、`preminor`、`prepatch` 也是同理：

当你执行 `npm version premajor`后，version 会变成 `2.0.0-0`

当你执行 `npm version premajor`后，version 会变成 `1.1.0-0`

当你执行 `npm version prepatch`后，version 会变成  `1.0.1-0`

而当你执行 `npm version prerelease`后，version 也会变成 `1.0.1-0`

>npm version prerelease --preid=beta

prepatch 和 prerelase 的区别在于，prepatch 是增加 patch 号，先行版本号置为 0，prerelase 则是如果没有先行版本号，则跟 prepatch 一样，如果有的话，则会在先行版本号上加 1，举个例子，当你的版本号为 1.0.0-0时，
当你执行 npm version prepatch后，version 会变成  1.0.1-0而当你执行 npm version prerelease后，version 会变成 1.0.0-1

更多 npm version 命令可以参考 npm 官方文档 https://docs.npmjs.com/cli/v8/commands/npm-version

## [npm publish]
该命令可以将我们的库发布到npm 供他们下载

这里需要注意的时候，有时候我们需要发布测试包，则应该在发布的时候添加--tag name属性

```bash
npm publish --tag beta
```

添加了tag属性的包，当安装的时候，除非指定下载tag版本，否则不会下载tag版本

npm install 默认是下载 tag 为latest的最新版本，发布的时候除非特别指定tag ，否则默认tag都是latest

```bash
npm install xxxx@beta
```

我们可以使用`npm dist-tag ls` 指令来查看包的各种版本号

我们同样可以使用`npm dist-tag add pkg@x.x.x tag` 来为某个版本添加tag标识

还有一种情况，当我们的版本号后面指定了类似beta的名称，安装的时候也不会下载该版本的包
```json
{
     "version": "1.0.0-beta.1"
}
```

## 资料
[version](https://www.jianshu.com/p/3b24a8b5c926)
[npm 发版知识](https://zhuanlan.zhihu.com/p/558153905)
[npm publish那些事](https://www.cnblogs.com/momo798/p/15075312.html)