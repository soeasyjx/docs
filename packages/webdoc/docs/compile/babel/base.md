---
title: 介绍
description: babel
---

import Thumbnail from "@site/src/components/Thumbnail";

## Babel 是什么？

`Babel`其实是一个`javascript`编译器，用来编译啥的呢？将我们使用 ES6+(ECMAScript 2015)，TS，JSX 等其它新特性编写的 javascript 代码编译成可以在当前或较旧的浏览器中运行的脚本，当然也可以编译成我们指定环境的版本，而且还可以添加`Polyfill`，其次 babel 是运行在`Node`环境中的，也就是它是编译时的代码

让我们来看一个简单的演示

```js
// Babel Input: ES2015 arrow function
[1, 2, 3].map((n) => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function (n) {
  return n + 1;
});
```

## 运行时/编译时

- 编译时指的是代码在编译的时候做的事情，这个阶段的环境一般是 node 环境，可以使用 fs，path 等功能。但是同时因为没有使用 webpack ，所以 jsx，引入图片等非 node 的能力是无法使用的。
- 运行时是指代码已经编译完成开始运行的阶段，这个阶段一般是浏览器环境，不能使用 fs，path 等功能，访问 url 也会有跨域的问题，但是这个环境被 webpack 编译过，所以可以写 jsx，导入图片等功能。

babel 是编译时参与构建的工具，这点非常重要，虽说大伙都知道

## 原理

`Babel`内部原理是将 `JS` 代码转换为 `AST`，对 `AST` 应用各种插件进行处理，最终输出编译后的 `JS` 代码。

