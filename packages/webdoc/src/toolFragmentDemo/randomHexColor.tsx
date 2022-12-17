/*
 * @Author: jiangxin
 * @Date: 2022-08-27 16:31:42
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

const randomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;

export const RandomHexColorDemo = () => {
  const [refresh, setRefresh] = React.useState(0);
  const update = () => {
    setRefresh(+new Date());
  };
  return (
    <>
      <button onClick={update}>刷新</button>
      <div style={{ backgroundColor: randomHexColor() }}>颜色</div>
      <div style={{ backgroundColor: randomHexColor() }}>颜色</div>
      <div style={{ backgroundColor: randomHexColor() }}>颜色</div>
    </>
  );
};

