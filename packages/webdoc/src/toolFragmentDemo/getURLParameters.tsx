/*
 * @Author: jiangxin
 * @Date: 2022-08-27 16:19:16
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

export const GetURLParametersDemo = () => {
  return (
    <>
      <div>
        <h3>getURLParameters</h3>
        <p>URL:https://www.xxxx.com/index.html?name=中国&age=10</p>
        <div>
          {JSON.stringify(
            getURLParameters("https://www.xxxx.com/index.html?name=中国&age=10")
          )}
        </div>
      </div>
    </>
  );
};

