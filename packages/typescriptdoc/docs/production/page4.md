---
title: 关联对象属性必填
---

当对象中某几个可选属性存在关联性的时候，即 属性 A 关联属性 B，当存在 A 时，一定要存在 B，这时我们应该怎么书写类型

## 类型定义

```ts twoslash
type RequireAllOrNone<ObjectType, KeysType extends keyof ObjectType = never> = (
  | Required<Pick<ObjectType, KeysType>>
  | Partial<Record<KeysType, never>>
) &
  Omit<ObjectType, KeysType>;
```

## 使用

```ts twoslash
export type RequireAllOrNone<
  ObjectType,
  KeysType extends keyof ObjectType = never
> = (Required<Pick<ObjectType, KeysType>> | Partial<Record<KeysType, never>>) &
  Omit<ObjectType, KeysType>;

// ---cut---
type Responder = {
  text?: () => string;
  json?: () => string;
  secure: boolean;
};

const responder1: RequireAllOrNone<Responder, "text" | "json"> = {
  secure: true
};

const responder2: RequireAllOrNone<Responder, "text" | "json"> = {
  text: () => '{"message": "never type"}',
  json: () => '{"message": "bytefer"}',
  secure: true
};

//@errors: 2322
const responder3: RequireAllOrNone<Responder, "text" | "json"> = {
  secure: true,
  text: () => '{"message": "never type"}'
};

//@errors: 2322
const responder4: RequireAllOrNone<Responder, "text" | "json"> = {
  secure: true,
  json: () => '{"message": "bytefer"}'
};
```


## 参考
[never types](https://javascript.plainenglish.io/5-very-useful-tricks-for-typescript-never-type-d54dc6c2562)