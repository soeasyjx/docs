/*
 * @Author: jiangxin
 * @Date: 2022-08-25 16:15:25
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

import Decoration from "./Decoration";
import BigCountNumber from "./BigCountNumber";

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <main>
      <BigCountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>点击修改count值</button>

      {/* 👇 This fella is new 👇 */}
      <Decoration />
    </main>
  );
}

export default Counter;
