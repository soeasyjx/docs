/*
 * @Author: jiangxin
 * @Date: 2022-08-27 16:08:44
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

const dayDiff = (d1, d2) =>
  Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / 86400000);

export const DayDiffDemo = () => {
  return (
    <>
      <div>
        <span>【2022-08-09】到【2022-10-29】相差天数：</span>
        {dayDiff(new Date(2022, 8, 9), new Date(2022, 10, 29))}天
      </div>

      <div>
        <span>【2022-02-09】到【2022-01-11】 相差天数：</span>
        {dayDiff(new Date(2022, 2, 9),new Date(2021, 1, 11))}天
      </div>
    </>
  );
};
