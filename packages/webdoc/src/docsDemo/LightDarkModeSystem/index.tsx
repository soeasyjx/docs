/*
 * @Author: jiangxin
 * @Date: 2022-08-17 15:36:51
 * @Company: orientsec.com.cn
 * @Description:
 */
import React, { useEffect, useCallback, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import styles from "./styles2.module.scss";

// 获取媒体样式实例
let media;
if (ExecutionEnvironment.canUseDOM) {
  media = window.matchMedia("(prefers-color-scheme: dark)");
}

export const LightDarkModeSystemDemo = () => {
  const [themeModal, setThemeModal] = useState(media.matches ? true : false);

  useEffect(() => {
    // 注册 meida 改变监听事件
    media?.addEventListener("change", systemThemeChange);
    return () => {
      media?.removeEventListener("change", systemThemeChange);
    };
  }, []);
  const systemThemeChange = useCallback((e) => {
    console.log("e", e);
    // 匹配暗色
    if (e.matches) {
      setThemeModal(true);
    } else {
      setThemeModal(false);
    }
  }, []);
  return (
    <BrowserOnly>
      {() => (
        <div>
          MAC系统通过:系统偏好设置-&gt;通用-&gt;进行系统色的设置; 查看效果
          <br />
          <div>
            当前系统：<u>{themeModal ? "暗色模式" : "亮色模式"}</u>
          </div>
          <div id={styles.app}>
            <p>测试文字1</p>
            <p>测试文字2</p>
            <p>测试文字3</p>
          </div>
        </div>
      )}
    </BrowserOnly>
  );
};

