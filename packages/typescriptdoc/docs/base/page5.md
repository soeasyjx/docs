---
title: 接口
---

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型

## 什么是接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述

## 简单的例子

```ts twoslash
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 25
};
```

上面的例子中，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致

接口一般首字母大写。[**有的编程语言中会建议接口的名称加上 I 前缀**](<https://learn.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/8bc1fexb(v=vs.71)?redirectedfrom=MSDN>)

定义的变量比接口少或多了一些属性都是不被允许的：

```ts twoslash
// @errors: 2741 2322
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom"
};

let tom2: Person = {
  name: "Tom",
  age: 25,
  gender: "male"
};
```

可见，赋值的时候，变量的形状必须和接口的形状保持一致

## 可选属性
有时我们希望不要完全匹配一个形状，那么可以用可选属性：
```ts twoslash
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};

let tom2: Person = {
    name: 'Tom',
    age: 25
};
```

可选属性的含义是该属性可以不存在

但仍然不允许添加未定义的属性：
```ts twoslash
// @errors: 2322
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

## 任意属性
有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
```ts twoslash
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

使用 `[propName: string]` 定义了任意属性取 string 类型的值

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：
```ts twoslash
// @errors: 2411 2322
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：
```ts twoslash
// @noErrors
interface Person {
    name: string;
    age?: number;
   [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

## 只读属性
有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：
```ts twoslash
// @errors: 2540
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
tom.name = 'jiangxin';
tom.id = 9527;
```
上例中，使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了

注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候，也就是说只读属性只能在变量初始化的时候进行赋值操作：
```ts twoslash
// @errors: 2741 2540
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;
```

上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。

第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了

## 参考
[Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)