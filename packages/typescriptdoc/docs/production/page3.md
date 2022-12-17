---
title: 提取接口属性路径
---

`obj.name.eee`

## 类型定义

```ts twoslash
type GetAttrPath<T extends Record<string, any>> = {
  [key in keyof T]: key extends string
    ? T[key] extends Record<string, any>
      ? `${key}.${GetAttrPath<T[key]>}`
      : key
    : never;
}[keyof T];
```

:::caution
这里解释一下为什么要`key extends string`
索引类型 keyof T 是 string | number | symbol 的子类型
Symbol() 是不能转成字符串类型的
:::

## 使用

```ts twoslash
export type GetAttrPath<T extends Record<string, any>> = {
  [key in keyof T]: key extends string
    ? T[key] extends Record<string, any>
      ? `${key}.${GetAttrPath<T[key]>}`
      : key
    : never;
}[keyof T];

// ---cut---
type Template = {
  aaa: string;
  bbb: {
    cc: {
      dd: string;
    };
  };
  eee: {
    ff: string;
    gg: number;
  };
};

type Path = GetAttrPath<Template>;
  // ^?
```

## 资料
- [template string](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#stricter-checks-with-template-string-expressions)
- [keyof T](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html)