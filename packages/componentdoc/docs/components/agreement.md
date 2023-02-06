---
title: 协议
toc: content
order: 1
group: 
  title: 业务组件
---

## fastman3-component-agreement

[![npm version](https://img.shields.io/npm/v/fastman3-component-agreement?color=%231890ff)](https://www.npmjs.com/package/fastman3-component-agreement) [![npm version](https://img.shields.io/npm/dy/fastman3-component-agreement)](https://www.npmjs.com/package/fastman3-component-agreement)

## 何时使用

- 需要查看业务协议

## 安装
```shell
$ cnpm install --save fastman3-component-agreement
# or
$ npm install --save fastman3-component-agreement
# or
$ yarn add fastman3-component-agreement
```

## 演示
<Mobile url="http://easycli.cn:8891/components/agreement-demo-h5" sourcekey="agreement"></Mobile>

## API

| 参数       | 说明                                                 | 类型                                                                                                                | 默认值   | 支持端                                                |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------- |
| typeCode   | 协议 code，多个的值以`,`分割                         | <div class="api-type">string</div>                                                                                  | -        | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |
| checked    | 是否选中                                             | <div class="api-type">boolean</div>                                                                                 | false    | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |
| request    | 自定义请求接口，默认使用`IF110606`接口来获取协议列表 | <div class="api-type">(arg: any) => Promise\<{items: <div class='api-typeinterface'>IAgreementItem[]</div>}\></div> | IF110606 | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |
| dataSource | 数据源                                               | <div class="api-type"><div class='api-typeinterface'>IAgreementItem[]</div></div>                                   | -        | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |
| isCache    | 是否需要缓存从接口获取的协议列表数据                 | <div class="api-type">boolean</div>                                                                                 | true     | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |
| disabled   | 是否禁用协议点击事件                                 | <div class="api-type">boolean</div>                                                                                 | false    | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |
| onChange   | 选择改变事件                                         | (arg: { checked: boolean }) => void                                                 | -        | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |

## interface

### IAgreementItem
| 参数               | 类型          | 说明                               |是否必须|
| ------------------ | ------------- | ----------------------------------| ------|
| name               | 协议名称      | <div class="api-type">string</div> |required|
| version            | 协议版本      | <div class="api-type">string</div> ||
| specCategory       | 个性化归属     | <div class="api-type">string</div> ||
| protDesc           | 协议简介      | <div class="api-type">string</div> ||
| internalUrl        | 内网协议地址  | <div class="api-type">string</div> ||
| externalInstantUrl | 外网协议地址  | <div class="api-type">string</div> |required|
| externalCdnUrl     | 外网 CDN 地址 | <div class="api-type">string</div> ||
| modifyTime         | 更改时间      | <div class="api-type">string</div> ||


## 代码演示

基础使用

```tsx | pure
import { Agreement } from "fastman3-component-agreement";
const AgreementDemo: FC<{}> = () => {
  // 协议编号
  const [typeCode, setTypeCode] = useState("00A");

  return (
    <View className="agreementDemo-page">
      <Agreement
        typeCode={typeCode}
        onChange={({ checked }) => {
          console.log("checked", checked);
        }}
      />
    </View>
  );
};
```

使用 `request` 属性
> 使用自定义 `request` 属性，返回类型需要为 <span class="api-type">IAgreementItem[]</span>，其中 `name` ,`externalInstantUrl` 为必填

```tsx | pure
import { Agreement } from "fastman3-component-agreement";
const AgreementDemo: FC<{}> = () => {
  // 协议编号
  const [typeCode, setTypeCode] = useState("00A");

  return (
    <View className="agreementDemo-page">
      <Agreement
        request={() => IF110607({ typeCode: "00B", name: "demo" })}
        onChange={({ checked }) => {
          console.log("checked", checked);
        }}
      />
    </View>
  );
};
```

使用 `dataSource` 属性

```tsx | pure
import { Agreement } from "fastman3-component-agreement";
const AgreementDemo: FC<{}> = () => {
  const _dataSource = [
    {
      name: "协议1",
      externalInstantUrl: "https://xxxxxx",
    },
    {
      name: "协议1",
      externalInstantUrl: "https://xxxxxx",
    },
    {
      name: "协议1",
      externalInstantUrl: "https://xxxxxx",
    }
  ];
  return (
    <View className="agreementDemo-page">
      <Agreement
        dataSource={_dataSource}
        onChange={({ checked }) => {
          console.log("checked", checked);
        }}
      />
    </View>
  );
};
```

使用自定义模板
> 自定义模板不建议添加`onClick` 事件

```tsx | pure
import { Agreement } from "fastman3-component-agreement";
const AgreementDemo: FC<{}> = () => {
  // 协议编号
  const [typeCode, setTypeCode] = useState("00A");

  return (
    <View className="agreementDemo-page">
      <Agreement>
        <Button>自定义内容</Button>
      </Agreement>
    </View>
  );
};
```

## 更新内容
`Version：1.1.0`

- 支持PDF文档阅读

`Version：1.0.4`
* 支持自定义协议模板;