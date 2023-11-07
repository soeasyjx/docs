---
title: 分页加载
toc: content
order: 5
group: 
  title: 业务组件
---

# fastman3-component-paginationscrollview
[![npm version](https://img.shields.io/npm/v/fastman3-component-paginationscrollview?color=%231890ff)](https://www.npmjs.com/package/fastman3-component-paginationscrollview) [![npm version](https://img.shields.io/npm/dy/fastman3-component-paginationscrollview)](https://www.npmjs.com/package/fastman3-component-paginationscrollview)

列表数据分页加载

## 何时使用

- 当页面的列表数据需要进行分页加载

## 安装
```bash
$ cnpm install --save fastman3-component-paginationscrollview
# or
$ npm install --save fastman3-component-paginationscrollview
# or
$ yarn add fastman3-component-paginationscrollview
```

## 演示
<Mobile url="http://easycli.cn:8891/components/pagination-scroll-view-demo-h5" sourcekey="pagination-scroll"></Mobile>

## API

### request

`request` 是 `PaginationScrollView` 最重要的 API，request 会接收一个对象。对象中必须要有 `data`。 `params` 参数发生修改时重新执行。同时查询数据默认参数的值和 params 参数也会带入。以下是一个例子

```tsx | pure
    import React, { FC, useRef, useState } from "react";
    import { View } from "@tarojs/components";
    import { type IPaginationScrollViewRefType, PaginationScrollView } from "fastman3-component-paginationscrollview";

    const PaginationScrollViewDemoDemo: FC<PaginationScrollViewDemoProps> = () => {
        const [params, setParams] = useState<IParams>();
        return (
            <View className='paginationScrollViewDemo-page'>
            <Button onClick={() => setParams({ name: "xxxxx", age: +new Date() })}>额外查询参数</Button> 
            <PaginationScrollView<IMemo, IParams>
                itemkey='prodCode'
                // params 是需要自带的参数
                params={params}
                request={(params) => {
                // params 会默认包含 positionStr,queryNum
                    return IF011333API({ fundAccount: "00127575", ...params }).then(({ items, positionStr, hadOver }) => {
                        return { data: items };
                    });
                }}
                renderItem={(record) => {
                    return (
                        <View onClick={() => console.log(record)} style={{ border: "1px solid red", marginTop: "10px" }}>
                        {record.prodName}-{record.prodCode}
                        </View>
                    );
                }}
            />
            </View>
        );
};
```
### 泛型说明
T：列表数据 Item 类型

U：额外参数类型

| 参数 | 说明 |类型  |默认值| 支持端 |
| --- | --- | --- | --- | ---|
| request | 获取 `dataSource` 的方法 | <div class='api-type'> (params?:U & { positionStr?: string; queryNum: string }) => {data}</div> | - |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|
| dataSource | 列表的数据，推荐使用 request | <div class='api-type'> T[]</div> | - |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|
| beforeRequest | request 前置流程<br>如：ready，oauth | <div class='api-type'> (...arg: any) => void \| ((...arg: any) => Promise\<void\>)</div> | - |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|
| queryNum | 每页查询数据量 <br>`为了处理跟首页骨架屏的冲突`| <div class='api-type'> number</div> | 20 |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|
| params | 用于 `request` 查询的额外参数，一旦变化会触发重新加载| <div class='api-type'> U \| object</div> | - |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|
| itemkey | 列表项 key 的取值 | <div class='api-type'> string</div> | - |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|
| renderItem | 列表项模板 | <div class='api-type'> (record: T) => JSX.Element</div> | - |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|
| isCloseInitLoading | 是否需要关闭首页默认 loading 效果 <br>`为了处理跟首页骨架屏的冲突`| <div class='api-type'> boolean</div> | false |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|
| onRequestSuccess | 调用查询接口成功或者修改数据源时触发 | <div class='api-type'> (dataSource: T[]) => void</div> | - |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|
| onRequestError | 调用接口失败时触发 | <div class='api-type'> (e: any) => void</div> | - |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>|

## 注意事项
* `PaginationScrollView` 是基于 `Taro.ScrollView` 组件的二次封装，所以`ScrollView` 原始属性还是可以使用，但请尽量不要使用`onScroll`
* 请务必正确设置容器的高度，组件会默认人撑满父容器高度，参考 [ScrollView](https://taro-docs.jd.com/taro/docs/components/viewContainer/scroll-view/)