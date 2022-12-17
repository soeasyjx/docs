---
title: Plugin和Preset
---

## 前言

觉得有必要单独把`Plugin`和`Preset`拿出来讲一讲，说实话刚接触 babel 的时候会让人分不清，到底是用哪个，到底哪个在起转换作用

## plugin 和 Preset

首先我们来说说`Plugin`和`Preset`的区别和联系

所谓`Preset`就是一些`Plugin`组成的合集,你可以将`Preset`理解称为就是一些的`Plugin`整合称为的一个包

### 常见 Preset

Preset 的执行顺序是逆序

```json
{
  "presets": ["a", "b", "c"]
}
```

将按如下顺序执行： c、b 然后是 a

三个最常用的 Preset

#### [babel-preset-env](https://www.babeljs.cn/docs/babel-preset-env#install)

- @babel/preset-env 是一个智能预设，它可以将我们的高版本 JavaScript 代码进行转译根据内置的规则转译成为低版本的 javascript 代码。
- preset-env 内部集成了绝大多数 plugin（State > 3）的转译插件，它会根据对应的参数进行代码转译。
- @babel/preset-env 不会包含任何低于 Stage 3 的 JavaScript 语法提案。如果需要兼容低于 Stage 3 阶段的语法则需要额外引入对应的 Plugin 进行兼容。
- 需要额外注意的是 babel-preset-env 仅仅针对语法阶段的转译，比如转译箭头函数，const/let 语法。针对一些 Api 或者 ES6 内置模块的 polyfill，preset-env 是无法进行转译的。这块内容我们会在之后的 polyfill 中为大家进行详细讲解。

#### [babel-preset-react](https://www.babeljs.cn/docs/babel-preset-react)

通常我们在使用 React 中的 jsx 时，相信大家都明白实质上 jsx 最终会被编译称为 React.createElement()方法。

babel-preset-react 这个预设起到的就是将 jsx 进行转译的作用。

```jsx
const MyComponent = () => {
  return <div>1</div>;
};
// 经过 babel 编译后

import { jsx as _jsx } from "react/jsx-runtime";

const MyComponent = () => {
  return /*#__PURE__*/ _jsx("div", {
    children: "1"
  });
};
```

:::tip
/_#**PURE**_/ 经常会在被编译后的代码中看到这标识，这其实是一个纯函数的标识，说明该函数是一个没有副作用的函数，当没有使用的时候，告诉编译工具可以直接删除，对于[纯函数](https://www.cnblogs.com/wqldbk/p/16000973.html)大伙可自己脑补
:::

#### babel-preset-typescript

对于 TypeScript 代码，我们有两种方式去编译 TypeScript 代码成为 JavaScript 代码。

1. 使用 tsc 命令，结合 cli 命令行参数方式或者 tsconfig 配置文件进行编译 ts 代码。
2. 使用 babel，通过 babel-preset-typescript 代码进行编译 ts 代码。

