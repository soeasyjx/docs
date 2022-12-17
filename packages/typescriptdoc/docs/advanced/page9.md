---
title: 扩展阅读
---

此处记录了[官方手册](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)中包含，但是本书未涉及的概念。

我认为它们是一些不重要或者不属于 TypeScript 的概念，所以这里只给出一个简单的释义，详细内容可以点击链接深入理解。

- [Never](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)：永远不存在值的类型，一般用于错误处理函数
- [Variable Declarations](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)：使用 let 和 const 替代 var，[这是 ES6 的知识](https://es6.ruanyifeng.com/#docs/let)
- [this](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Functions.html#this)：箭头函数的运用，这是 ES6 的知识
- [Using Class Types in Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)：创建工厂函数时，需要引用构造函数的类类型
- [Best common type](https://www.typescriptlang.org/docs/handbook/type-inference.html#best-common-type)：数组的类型推论
- [Contextual Type](https://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-type)：函数输入的类型推论
- [Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)：允许不严格符合类型，只需要在一定规则下兼容即可
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)：使用 & 将多种类型的共有部分叠加成一种类型
- [Type Guards and Differentiating Types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)：联合类型在一些情况下被识别为特定的类型
- [Polymorphic this types](https://www.typescriptlang.org/docs/handbook/2/classes.html)：父类的某个方法返回 this，当子类继承父类后，子类的实例调用此方法，返回的 this 能够被 - TypeScript 正确的识别为子类的实例。
- [Symbols](https://www.typescriptlang.org/docs/handbook/symbols.html)：新原生类型，这是 [ES6 的知识](https://es6.ruanyifeng.com/#docs/symbol)
- [Iterators and Generators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)：迭代器，这是 [ES6 的知识](https://es6.ruanyifeng.com/#docs/iterator)
- [Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)：避免全局污染，现在已被 [ES6 Module](https://es6.ruanyifeng.com/#docs/module) 替代
- [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)：修饰器，这是 [ES7 的一个提案](https://es6.ruanyifeng.com/#docs/decorator)
- [Mixins](https://www.typescriptlang.org/docs/handbook/mixins.html)：一种编程模式，与 TypeScript 没有直接关系，可以参考 ES6 中 [Mixin 模式的实现](https://es6.ruanyifeng.com/#docs/class-extends#Mixin-%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%AE%9E%E7%8E%B0)