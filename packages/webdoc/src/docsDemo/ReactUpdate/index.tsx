/*
 * @Author: jiangxin
 * @Date: 2022-08-25 13:26:43
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

export function ReactUpdateDemo() {
  return (
    <div style={{ textAlign: "center" }}>
      <Counter />
      <footer>
        <p>这是最外层组件的内容</p>
      </footer>
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <main>
      <BigCountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>点击修改count值</button>
    </main>
  );
}

function BigCountNumber({ count }) {
  return (
    <p>
      <span className="prefix">Count:</span>
      {count}
    </p>
  );
}
