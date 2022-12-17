---
title: 声明合并
---

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型

## 函数的合并

[之前学习过](/base/page7)，我们可以使用重载定义多个函数类型：

```ts twoslash
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
  return "";
}
```

## 接口的合并

接口中的属性在合并时会简单的合并到一个接口中：

```ts twoslash
interface Alarm {
  price: number;
}
interface Alarm {
  weight: number;
}
declare const alarm: Alarm;
```

相当于：

```ts twoslash
interface Alarm {
  price: number;
  weight: number;
}
```

注意，**合并的属性的类型必须是唯一的**：

```ts twoslash
// @errors: 2717
interface Alarm {
  price: number;
}
interface Alarm {
  price: number; // 虽然重复了，但是类型都是 `number`，所以不会报错
  weight: number;
}

interface Alarm2 {
  price: number;
}
interface Alarm2 {
  price: string; // 类型不一致，会报错
  weight: number;
}
```

接口中方法的合并，与函数的合并一样：

```ts twoslash
interface Alarm {
  price: number;
  alert(s: string): string;
}
interface Alarm {
  weight: number;
  alert(s: string, n: number): string;
}
```

相当于：

```ts twoslash
interface Alarm {
  price: number;
  weight: number;
  alert(s: string): string;
  alert(s: string, n: number): string;
}
```

## 类的合并
类的合并与接口的合并规则一致