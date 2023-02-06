---
title: 微信分享
toc: content
order: 4
group:
  title: 业务组件
---

## fastman3-component-share
[![npm version](https://img.shields.io/npm/v/fastman3-component-share?color=%231890ff)](https://www.npmjs.com/package/fastman3-component-share) [![npm version](https://img.shields.io/npm/dy/fastman3-component-share)](https://www.npmjs.com/package/fastman3-component-share)

 赢家 APP 内嵌 H5页面分享微信[好友，朋友圈]
## 何时使用
- 从赢家 APP 分享资源到微信好友或者微信朋友圈
- 小程序分享
## 安装
```bash
$ cnpm install --save fastman3-component-share
# or
$ npm install --save fastman3-component-share
# or
$ yarn add fastman3-component-share
```

## 演示
<Mobile url="http://easycli.cn:8891/components/share-demo-h5" sourcekey="share"></Mobile>

## API

| 参数 | 说明 |类型  |默认值| 支持端 |
| --- | --- | --- | --- | ---|
| title | 分享标题| <div class='api-type'>string</div> | - |<div class='api-col-100'>`h5`<br/>`微信小程序`<br/></div>| 
| desc | 分享描述| <div class='api-type'>string</div> | -|<div class='api-col-100'>`h5`</div>| 
| link | 分享链接| <div class='api-type'>string</div> | h5:`location.href`<br/> weapp:`useRouter().path` |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>| 
| thumbImangeUrl | 分享图标`需要为服务器绝对地址`| <div class='api-type'>string</div> | `process.env.ASSET_ENV_URL + "/images/public/60.png"` |<div class='api-col-100'>`h5`<br/>`微信小程序`</div>| 
| support | 支持的分享平台| <div class='api-typeinterface'>"wxhy" \| "wxpyq" \| "weibo" \| "qq"[]</div> | ["wxhy", "wxpyq"]|<div class='api-col-100'>`h5`</div>| 
| isTwiceShare | 是否需要开启微信二次分享| <div class='api-type'>boolean</div> | true |<div class='api-col-100'>`h5`</div>| 
| isCancelReject | 取消/关闭面板是否需要 reject| <div class='api-type'>boolean</div> | false |<div class='api-col-100'>`h5`</div>| 

## Instance
| 名称 | 说明 |类型|返回值|
| --- | ---| -------------|--- |
| open | 打开分享面板 |<div class='api-type'>() => Promise\<<div class='api-typeinterface'>ChannelEnum</div>\></div> |点击分享的平台<br/>`可利用此值进行埋点`|

## ChannelEnum
```typescript
export enum ChannelEnum {
  "wxhy" = 1,
  "wxpyq",
  "weibo",
  "qq",
}
```

## ShareError
> 关闭面板的 reject 类型，可以 catch 中进行捕获

### isTwiceShare
> 开启微信二次分享请先确保 `fastman3-dfyjapp-wxshare` 包有安装

## 代码演示
基础使用
```tsx | pure
import { ISharePanelRefType, SharePanel,ShareError } from "fastman3-component-share";
const ShareDemo: FC<ShareDemoProps> = () => {
  const shareref = useRef<ISharePanelRefType>();
  const [_ready] = useReducer(() => Promise.resolve(""), "", ready);

  useEffect(() => {
    (async function () {
      await _ready;
    })();
  });
  const share = async () => {
    try {
      await shareref?.current?.open?.().then((x) => console.log("点击分享回调", x));
    } catch (error) {
      console.log("error-------", error);
    }
  };

  return (
    <View className='sharedemo-page'>
      <Button style={{ marginTop: "10rem" }} onClick={share}>
        分享-h5
      </Button>
      <SharePanel ref={shareref} title={title} desc={desc}/>
    </View>
  );
};
```

## 微信小程序分享注意事项
* 页面配置需要添加<br/>
  `enableShareAppMessage: true` `enableShareTimeline: true`
* `path` 属性只有分享好友才生效，分享朋友圈没有效果
* `thumbImangeUrl` 属性分享好友时不进行赋值
* 分享到朋友圈功能目前只支持安卓系统
* 分享好友，朋友圈皆不支持定义描述信息


## Demo
在线 demo 可启动业务目录下 `shareDemo` 查看

## 更新内容
`Version：1.0.0-beta.5`
* 修改属性`isTwiceShare` 默认值为`true`
* 添加微信中调用`open` 打开灰色遮罩逻辑

`Version：1.0.0-beta.2`
* 修复 regeneratorRuntime is not defined 问题