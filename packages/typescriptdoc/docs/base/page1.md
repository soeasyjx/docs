---
title: 原始数据类型
---
JavaScript 的类型分为两种：原始数据类型[（Primitive data types）](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)和引用类型（Object types）

原始数据类型包括：`boolean`、`number`、`string`、`null`、`undefined` 以及 ES6 中的新类型 [`Symbol`](https://es6.ruanyifeng.com/#docs/symbol) 和 ES10 中的新类型 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

本节主要介绍前五种原始数据类型在 TypeScript 中的应用

## 布尔值
布尔值是最基础的数据类型，在 TypeScript 中，使用 boolean 定义布尔值类型：
```ts twoslash
let isDone: boolean = false;
```

注意，使用构造函数 Boolean 创造的对象不是布尔值：
```ts twoslash
//@errors: 2322
let createdByNewBoolean: boolean = new Boolean(1);
```

事实上 `new Boolean()` 返回的是一个 Boolean 对象
```ts twoslash
let createdByNewBoolean: Boolean = new Boolean(1)
```

直接调用 `Boolean` 也可以返回一个 boolean 类型：
```ts twoslash
let createdByBoolean: boolean = Boolean(1);
```

在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样，不再赘述。

## 数值
使用 `number` 定义数值类型：
```ts twoslash
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```
编译结果：
```js
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
```

其中 0b1010 和 0o744 是 ES6 中的[二进制和八进制表示法](https://es6.ruanyifeng.com/#docs/number#%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%92%8C%E5%85%AB%E8%BF%9B%E5%88%B6%E8%A1%A8%E7%A4%BA%E6%B3%95)，它们会被编译为十进制数字。

## 字符串
使用 `string` 定义字符串类型：
```ts twoslash
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

编译结果：
```js
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
```

其中 ` 用来定义 ES6 中的[模板字符串](https://es6.ruanyifeng.com/#docs/string#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2)，${expr} 用来在模板字符串中嵌入表达式

## 空值
JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
```ts twoslash
// ---cut---
function alertName(): void {
//        ^?
    alert('My name is Tom');
}
```

声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null（只在 --strictNullChecks 未指定时）：
```ts twoslash
let unusable1: void = undefined;
// @errors: 2451 2322
let num: void = 1;
```

## Null 和 Undefined
在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型：
```ts twoslash
let u: undefined = undefined;
let n: null = null;
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量，但是有一个前提是，[strictNullChecks必须关闭](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)

### strictNullChecks:false

```ts twoslash
// @strict: false
let num: number = undefined;
let u: undefined;
let num2: number = u;
```
### strictNullChecks:true
```ts twoslash
// @errors: 2451 2322
let num: number = undefined;
let u: undefined;
let num2: number = u;
```

有关strictNullChecksis请参考资料 ：[strictNullChecksis](https://www.typescriptlang.org/tsconfig/#strictNullChecks)

## 参考
- [Basic Types（中文版）](https://www.typescriptlang.org/zh/docs/handbook/2/everyday-types.html)
- [Primitive data types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
- [[ES6 中的新类型 Symbol][]](https://es6.ruanyifeng.com/#docs/symbol)
- [ES6 中的二进制和八进制表示法](https://es6.ruanyifeng.com/#docs/number#%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%92%8C%E5%85%AB%E8%BF%9B%E5%88%B6%E8%A1%A8%E7%A4%BA%E6%B3%95)
- [ES6 中的模板字符串](https://es6.ruanyifeng.com/#docs/string#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2)