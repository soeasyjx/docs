---
title: 类型推论
---

如果没有明确的指定类型，那么 TypeScript 会依照类型推论[（Type Inference）](https://www.typescriptlang.org/docs/handbook/type-inference.html)的规则推断出一个类型

## 什么是类型推论
以下代码虽然没有指定类型，但是会在编译的时候报错：
```ts twoslash
// @errors: 2322
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

事实上，它等价于：
```ts twoslash
// @errors: 2322
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
```

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论，一般会根据所赋值的类型来做推断
```ts twoslash
let x = 3;
//  ^?
```

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
```ts twoslash
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

## 参考
[类型推断](https://www.typescriptlang.org/docs/handbook/type-inference.html)