---
title: browserslist
---

前言

在说编译工具之前，先来简单的说说`browserslist`，这啥？？直译成中文就是`浏览器列表`，这样解解释大伙可能就瞬间一个大白眼了，其实`browserslist` 的作用比较单纯和简单，就是告诉它:`webpack`、`babel`,`postcss`，`ESLint`等等前端编译工具，我的资源(js,css)将在怎样的环境(浏览器，node)下运行

大伙都晓的，浏览器每次版本的升级都或多少会支持一些新的ES提案语法，前端web项目运行的环境，往往非常多，这里主要说的运行环境是浏览器，而且还有人在用IE的，有些API 或CSS 只能在较新的浏览器中运行，否则达不到预期效果。那怎么办呢，不可能为所有的运行环境都打包一份代码吧，这明显不合理，也不可行。这就需要有一种策略来统计我们目标环境的生存和使用率，我们web项目只需要能在90%以上的目标环境正常运行即可

## [browserslist](https://github.com/browserslist/browserslist)
为 `Autoprefixer`、`Babel`、`ESLint`、`PostCSS` 和 `Webpack` 等流行 JavaScript 工具共享浏览器兼容性配置，在前端项目中，不可能存在css和javascript的目标环境不一至的情况。所以可以只编写一份`browserslist`来提供给javascript 共同工具使用

## 使用

### package.json

推荐直接在package.json 中添加browserslist属性来编写目标环境，Autoprefixer、Babel、ESLint、PostCSS等都是优先读取其值，详细的书写语法可以参考 [browserslist](https://github.com/browserslist/browserslist)
```json
{
  "browserslist": [
    "last 1 version",
    "> 1%",
    "not dead"
  ]
}
```

### .browserslistrc

直接在项目根目录下新建名为`.browserslistrc` 的文件

```
# Browsers that we support

last 1 version
> 1%
IE 11 # sorry
```

## 工具

使用一些额外的工具可以辅助我们编写合理的目标环境

### [caniuse](https://caniuse.com/)

查看css和javascript在目标环境的支持率，功能非常强大，大伙可以好好研究研究

### [@mdn/browser-compat-data](https://github.com/mdn/browser-compat-data)
兼容性数据提供者

### [CanIUse Embed](https://caniuse.bitsofco.de/#how-to-use)
可以生成web api ，css兼容性图片，可用在文档中

### [browsersl.ist](https://browsersl.ist/)

可在线查看 `browserslist` 值对应的浏览器列表

### npx browserslist
运行以下命令，将根据所编写的`browserslist`值打印出所有浏览器列表

```bash
npx browserslist
// or
pnpm dlx browserslist
```

## 兼容配置参考

随便着IE的退市，对前端来说也算是一个好事吧，经历过IE的人都晓的这其中的痛苦，所以IE 10以下就都不考虑了

### PC
```json
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 10"
  ]
```

### Mobile

对于移动端如果H5页面是放到公司APP里的，则需要参考公司APP运行支持的最低系统版本(IOS/Android)

我们公司APP正常运行需 `Android>=4.4` `IOS>=8`，大伙可以借此为依据进行调整
```json
  "browserslist": [
    "iOS >= 8",
    "Android >= 4.4"
  ]
```
