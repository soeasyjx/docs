---
toc: false
order: 2
---

# useUpdateEffect
`useUpdateEffect` 用法等同于 `useEffect`，但是会忽略首次执行，只在依赖更新时执行。

## 何时使用
- 需要忽略首次执行

## API
API 与 `React.useEffect` 完全一致。
```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```

## 代码演示
```tsx | pure
import { useUpdateEffect } from "fastman3-dfyjapp-hooks";
export default () => {
  useUpdateEffect(()=>{
      console.log('忽略首次执行')
  },[deps])

  return (
    <>
     demo
    </>
  );
};
```