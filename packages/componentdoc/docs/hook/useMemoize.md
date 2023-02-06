---
toc: false
order: 2
---

# useMemoize
持久化接口数据

## 何时使用
- 需要将接口数据进行缓存，避免过多向服务器请求相同的数据

## API
> 该api提供hook调用和普通调用函数两种使用场景方式，可根据需要，选择使用
#### hook
```typescript
    const [api, { deleteMap }] = useMemoize(fn: T);
```
#### function
``` typescript
    const [api, { deleteMap }] = memoize(fn: T);
```

## Result
|参数|说明|类型|
|---|---|---|
|api|接口 api|<div class='api-type'>`(...args: any[]) => any`</div>|
|deleteMap|清除接口缓存数据|<div class='api-type'>`() => void`</div>|

## Params
|参数|说明|类型|默认值|
|---|---|---|---|
|fun|需要持久化的函数，`如果该函数入参有变化，将会重新请求接口`|<div class='api-type'>`(...args: any[]) => any`</div>|-|

## 代码演示
#### 基础用法-useMemoize
```tsx | pure
  import { useMemoize } from "fastman3-dfyjapp-hooks";
  const AgreementDemo: FC<AgreementDemoProps> = () => {
        const [typeCode, setTypeCode] = useState("00A");
        const [_IF110606, { deleteMap: IF110606DeleteMap }] = useMemoize(IF110606);

        const testCatch1 = () => {
            _IF110607({ typeCode });
        };

        const removeData1 = () => {
            clearMap()
        };

        return (
            <View className='agreementDemo-page'>
            <Button style={{ marginTop: "10rem" }} onClick={testCatch1}>
                更新1
            </Button>
            <Button style={{ marginTop: "20rem" }} onClick={removeData1}>
                删除缓存数据——IF110607
            </Button>
            </View>
        );
};
```

#### 基础用法-memoize
```typescript
    import { memoize } from "fastman3-dfyjapp-hooks";
    const [IF010010Memoize，{deleteMap}] = memoize(IF010010Services);
    const test = (isOpen: boolean = false) => {
      try {
        const _data = await IF010010Memoize();
      } catch (e) {
        console.log("error", e);
      } finally {
      }
    }
```