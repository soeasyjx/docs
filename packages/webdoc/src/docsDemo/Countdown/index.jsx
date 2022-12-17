/*
 * @Author: jiangxin
 * @Date: 2022-08-21 14:23:48
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";
import clx, { clsx } from "clsx";
import styles from "./styles.module.scss";

export const CountDownDemo1 = () => {
  return (
    <div>
      <div
        id="countdown"
        className={styles.countdown}
        style={{ "--t": "5" }}
      ></div>
    </div>
  );
};

export const CountDownDemo2 = () => {
  const cref = React.useRef();
  const onReset = () => {
    const cla = Array.from(cref.current.classList);
    if (cla.includes(styles.start)) {
      cref.current.classList.remove(styles.start);
      setTimeout(() => {
        cref.current.classList.add(styles.start);
      }, 0);
    }
  };
  return (
    <div>
      <button onClick={onReset}>重置动画</button>
      <div
        ref={cref}
        id="countdown2"
        className={clx([styles.countdown2, styles.start])}
        style={{ "--t": "5" }}
      ></div>
    </div>
  );
};

export const CountDownDemo3 = () => {
  const cref = React.useRef();
  React.useEffect(() => {
    if(!getComputedStyle(document.documentElement).getPropertyValue('--mytimer')){
        window.CSS.registerProperty({
            name: "--mytimer",
            syntax: "<integer>",
            inherits: false,
            initialValue: 5
          });
    }
   
  }, []);
  const onReset = () => {
    const cla = Array.from(cref.current.classList);
    if (cla.includes(styles.start)) {
      cref.current.classList.remove(styles.start);
      setTimeout(() => {
        cref.current.classList.add(styles.start);
      }, 0);
    }
  };
  return (
    <div>
      <button onClick={onReset}>重置动画</button>
      <div
        ref={cref}
        id="countdown3"
        className={clx([styles.countdown3, styles.start])}
      ></div>
    </div>
  );
};

