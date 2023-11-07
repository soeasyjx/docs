/*
 * @Author: jiangxin
 * @Date: 2023-02-05 21:01:57
 * @Company: orientsec.com.cn
 * @Description:
 */
export const sourceCodeMap = {
  agreement: `
    import { Agreement } from 'fastman3-component-agreement';
    const AgreementDemo: FC<{}> = () => {
    // 协议编号
    const [typeCode, setTypeCode] = useState('00A');

    return (
        <View className="agreementDemo-page">
            <Agreement
                typeCode={typeCode}
                onChange={({ checked }) => {
                console.log('checked', checked);
                }}
            />
        </View>
    );
    };
    `,
  agreementpdf: `
    import { Agreement } from "fastman3-component-agreement";
    const AgreementDemo: FC<{}> = () => {
      return (
        <View className="agreementDemo-page">
          <Agreement.scenePDF<{
            agreementName: string;
            agreementUrl: string;
            code?: string;
          }>
            onChange={(e) => {
              console.log("eee", e);
            }}
            request={() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve([
                    {
                      agreementName: "测试协议1",
                      agreementUrl:
                        "https://test.easy.com.cn/protocols/_FILE/JZYY_FS/20210708/14592/11244/%E6%8A%95%E9%A1%BE%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf"
                    },
                    {
                      agreementName: "测试协议2---",
                      agreementUrl:
                        "https://test.easy.com.cn/protocols/_FILE/JZYY_FS/20210708/14469/11082/%E4%B8%9C%E6%96%B9%E8%AF%81%E5%88%B8%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%85%AC%E5%BC%80%E5%8B%9F%E9%9B%86%E8%AF%81%E5%88%B8%E6%8A%95%E8%B5%84%E5%9F%BA%E9%87%91%E6%8A%95%E8%B5%84%E9%A1%BE%E9%97%AE%E4%B8%9A%E5%8A%A1%E9%A3%8E%E9%99%A9%E6%8F%AD%E7%A4%BA%E4%B9%A61--.pdf"
                    },
                    {
                      agreementName: "测试协议3",
                      agreementUrl:
                        "https://test.easy.com.cn/protocols/_FILE/JZYY_FS/20210708/14595/11247/%E6%8A%95%E9%A1%BE%E8%B5%84%E9%87%91%E7%89%B9%E5%88%AB%E6%8F%90%E7%A4%BA%E7%A1%AE%E8%AE%A4%E4%B9%A6.pdf"
                    }
                  ]);
                }, 200);
              });
            }}
          />
        </View>
      );
    };
    `,
  'pagination-scroll': `
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
    `,
  pay: `
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
    `,
    share:`
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
    `
};
