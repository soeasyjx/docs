---
title: 支付密码验证键盘
toc: content
order: 3
group:
  title: 业务组件
---

## fastman3-component-pay
[![npm version](https://img.shields.io/npm/v/fastman3-component-pay?color=%231890ff)](https://www.npmjs.com/package/fastman3-component-pay) [![npm version](https://img.shields.io/npm/dy/fastman3-component-pay)](https://www.npmjs.com/package/fastman3-component-pay)

## 何时使用
- 需要验证支付密码的业务。
## 安装
```bash
$ cnpm install --save fastman3-component-pay
# or
$ npm install --save fastman3-component-pay
# or
$ yarn add fastman3-component-pay
```

## 演示
<Mobile url="http://easycli.cn:8891/components/pay-demo-h5" sourcekey="pay"></Mobile>

## API

| 参数 | 说明 |类型  |默认值| 支持端 |
| --- | --- | --- | --- | ---|
| fundAccount | 需要进行密码验证的账户| <div class='api-type'>string</div> | 当前二级登录资金账户<br/>`AppAuthorize.fundAccount` |<div class='api-col-100'>`h5`<br/>`微信小程序`<br/>`支付宝小程序`</div>| 

## Instance
| 名称 | 说明 |类型|返回值|
| --- | --- | --- |--- |
| open | 打开密码支付面板 |<div class='api-type'>() => Promise\<string\></div> |混淆密码|

## PayError
> 关闭面板的 reject 类型，可以 catch 中进行捕获

## 代码演示
基础使用
```tsx | pure
import { IPayPanelRefType, PayPanel } from "fastman3-component-pay";
import { PayError, ErrorEnum } from "fastman3-component-pay/es/hooks/common"；
const PayDemo: FC<{}> = (props) => {
 // 面板实例 
  const _ref = useRef<IPayPanelRefType>();

  async function updateIsOpen() {
    try {
      const pwd = await _ref?.current?.open?.();
      console.log("pwd", pwd);
    } catch (error) {
      console.log("error", error instanceof PayError);
      console.log("error-name", error.name === ErrorEnum.PayError);
      console.log("error-name", error.name);
    }
  }
  return (
    <View className='payDemo-page'>
      <Button onClick={updateIsOpen}>点击打开/关闭面板 Btn</Button>
      <PayPanel ref={_ref} fundAccount="028132137897"/>
    </View>
  );
};
```
## 更新内容
`Version：1.0.1`
* 添加混淆接口返回过慢或出错效果
* 优化光标动效