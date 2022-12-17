/*
 * @Author: jiangxin
 * @Date: 2022-08-17 15:36:51
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

export const LightDarkModeColorSchemeDemo = () => {
  return (
    <BrowserOnly>
      {() => (
        <div>
          <p>
            这里为了方便演示，使用 form 表单元素，通过切换系统<u>亮</u>或
            <u>暗</u>来查看效果
          </p>
          <input type="radio" style={{ colorScheme: "light dark" }} />
          <br />
          <input
            type="text"
            style={{ colorScheme: "light dark" }}
            placeholder="请输入文案"
          />
          <br />
          <div>使用暗色 </div>
          <input type="button" style={{ colorScheme: "dark" }} value="按钮" />
        </div>
      )}
    </BrowserOnly>
  );
};

