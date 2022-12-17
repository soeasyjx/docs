/*
 * @Author: jiangxin
 * @Date: 2022-10-29 16:29:28
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";
import styles from "./styles.module.scss";

export const MultipleAnimationsDemo = () => {
  const cref = React.useRef();
  const onReset = () => {
    const cla = Array.from(cref.current.classList);
    if (cla.includes(styles.multipleanimations)) {
      cref.current.classList.remove(styles.multipleanimations);
      setTimeout(() => {
        cref.current.classList.add(styles.multipleanimations);
      }, 0);
    }
  };
  return (
    <React.Fragment>
      <input type="button" value="重置动画" onClick={onReset}/>
      <div ref={cref} className={styles.multipleanimations}>
        Multiple animationsMultiple animationsMultiple animationsMultiple
        animationsMultiple animationsMultiple animations
      </div>
    </React.Fragment>
  );
};