[在线查看](https://www.babeljs.cn/repl#?browsers=defaults&build=&builtIns=usage&corejs=3.21&spec=false&loose=false&code_lz=MYewdgzgLgBGCGBbApkA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=script&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=true&targets=&version=7.18.13&externalPlugins=&assumptions=%7B%7D)

### 编辑流程

先上图
<Thumbnail
  src="/myimage/compile/babel2.png"
  alt="Choose either AWS or GCP"
  width="556px"
/>

从上图可知，Babel 的编译过程主要可以分为三个阶段：

1. 解析（Parse）：包括词法分析和语法分析。词法分析主要把字符流源代码（Char Stream）转换成令牌流（ Token Stream），语法分析主要是将令牌流转换成抽象语法树（Abstract Syntax Tree，AST）。
2. 转换（Transform）：通过 Babel 的插件能力，将高版本语法的 AST 转换成支持低版本语法的 AST。当然在此过程中也可以对 AST 的 Node 节点进行优化操作，比如添加、更新以及移除节点等。
3. 生成（Generate）：将 AST 转换成字符串形式的低版本代码，同时也能创建 Source Map 映射。

关于`AST`可参考以下资料自动进行脑补[在线工具](https://astexplorer.net/)

1. [AST 系列(一): 抽象语法树为什么抽象](https://zhuanlan.zhihu.com/p/102385477)
2. [AST 抽象语法树](https://blog.csdn.net/w_l_l/article/details/84637686)
3. [AST (Abstract Syntax Tree)](https://medium.com/@dinis.cruz/ast-abstract-syntax-tree-538aa146c53b)

## 解析（Parser）

Babel 的解析过程（源码到 AST 的转换）可以使用 [@babel/parser](https://babel.dev/docs/en/babel-parser)，它的主要特点如下：

- 支持解析最新的 ES2020
- 支持解析 JSX、Flow & TypeScript
- 支持解析实验性的语法提案（支持任何 Stage 0 的 PRS）
- @babel/parser 主要是基于输入的字符串流（源代码）进行解析，最后转换成规范（基于 ESTree 进行调整）的 AST，如下所示：

```js
import { parse } from '@babel/parser';
const source = `let a: string = 1;`;

enum ParseSourceTypeEnum {
  Module = 'module',
  Script = 'script',
  Unambiguous = 'unambiguous',
}

enum ParsePluginEnum {
  Flow = 'flow',
  FlowComments = 'flowComments',
  TypeScript = 'typescript',
  Jsx = 'jsx',
  V8intrinsic = 'v8intrinsic',
}

// 解析（Parser）阶段
const ast = parse(source, {
  // 严格模式下解析并且允许模块定义
  sourceType: ParseSourceTypeEnum.Module,
  // 支持解析 TypeScript 语法（注意，这里只是支持解析，并不是转换 TypeScript）
  plugins: [ParsePluginEnum.TypeScript],
});
```

需要注意，在 Parser 阶段主要是进行词法和语法分析，如果词法或者语法分析错误，那么会在该阶段被检测出来。如果检测正确，则可以进入语法的转换阶段。

## 转换（Transform）

Babel 的转换过程（AST 到 AST 的转换）主要使用 [@babel/traverse](https://babel.dev/docs/en/babel-traverse)，该库包可以通过访问者模式自动遍历并访问 AST 树的每一个 Node 节点信息，从而实现节点的替换、移除和添加操作，如下所示：

```js
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

enum ParseSourceTypeEnum {
  Module = 'module',
  Script = 'script',
  Unambiguous = 'unambiguous',
}

enum ParsePluginEnum {
  Flow = 'flow',
  FlowComments = 'flowComments',
  TypeScript = 'typescript',
  Jsx = 'jsx',
  V8intrinsic = 'v8intrinsic',
}

const source = `let a: string = 1;`;

// 解析（Parser）阶段
const ast = parse(source, {
  // 严格模式下解析并且允许模块定义
  sourceType: ParseSourceTypeEnum.Module,
  // 支持解析 TypeScript 语法（注意，这里只是可以解析，并不是转换 TypeScript）
  plugins: [ParsePluginEnum.TypeScript],
});

// 转换（Transform) 阶段
traverse(ast, {
  // 访问变量声明标识符
  VariableDeclaration(path) {
    // 将 const 和 let 转换为 var
    path.node.kind = 'var';
  },
  // 访问 TypeScript 类型声明标识符
  TSTypeAnnotation(path) {
    // 移除 TypeScript 的声明类型
    path.remove();
  },
});
```

关于 Babel 中的访问器 API，这里不再过多说明，如果想了解更多信息，可以查看 [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)。除此之外，你可能已经注意到这里的转换逻辑其实可以理解为实现一个简单的 Babel 插件，只是没有封装成 Npm 包。当然，在真正的插件开发开发中，还可以配合 [@babel/types](https://babeljs.io/docs/en/babel-types) 工具包进行节点信息的判断处理。

## 生成（Generate）

Babel 的代码生成过程（AST 到目标代码的转换）主要使用 [@babel/generator](https://babel.dev/docs/en/babel-generator)，如下所示：

```js
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

enum ParseSourceTypeEnum {
  Module = 'module',
  Script = 'script',
  Unambiguous = 'unambiguous',
}

enum ParsePluginEnum {
  Flow = 'flow',
  FlowComments = 'flowComments',
  TypeScript = 'typescript',
  Jsx = 'jsx',
  V8intrinsic = 'v8intrinsic',
}
const source = `let a: string = 1;`;

// 解析（Parser）阶段
const ast = parse(source, {
  // 严格模式下解析并且允许模块定义
  sourceType: ParseSourceTypeEnum.Module,
  // 支持解析 TypeScript 语法（注意，这里只是可以解析，并不是转换 TypeScript）
  plugins: [ParsePluginEnum.TypeScript],
});

// 转换（Transform) 阶段
traverse(ast, {
  // 访问词法规则
  VariableDeclaration(path) {
    path.node.kind = 'var';
  },

  // 访问词法规则
  TSTypeAnnotation(path) {
    // 移除 TypeScript 的声明类型
    path.remove();
  },
});

// 生成（Generate）阶段
const { code } = generate(ast);
// code:  var a = 1;
console.log('code: ', code);
```

如果你想了解上述输入源对应的 AST 数据或者尝试自己编译，可以使用工具 [AST Explorer](https://astexplorer.net/) （也可以使用 Babel 官网自带的 [Try It Out](https://babeljs.io/repl) ），具体如下所示：

<Thumbnail
  src="/myimage/compile/babel3.png"
  alt="Choose either AWS or GCP"
  width="556px"
/>

:::tip
上述第三个框是以插件的 API 形式进行调用，如果想了解 Babel 的插件开发，可以查看 [Babel 插件手册 / 编写你的第一个 Babel 插件](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-writing-your-first-babel-plugin)。
:::

## babel核心包
### [@babel/core](https://babel.dev/docs/en/babel-core)
Babel 转码的核心包,包括了整个 babel 工作流（已集成@babel/types）

### [@babel/parser](https://babel.dev/docs/en/babel-parser)
解析器，将代码解析为 AST

### [@babel/traverse](https://babel.dev/docs/en/babel-traverse)
遍历/修改 AST 的工具

### [@babel/generator](https://babel.dev/docs/en/babel-generator)
生成器，将 AST 还原成代码

### [@babel/types](https://babel.dev/docs/en/babel-types)
包含手动构建 AST 和检查 AST 节点类型的方法

### [@babel/template](https://babel.dev/docs/en/babel-template)
可将字符串代码片段转换为 AST 节点

## 参考

[babel hooks](https://github.com/jamiebuilds/babel-handbook)