/*
 * @Author: jiangxin
 * @Date: 2022-09-06 09:06:40
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

const typeOf = (val) => {
  return Object.prototype.toString.call(val);
};

export const CheckTypeDemo = () => {
  return (
    <>
      <div>
        <span>typeOf("字符串")：</span>
        {typeOf("字符串")}
      </div>

      <div>
        <span>typeOf("{}")：</span>
        {typeOf({})}
      </div>

      <div>
        <span>typeOf(new Date())：</span>
        {typeOf(new Date())}
      </div>
      <div>
        <span>typeOf(new Date())：</span>
        {typeOf(function () {})}
      </div>
      <div>
        <span>typeOf(null)：</span>
        {typeOf(null)}
      </div>
      <div>
        <span>typeOf(undefined)：</span>
        {typeOf(undefined)}
      </div>
      <div>
        <span>typeOf([])：</span>
        {typeOf([])}
      </div>
    </>
  );
};