:::tip
如果使用前端工程中使用了`webpack`编译，则可以直接使用[ts-loader](https://www.npmjs.com/package/ts-loader)来进行 TS 的转换
:::

### 常见 Plugin

plugin 的优先级高于 preset，plugin 从前到后执行

```json
{
  "plugins": ["a", "b", "c"]
}
```

将按如下顺序执行： a、b 然后是 c

babel 官网列举出了一份非常详尽的[Plugin List](https://www.babeljs.cn/docs/plugins-list)。

关于常见的 Plugin 其实大多数都集成在了 babel-preset-env 中，当你发现你的项目中并不能支持最新的 js 语法时，此时我们可以查阅对应的 Babel Plugin List 找到对应的语法插件添加进入 babel 配置。

同时还有一些不常用的 packages，比如@babel/register：它会改写 require 命令，为它加上一个钩子。此后，每当使用 require 加载.js、.jsx、.es 和.es6 后缀名的文件，就会先用 Babel 进行转码。

这些包日常中不是特别常用，如果有同学有相关编译相关需求完全可以去 babel 官网查阅。如果官网不存在现成的 plugin/package，别担心！我们同时也会在之后手把手教大家 babel 插件的开发。  
其中最常见的@babel/plugin-transform-runtime 我们会在下面的 Polyfill 进行详细的讲解。

## 前端 Babel 配置

接下里我们聊聊前端项目构建中相关的 babel 相关配置。

关于前端构建工具，无路你使用的是 webapack 还是 rollup 又或是任何构建打包工具，内部都离不开 Babel 相关配置。

这里我们使用业务中最常用的 webpack 举例，其他构建工具在使用方面只是引入的包不同，Babel 配置原理是相通的。

关于 WebPack 中我们日常使用的 babel 相关配置主要涉及以下三个相关插件:

1. babel-loader
2. babel-core
3. babel-preset-env

也许你经常在项目搭建过程中见到他们，这里我们将逐步使用一段伪代码来讲解他们之间的区别和联系。  
首先我们需要清楚在 webpack 中 loader 的本质就是一个函数，接受我们的源代码作为入参同时返回新的内容。

### [babel-loader](https://www.npmjs.com/package/babel-loader)

babel-loader 的本质就是一个函数，我们匹配到对应的 jsx?/tsx?的文件交给 babel-loader:

```js
/**
 *
 * @param sourceCode 源代码内容
 * @param options babel-loader相关参数
 * @returns 处理后的代码
 */
function babelLoader(sourceCode, options) {
  // ..
  return targetCode;
}
```

:::tip
关于 options，babel-loader 支持直接通过 loader 的参数形式注入，同时也在 loader 函数内部通过读取.babelrc、babel.config.js、babel.config.json 等文件注入配置。
:::

### babel-core

我们讲到了 babel-loader 仅仅是识别匹配文件和接受对应参数的函数，那么 babel 在编译代码过程中核心的库就是@babel/core 这个库。

babel-core 是 babel 最核心的一个编译库，他可以将我们的代码进行词法分析--语法分析--语义分析过程从而生成 AST 抽象语法树，从而对于“这棵树”的操作之后再通过编译称为新的代码。

babel-core 其实相当于@babel/parse 和@babel/generator 这两个包的合体，接触过 js 编译的同学可能有了解 esprima 和 escodegen 这两个库，你可以将 babel-core 的作用理解称为这两个库的合体。

babel-core 通过 transform 方法将我们的代码进行编译。

关于 babel-core 中的编译方法其实有很多种，比如直接接受字符串形式的 transform 方法或者接受 js 文件路径的 transformFile 方法进行文件整体编译。

接下来让我们完善对应的 babel-loader 函数:

```js
const core = require("@babel/core");

/**
 *
 * @param sourceCode 源代码内容
 * @param options babel-loader相关参数
 * @returns 处理后的代码
 */
function babelLoader(sourceCode, options) {
  // 通过transform方法编译传入的源代码
  core.transform(sourceCode);
  return targetCode;
}
```

这里我们在 babel-loader 中调用了 babel-core 这个库进行了代码的编译作用。

### babel-preset-env

上边我们说到 babel-loader 本质是一个函数，它在内部通过 babel/core 这个核心包进行 JavaScript 代码的转译。

但是针对代码的转译我们需要告诉 babel 以什么样的规则进行转化，比如我需要告诉 babel：“嘿，babel。将我的这段代码转化称为 EcmaScript 5 版本的内容！”。

此时 babel-preset-env 在这里充当的就是这个作用：告诉 babel 我需要以为什么样的规则进行代码转移。

```js
const core = require('@babel/core');

/**
 *
 * @param sourceCode 源代码内容
 * @param options babel-loader相关参数
 * @returns 处理后的代码
 */
function babelLoader(sourceCode, options) {
  // 通过transform方法编译传入的源代码
  core.transform(sourceCode, {
    presets: ['babel-preset-env'],
    plugins: [...]
  });
  return targetCode;
}
```

这里 plugin 和 prest 其实是同一个东西，所以我将 plugin 直接放在代码中了。同理一些其他的 preset 或者 plugin 也是发挥这样的作用。

## Babel 相关 polyfill 内容

**何谓 polyfill**

关于 polyfill，我们先来解释下何谓 polyfill。  
首先我们来理清楚这三个概念:

- 最新 ES 语法，比如：箭头函数，let/const。
- 最新 ES Api，比如 Promise
- 最新 ES 实例/静态方法，比如 String.prototype.include

babel-prest-env 仅仅只会转化最新的 es 语法，并不会转化对应的 Api 和实例方法,比如说 ES 6 中的 Array.from 静态方法。babel 是不会转译这个方法的，如果想在低版本浏览器中识别并且运行 Array.from 方法达到我们的预期就需要额外引入 polyfill 进行在 Array 上添加实现这个方法。

其实可以稍微简单总结一下，语法层面的转化 preset-env 完全可以胜任。但是一些内置方法模块，仅仅通过 preset-env 的语法转化是无法进行识别转化的，所以就需要一系列类似”垫片“的工具进行补充实现这部分内容的低版本代码实现。这就是所谓的 polyfill 的作用，

针对于 polyfill 方法的内容，babel 中涉及两个方面来解决：

- @babel/polyfill
- @babel/runtime
- @babel/plugin-transform-runtime

我们理清了何谓 polyfill 以及 polyfill 的作用和含义后，让我们来逐个击破这两个 babel 包对应的使用方式和区别吧。

### @babel/polyfill

首先我们来看看第一种实现 polyfill 的方式：

#### @babel/polyfill 介绍

通过 babelPolyfill 通过往全局对象上添加属性以及直接修改内置对象的 Prototype 上添加方法实现 polyfill。
比如说我们需要支持 String.prototype.include，在引入 babelPolyfill 这个包之后，它会在全局 String 的原型对象上添加 include 方法从而支持我们的 Js Api。

我们说到这种方式本质上是往全局对象/内置对象上挂载属性，所以这种方式难免会造成全局污染。

#### 应用@babel/polyfill

在 babel-preset-env 中存在一个 useBuiltIns 参数，这个参数决定了如何在 preset-env 中使用@babel/polyfill。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": false
      }
    ]
  ]
}
```

**useBuiltIns**:"usage"| "entry"| false

#### false

当我们使用 preset-env 传入 useBuiltIns 参数时候，默认为 false。它表示仅仅会转化最新的 ES 语法，并不会转化任何 Api 和方法。

#### entry

当传入 entry 时，需要我们在项目入口文件中手动引入一次 core-js，它会根据我们配置的浏览器兼容性列表(browserList)然后全量引入不兼容的 polyfill。

```js {1}
import "core-js";

