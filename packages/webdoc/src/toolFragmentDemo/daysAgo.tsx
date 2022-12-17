/*
 * @Author: jiangxin
 * @Date: 2022-08-21 20:27:39
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

const daysAgo = (n) => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split("T")[0];
};

export const DaysAgoDemo = () => {
  return (
    <>
      <div>前1天的日期：{daysAgo(1)}</div>
      <div>前3天的日期：{daysAgo(3)}</div>
      <div>前30天的日期：{daysAgo(30)}</div>
      <div>前180天的日期：{daysAgo(180)}</div>
    </>
  );
};

