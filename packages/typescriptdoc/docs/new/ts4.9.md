---
title: TypeScript 4.9
---

## 新的 satisfies 操作符

在使用 TypeScript 类型推断的时候，有很多情况下会让我们面临两难的选择：我们即希望确保某些表达式能够匹配某些类型，但也希望保留这个表达式的特定类型用来类型推断

```ts
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255]
};
```

因为每个属性都被赋予了默认值，ts 会自动帮我们自动推导 palette 的属性类型，所以我们可以直接调用它们的方法：
```ts
// red 被推断为 number[] 类型
const a = palette.red.at(0);
// green 被推断为 string 类型
const b = palette.green.toUpperCase();
```

因为颜色都是固定的，我们想让我们的 palette 对象拥有特定的几个属性，来避免我们写出一些错别字：
```ts
const palette = {
    // 错别字：rad -> red
    rad: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255]
};
```

所以我们可能会为 palette 定义一个类型，这样错别字就会被检测出来了：
```ts twoslash
// @errors: 2322
type Colors = "red" | "green" | "blue";

type RGB = [red: number, green: number, blue: number];

const palette: Record<Colors, string | RGB> = {
    rad: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255]
};
```

但是这时候我们再调用 palette.red 的方法，你会发现 TS 的类型推断会出错：
```ts
type Colors = "red" | "green" | "blue";

type RGB = [red: number, green: number, blue: number];

const palette: Record<Colors, string | RGB> = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255]
};

// 'palette.red' "could" 的类型是 string | RGB ，所以它不一定存在 at 方法
const a = palette.red.at(0);
```

这就让我们陷入了两难的境地，我们用更严格了类型约束了写出 bug 的可能性，但是却失去了类型推断的能力

`satisfies` 关键字就是用来解决这个问题的，它既能让我们验证表达式的类型是否与某个类型匹配，也可以保留基于值进行类型推断的能力：
```ts
type Colors = "red" | "green" | "blue";

type RGB = [red: number, green: number, blue: number];

const palette = {
    rad: [255, 0, 0],
    // 可以捕获到错别字 rad
    green: "#00ff00",
    blue: [0, 0, 255]
} satisfies Record<Colors, string | RGB>;

// 都可以调用
const a = palette.red.at(0);
const b = palette.green.toUpperCase();
```

## in 操作符类型收窄优化
在日常开发中，我们经常需要处理一些在运行时不完全确定的值，比如我们现在有下面两个类型：

```ts
interface Duck {
  quack(): string;
}

interface Cat {
  miao(): string;
}
```
在实际使用过程中，TS 不能确定 value 是否是上面中哪一个类型，所以会抛出错误：
```ts
function main(value: Duck | Cat) {
  if (value.quack) { // roperty 'quack' does not exist on type 'Duck | Cat'.
    return value.quack;
  }
}
```

我们可能会使用 in 这样的关键字来实现简单的类型收窄：

```ts
function main(value: Duck | Cat) {
  if ('quack' in value) { 
    return value.quack;
  }
}
```

