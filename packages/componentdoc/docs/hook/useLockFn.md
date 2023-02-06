---
toc: false
order: 3
---

# useLockFn
用于给一个异步函数增加竞态锁，防止并发执行。

## 何时使用
- 当需要异步函数有返回结果，才继续下一个运作的时候
- 在给 `Button`或其他组件函数执行完成前，其余的点击动作都会被忽略。

## API
```typescript
function useLockFn<P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
): fn: (...args: P) => Promise<V | undefined>
```

## Result
|参数|说明|类型|
|---|---|---|
|fn|增加了竞态锁的函数|<div class='api-type'>`(...args: any[]) => Promise<any>`</div>|

## Params
|参数|说明|类型|默认值|
|---|---|---|---|
|fn|需要增加竞态锁的函数|<div class='api-type'>`(...args: any[]) => Promise<any>`</div>|-|

## 代码演示
```tsx | pure
import { useLockFn } from "fastman3-dfyjapp-hooks";
export default () => {
  const [count, setCount] = useState(0);

  const submit = useLockFn(async () => {
    console.log('Start to submit');
    await AsyncFunction();
    setCount((val) => val + 1);
    console.log('Submit finished');
  });

  return (
    <>
      <p>Submit count: {count}</p>
      <button onClick={submit}>Submit</button>
    </>
  );
};
```