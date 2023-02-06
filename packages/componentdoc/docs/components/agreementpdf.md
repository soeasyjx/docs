---
title: 协议PDF
toc: content
order: 2
group:
  title: 业务组件
---

## fastman3-component-agreement

[![npm version](https://img.shields.io/npm/v/fastman3-component-agreement?color=%231890ff)](https://www.npmjs.com/package/fastman3-component-agreement) [![npm version](https://img.shields.io/npm/dy/fastman3-component-agreement)](https://www.npmjs.com/package/fastman3-component-agreement)

## 何时使用

- 需要查看业务协议
- 需要阅读 PDF 协议

## 安装

```shell
$ cnpm install --save fastman3-component-agreement
# or
$ npm install --save fastman3-component-agreement
# or
$ yarn add fastman3-component-agreement
```

## 接入路由

在`app.config.ts`中添加 pdf 路由页面 `pages/h5PdfRead/index`

## 演示
<Mobile url="http://easycli.cn:8891/components/agreement-demo-h5" sourcekey="agreementpdf"></Mobile>

## API

| 参数       | 说明                                                 | 类型                                                                                                                                | 默认值 | 支持端                                                |
| ---------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------- |
| request    | 自定义请求接口，默认使用`IF110606`接口来获取协议列表 | <div class="api-type">(arg: any) => Promise\< <div class='api-typeinterface'>[D[]](/components/agreementpdf#泛型说明)</div>\></div> | -      | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |
| dataSource | 数据源                                               | <div class="api-type"><div class='api-typeinterface'>[D[]](/components/agreementpdf#泛型说明)</div></div>                           | -      | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |
| onChange   | 选择改变事件                                         | <div class="api-type">(arg: { checked: boolean }) => void</div>                                                                     | -      | <div class='api-col-100'>`h5`<br/>`微信小程序` </div> |

### 泛型说明

D：数据源类型
:::warning
泛型 D 必须满足以下类型约束

```typescript
{
  agreementName: string;
  agreementUrl: string;
}
```

:::

## 代码演示

使用 `request` 属性

```tsx | pure
import { Agreement } from 'fastman3-component-agreement';
const AgreementDemo: FC<{}> = () => {
  return (
    <View className="agreementDemo-page">
      <Agreement.scenePDF<{
        agreementName: string;
        agreementUrl: string;
        code?: string;
      }>
        onChange={(e) => {
          console.log('eee', e);
        }}
        request={() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([
                {
                  agreementName: '测试协议1',
                  agreementUrl:
                    'https://hlwres.dfzq.com.cn/protocols/_FILE/JZYY_FS/20210708/14592/11244/%E6%8A%95%E9%A1%BE%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf',
                },
                {
                  agreementName: '测试协议2---',
                  agreementUrl:
                    'https://hlwres.dfzq.com.cn/protocols/_FILE/JZYY_FS/20210708/14469/11082/%E4%B8%9C%E6%96%B9%E8%AF%81%E5%88%B8%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%85%AC%E5%BC%80%E5%8B%9F%E9%9B%86%E8%AF%81%E5%88%B8%E6%8A%95%E8%B5%84%E5%9F%BA%E9%87%91%E6%8A%95%E8%B5%84%E9%A1%BE%E9%97%AE%E4%B8%9A%E5%8A%A1%E9%A3%8E%E9%99%A9%E6%8F%AD%E7%A4%BA%E4%B9%A61--.pdf',
                },
                {
                  agreementName: '测试协议3',
                  agreementUrl:
                    'https://hlwres.dfzq.com.cn/protocols/_FILE/JZYY_FS/20210708/14595/11247/%E6%8A%95%E9%A1%BE%E8%B5%84%E9%87%91%E7%89%B9%E5%88%AB%E6%8F%90%E7%A4%BA%E7%A1%AE%E8%AE%A4%E4%B9%A6.pdf',
                },
              ]);
            }, 200);
          });
        }}
      />
    </View>
  );
};
```

使用 `dataSource` 属性

```tsx | pure
import { Agreement } from 'fastman3-component-agreement';
const AgreementDemo: FC<{}> = () => {
  const _dataSource = [
    {
      agreementName: '测试协议1',
      agreementUrl:
        'https://hlwres.dfzq.com.cn/protocols/_FILE/JZYY_FS/20210708/14592/11244/%E6%8A%95%E9%A1%BE%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf',
    },
    {
      agreementName: '测试协议2---',
      agreementUrl:
        'https://hlwres.dfzq.com.cn/protocols/_FILE/JZYY_FS/20210708/14469/11082/%E4%B8%9C%E6%96%B9%E8%AF%81%E5%88%B8%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%85%AC%E5%BC%80%E5%8B%9F%E9%9B%86%E8%AF%81%E5%88%B8%E6%8A%95%E8%B5%84%E5%9F%BA%E9%87%91%E6%8A%95%E8%B5%84%E9%A1%BE%E9%97%AE%E4%B8%9A%E5%8A%A1%E9%A3%8E%E9%99%A9%E6%8F%AD%E7%A4%BA%E4%B9%A61--.pdf',
    },
    {
      agreementName: '测试协议3',
      agreementUrl:
        'https://hlwres.dfzq.com.cn/protocols/_FILE/JZYY_FS/20210708/14595/11247/%E6%8A%95%E9%A1%BE%E8%B5%84%E9%87%91%E7%89%B9%E5%88%AB%E6%8F%90%E7%A4%BA%E7%A1%AE%E8%AE%A4%E4%B9%A6.pdf',
    },
  ];
  return (
    <View className="agreementDemo-page">
      <Agreement.scenePDF<{
        agreementName: string;
        agreementUrl: string;
        code?: string;
      }>
        dataSource={_dataSource}
        onChange={({ checked }) => {
          console.log('checked', checked);
        }}
      />
    </View>
  );
};
```

## 更新内容

`Version：1.1.0`

- 支持 PDF 文档阅读

`Version：1.0.4`

- 支持自定义协议模板;