class PayError extends Error {
  get name() {
    return "PayError";
  }
}

const payError = new PayError();
```

:::caution
在 Babel7.4.0 之后，@babel/polyfill 被废弃它变成另外两个包的集成。"core-js/stable"; "regenerator-runtime/runtime";。[你可以在这里看到变化](https://www.babeljs.cn/docs/babel-polyfill)，但是他们的使用方式是一致的，只是在入口文件中引入的包不同了。

```js {1}
import "core-js/stable";
class PayError extends Error {
  get name() {
    return "PayError";
  }
}

const payError = new PayError();
```

:::

同时需要注意的是，在我们使用 useBuiltIns:entry/usage 时，需要额外指定 core-js 这个参数。默认为使用 core-js 2.0，所谓的 core-js 就是我们上文讲到的“垫片”的实现。它会实现一系列内置方法或者 Promise 等 Api。

core-js 2.0 版本是跟随 preset-env 一起安装的，不需要单独安装哦～

#### usage

上边我们说到配置为 entry 时，perset-env 会基于我们的浏览器兼容列表进行全量引入 polyfill。所谓的全量引入比如说我们代码中仅仅使用了 Array.from 这个方法。但是 polyfill 并不仅仅会引入 Array.from，同时也会引入 Promise、Array.prototype.include 等其他并未使用到的方法。这就会造成包中引入的体积太大了。

此时就引入出了我们的 useBuintIns:usage 配置

当我们配置 useBuintIns:usage 时，会根据配置的浏览器兼容，以及代码中 使用到的 Api 进行引入 polyfill 按需添加。

当使用 usage 时，我们不需要额外在项目入口中引入 polyfill 了，它会根据我们项目中使用到的进行按需引入。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "core-js": 3
      }
    ]
  ]
}
```

关于 usage 和 entry 存在一个需要注意的本质上的区别。  
我们以项目中引入 Promise 为例。  
当我们配置 useBuintInts:entry 时，仅仅会在入口文件全量引入一次 polyfill。你可以这样理解:

```js
// 当使用entry配置时
...
// 一系列实现polyfill的方法
global.Promise = promise

// 其他文件使用时
const a = new Promise()
```

而当我们使用 useBuintIns:usage 时，preset-env 只能基于各个模块去分析它们使用到的 polyfill 从而进行引入。  
preset-env 会帮助我们智能化的在需要的地方引入，比如:

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
<TabItem value="ajs" label="a.js">

```js
import "core-js/modules/es.promise";
...
```

</TabItem>
<TabItem value="bjs" label="b.js">

```js
import "core-js/modules/es.promise";
...
```

</TabItem>
</Tabs>

