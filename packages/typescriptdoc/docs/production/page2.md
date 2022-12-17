---
title: 路由参数类型
---

检查路由参数类型

## 类型定义
```ts twoslash
type ParseUrlParams<url> = url extends `${infer path}(${infer optionalPath})`
  ? ParseUrlParams<path> & Partial<ParseUrlParams<optionalPath>>
  : url extends `${infer start}/${infer rest}`
  ? ParseUrlParams<start> & ParseUrlParams<rest>
  : url extends `:${infer param}`
  ? { [k in param]: string }
  : {};
```

## 使用
```ts twoslash
export type ParseUrlParams<url> =
  url extends `${infer path}(${infer optionalPath})`
    ? ParseUrlParams<path> & Partial<ParseUrlParams<optionalPath>>
    : url extends `${infer start}/${infer rest}`
    ? ParseUrlParams<start> & ParseUrlParams<rest>
    : url extends `:${infer param}`
    ? { [k in param]: string }
    : {};

// @lib: dom,es2017
// @errors: 2345
// ---cut---
function navigate<T extends string>(
  path: T,
  params: ParseUrlParams<T>
) {
  // interpolate params
  let url = Object.entries<string>(params).reduce<string>(
    (path, [key, value]) => path.replace(`:${key}`, value),
    path
  );

  // clean url
  url = url.replace(/(\(|\)|\/?:[^\/]+)/g, '')

  // update url
  history.pushState({}, '', url);
}

navigate("user/:userId", { userId: "2" });
// ^?

navigate("user/:userId/dashboard(/:dashboardId)", { userId: "2" });
// ^?
navigate("user/:userId/dashboard(/:dashboardId)", { dashboardId: "2" });

navigate("user/:userId/dashboard(/:dashboardId)", { userId: "2", oops: ":(" });

```