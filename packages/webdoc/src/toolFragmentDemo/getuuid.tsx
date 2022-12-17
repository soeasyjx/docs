/*
 * @Author: jiangxin
 * @Date: 2022-09-06 09:06:40
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

const getUUID = () => {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const GetUUIDDemo = () => {
  return (
    <>
      <div>uuid:{getUUID()}</div>
      <div>uuid:{getUUID()}</div>
      <div>uuid:{getUUID()}</div>
    </>
  );
};

