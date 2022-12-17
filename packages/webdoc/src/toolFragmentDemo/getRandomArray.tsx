/*
 * @Author: jiangxin
 * @Date: 2022-09-06 09:06:40
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

const getRandomItem = <T extends any[]>(array: T) => {
  const mode = array;
  const modeIndex = Math.floor(Math.random() * mode.length);
  return mode[modeIndex] as T[number];
};

export const GetRandomItemDeom = () => {
  const [flag, setflag] = React.useState({});
  const restHandle = () => {
    setflag({});
  };
  return (
    <>
      <input type="button" value="点击刷新" onClick={restHandle} />
      <div>
        [1, 2, 3, 4]
        <br />
        元素:{getRandomItem([1, 2, 3, 4])}
      </div>
      <div>
        ['a', 'b', 'c', 'd']
        <br />
        元素:{getRandomItem(["a", "b", "c", "d"])}
      </div>
    </>
  );
};