:::tip
也可以实现一个更通用的类型守卫，可以参考这篇文章：[什么是鸭子类型](https://mp.weixin.qq.com/s/KTK5J3Lu9T02od4hvtYCWA)
:::

但是，这个写法的前提是我们用到的对象有明确的类型，如果这个对象的属性没有明确的类型呢？我们来看看下面这段 JavaScript 代码：
```js
function tryGetPackageName(context) {
    const packageJSON = context.packageJSON;
    // 检查是否是个对象
    if (packageJSON && typeof packageJSON === "object") {
        // 检查是否存在一个字符串类型的 name 属性
        if ("name" in packageJSON && typeof packageJSON.name === "string") {
            return packageJSON.name;
        }
    }

    return undefined;
}
```

把这段代码重写为规范的 TypeScript，我们只需要定义一个 Context 类型，但是由于 packageJSON 没有明确的类型定义，再使用 in 进行类型收窄就有问题了：

```ts
interface Context {
    packageJSON: unknown;
}

function tryGetPackageName(context: Context) {
    const packageJSON = context.packageJSON;
    // 检查是否是个对象
    if (packageJSON && typeof packageJSON === "object") {
        // 检查是否存在一个字符串类型的 name 属性
        if ("name" in packageJSON && typeof packageJSON.name === "string") {
        //                                              ~~~~
        // error! Property 'name' does not exist on type 'object.
            return packageJSON.name;
        //                     ~~~~
        // error! Property 'name' does not exist on type 'object.
        }
    }

    return undefined;
}
```

这是因为 in 操作符只会严格收窄到实际定义被检查属性的类型，所以 packageJSON 的类型从 unknown 收窄到了 object ，而  object 类型上不存在 name 属性，就会引发报错。

TypeScript 4.9 优化了这个问题，in 操作符更加强大了，它会被收窄为被检查类型和 Record<"property-key-being-checked", unknown> 的交叉类型

比如在上面的例子中，packageJSON 的类型会被收窄为 object & Record<"name",unknown>，这样我们直接访问 packageJSON.name 就没问题了！

```ts
interface Context {
    packageJSON: unknown;
}

function tryGetPackageName(context: Context): string | undefined {
    const packageJSON = context.packageJSON;
    // 检查是否是个对象
    if (packageJSON && typeof packageJSON === "object") {
        // 检查是否存在一个字符串类型的 name 属性
        if ("name" in packageJSON && typeof packageJSON.name === "string") {
            // 可以正常运行！
            return packageJSON.name;
        }
    }

    return undefined;
}
```

:::tip
TypeScript 4.9 还加强了一些关于如何使用 in 操作符的检查，比如左侧要检查的属性必须是 string | number | symbol 类型，而右侧类型必须要可分配给 object
:::

## accessor 关键字支持
[accessor 是 ECMAScript](https://github.com/tc39/proposals/blob/main/finished-proposals.md) 中即将推出的一个类关键字，TypeScript 4.9 对它提供了支持：

```ts
class Person {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

accessor 关键字可以为该属性在运行时转换为一对 get 和 set 访问私有支持字段的访问器：
```ts
class Person {
    #__name: string;

    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = name;
    }

    constructor(name: string) {
        this.name = name;
    }
}
```

## NaN 相等判断警告
NaN 是一个特殊的数值，代表 “非数字” ，在 JS 中它和任何值相比较都是 false，包括它自己：

```js
console.log(NaN == 0)  // false
console.log(NaN === 0) // false

console.log(NaN == NaN)  // false
console.log(NaN === NaN) // false
```

相对应的，所有值都不等于 NaN：

```js
console.log(NaN != 0)  // true
console.log(NaN !== 0) // true

console.log(NaN != NaN)  // true
console.log(NaN !== NaN) // true
```

这其实并不是 JavaScript 特有的问题，因为任何包含 IEEE-754 浮点数的语言都有相同的行为；但 JavaScript 的主要数字类型就是浮点数，并且 JavaScript 中的数字解析为 NaN 还挺常见的，所以在代码中去比较值是否等于 NaN 的情况还挺普遍的。但是正确的做法应该是使用 Number.isNaN 函数来判断。假如你不知道这个问题，就可能引发一些 bug

在 TypeScript 4.9 中，如果你直接用一些值和 NaN 相比较，会抛出错误并提示你使用 Number.isNaN：
```ts
function validate(someValue: number) {
    return someValue !== NaN;
    //     ~~~~~~~~~~~~~~~~~
    // error: This condition will always return 'true'.
    //        Did you mean '!Number.isNaN(someValue)'?
}
```

## 包含 .ts 后缀的导入路径支持
:::tip
此特性并没有包含在 4.9 beta 中，而是被作为一个 4.9 整体的工作项，这里属于提前介绍
:::

TypeScript 中使用 moduleResolution 配置项来进行导入模块的路径解析，其常用的配置值 'node' 会保持与 NodeJs 相同的解析策略，如对相对路径 ./foo 的解析，会首先尝试解析 `<root>/<project>/src/foo.ts` 与 `<root>/<project>/src/foo.d.ts`，也即是说导入路径无需携带后缀名 .ts

而在 4.9 版本中，通过 --noImplicitSuffix 选项（具体的选项配置还未最终确定）来修改了这一行为，在启用此选项时，导入路径必须显式携带 .ts 后缀才能正常解析，而不是依赖 moduleResolution

这一行为同样有助于对齐 deno 中的导入方式，如：
```js
import { writableStreamFromWriter } from "https://deno.land/std@0.156.0/streams/mod.ts";
```

## 单文件级别配置
:::tip
此特性并没有包含在 4.9 beta 中，而是被作为一个 4.9 整体的工作项，这里属于提前介绍
:::

TypeScript 支持通过 @ts-nocheck 与 @ts-check 指令来更改单个文件内的检查策略，如在关闭 checkJs 的情况下使用 @ts-check 来启用对少数几个 JS 文件的检查，或者在开启的情况下使用 @ts-nocheck 禁用对某些 JS 文件的检查。但这两个指令仅仅能影响是否检查，而无法影响检查的具体配置。
因此，4.9 beta 版本引入了单文件级别的 tsconfig 配置，使用 @ts-config value 的形式，如以下示例：
```
// @ts-strict 
// @ts-noUnusedLocals
// @ts-strictNullChecks
// @ts-noPropertyAccessFromIndexSignature false
```

## Promise.resolve 的类型更新
TypeScript 在 4.5 版本引入了新的工具类型 Awaited ，用于提取一个 Promise resolve 之后的类型：
```ts
type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & {
      then(onfulfilled: infer F): any;
    }
  ? F extends (value: infer V, ...args: any) => any
    ? Awaited<V>
    : never
  : T;
```
在 4.5 版本引入此类型时，TS 已经替换了一批相关方法的类型签名，如 Promise.all 等方法，而在 4.9 版本中，则对 Promise.resolve 的类型签名也进行了替换：
```ts
interface PromiseConstructor {
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

// 更新为
interface PromiseConstructor {
  resolve<T>(value: T): Promise<Awaited<T>>;
  resolve<T>(value: T | PromiseLike<T>): Promise<Awaited<T>>;
}
```
这样改造后， Promise.resolve 将尽可能返回一个 resolve 后的 Promise 类型值

## 完全保留 JavaScript 文件中的导入
TypeScript 在编译过程中会进行类型检查与语法降级的工作，而在类型检查中，假设当前正在处理的已经是 JavaScript 文件，此时一旦 TS 检测到了一个仅作为类型使用的导入，就会将这个导入从 JavaScript 文件中移除：
```ts
import { someValue, SomeClass } from "some-module";

/** @type {SomeClass} */
let val = someValue;
```

这里 SomeClass 仅被作为 JSDoc 的类型标注使用，因此是可以直接从导入语句中被移除的。但这么做可能导致的问题是如果 JSDoc 类型标注不完全准确，就会导致这一擦除行为也表现异常。

因此，现在 JavaScript 文件中的导入语句将会被完全保留

## exports优先级高于typesVersions
以前，在解析一个包时，TypeScript错误地将typesVersions字段优先于exports字段
```diff
  {
      "type": "module",
      "main": "./dist/main.js"
      "typesVersions": {
          "<4.8": { ".": ["4.8-types/main.d.ts"] },
          "*": { ".": ["modern-types/main.d.ts"] }
      },
      "exports": {
          ".": {
+             "types@<4.8": "4.8-types/main.d.ts",
+             "types": "modern-types/main.d.ts",
              "import": "./dist/main.js"
          }
      }
  }
```
### typesVersions
- [typesVersions 英文](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection-with-typesversions)
- [typesVersions 中文](https://www.tslang.cn/docs/release-notes/typescript-3.1.html)

## 源文
[4.9](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-beta/#better-types-for-promise-resolve)