在 usage 情况下，如果我们存在很多个模块，那么无疑会多出很多冗余代码(import 语法)  
同样在使用 usage 时因为是模块内部局部引入 polyfill 所以按需在模块内进行引入，而 entry 则会在代码入口中一次性引入  
usageBuintIns 不同参数分别有不同场景的适应度，具体参数使用场景还需要大家结合自己的项目实际情况找到最佳方式

### @babel/runtime

上边我们讲到@babel/polyfill 是存在污染全局变量的副作用，在实现 polyfill 时 Babel 还提供了另外一种方式去让我们实现这功能，那就是@babel/runtime。

简单来讲，@babel/runtime 更像是一种按需加载的解决方案，比如哪里需要使用到 Promise，@babel/runtime 就会在他的文件顶部添加
<code>import promise from 'babel-runtime/core-js/promise'</code>

同时上边我们讲到对于 preset-env 的 useBuintIns 配置项，我们的 polyfill 是 preset-env 帮我们智能引入

而 babel-runtime 则会将引入方式由智能完全交由我们自己，我们需要什么自己引入什么

它的用法很简单，只要我们去安装`npm install --save @babel/runtime`后，在需要使用对应的 polyfill 的地方去单独引入就可以了。比如：

```js title=a.js
// a.js 中需要使用Promise 我们需要手动引入对应的运行时polyfill

import Promise from "babel-runtime/core-js/promise";

const promsies = new Promise();
```

总而言之，babel/runtime 你可以理解称为就是一个运行时“哪里需要引哪里”的工具库。
针对 babel/runtime 绝大多数情况下我们都会配合@babel/plugin-transfrom-runtime 进行使用达到智能化 runtime 的 polyfill 引入

### @babel/plugin-transform-runtime

babel-runtime 存在的问题  
babel-runtime 在我们手动引入一些 polyfill 的时候，它会给我们的代码中注入一些类似\_extend()， classCallCheck()之类的工具函数，这些工具函数的代码会包含在编译后的每个文件中，比如：

```js
class Circle {}
// babel-runtime 编译Class需要借助_classCallCheck这个工具函数
function _classCallCheck(instance, Constructor) { //... }
var Circle = function Circle() { _classCallCheck(this, Circle); };
```

如果我们项目中存在多个文件使用了 class，那么无疑在每个文件中注入这样一段冗余重复的工具函数将是一种灾难。  
所以针对上述提到的两个问题:

- babel-runtime 无法做到智能化分析，需要我们手动引入
- babel-runtime 编译过程中会重复生成冗余代码

我们就要引入我们的主角@babel/plugin-transform-runtime

@babel/plugin-transform-runtime 作用:  
@babel/plugin-transform-runtime 插件的作用恰恰就是为了解决上述我们提到的 run-time 存在的问题而提出的插件，babel-runtime 无法做到智能化分析，需要我们手动引入

@babel/plugin-transform-runtime 插件会智能化的分析我们的项目中所使用到需要转译的 js 代码，从而实现模块化从 babel-runtime 中引入所需的 polyfill 实现，babel-runtime 编译过程中会重复生成冗余代码

@babel/plugin-transform-runtime 插件提供了一个 helpers 参数。[具体你可以在这里查阅它的所有配置参数](https://www.babeljs.cn/docs/babel-plugin-transform-runtime#options)。
这个 helpers 参数开启后可以将上边提到编译阶段重复的工具函数，比如 classCallCheck, extends 等代码转化称为 require 语句。此时，这些工具函数就不会重复的出现在使用中的模块中了。比如这样：

```js
// @babel/plugin-transform-runtime会将工具函数转化为require语句进行引入

// 而非runtime那样直接将工具模块代码注入到模块中
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

#### 配置@babel/plugin-transform-runtime

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "version": "7.0.0-beta.0"
      }
    ]
  ]
}
```

### 总结polyfill
在babel中实现polyfill主要有两种方式：
1. 通过@babel/polyfill配合preset-env去使用，这种方式可能会存在污染全局作用域
2. 通过@babel/runtime配合@babel/plugin-transform-runtime去使用，这种方式并不会污染作用域

全局引入会污染全局作用域，但是相对于局部引入来说。它会增加很多额外的引入语句，增加包体积

在useBuintIns:usage情况下其实和@babel/plugin-transform-runtime情况下是类似的作用

接下去我们会通过几篇小示例结合代码来为小伙伴们一一讲解babel的基本用法和一些常用属性的设置

