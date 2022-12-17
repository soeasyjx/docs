/*
 * @Author: jiangxin
 * @Date: 2022-08-17 15:36:51
 * @Company: orientsec.com.cn
 * @Description:
 */
import React, { useState } from "react";

import BrowserOnly from "@docusaurus/BrowserOnly";
import styles from "./styles.module.scss";

console.log("stylesstyles", styles);

export const LightDarkModeDemo = () => {
  const [theme, setTheme] = useState("light");
  const [lightChecked, setLightChecked] = useState(true);
  const [darkChecked, setDarkChecked] = useState(false);
  const onChangeFormLight = (e) => {
    if (e.target.value) {
      setTheme("light");
      setLightChecked(true);
      setDarkChecked(false);
    }
  };

  const onChangeFormDark = (e) => {
    if (e.target.value) {
      setTheme("dark");
      setDarkChecked(true);
      setLightChecked(false);
    }
  };
  return (
    <BrowserOnly>
      {() => (
        <html lang="en" id={styles.myhtml} data-mytheme={theme}>
          <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>暗黑主题切换</title>
          </head>
          <body>
            <span>点击可进行主题的切换</span>
            <div>
              <label>
                亮
                <input
                  name="lightdarkmode"
                  type="radio"
                  id="light"
                  checked={lightChecked}
                  onChange={onChangeFormLight}
                />
              </label>
              <label>
                暗
                <input
                  name="lightdarkmode"
                  type="radio"
                  id="dark"
                  checked={darkChecked}
                  onChange={onChangeFormDark}
                />
              </label>
            </div>
            <div>
              <div id={styles.app}>
                <p>测试文字1</p>
                <p>测试文字2</p>
                <p>测试文字3</p>
              </div>
            </div>
          </body>
        </html>
      )}
    </BrowserOnly>
  );
};

