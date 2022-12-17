/*
 * @Author: jiangxin
 * @Date: 2022-08-15 14:55:16
 * @Company: orientsec.com.cn
 * @Description:
 */

import React from "react";
import styles from "./styles.module.css";

const Demo = () => {
  const textmap = React.useRef(
    new Map([
      [
        1,
        {
          text: "表达式# 1 ：整个表达式",
          subText: "这段代码本身就是一个表达式，输出的结果为:12"
        }
      ],
      [
        2,
        {
          text: "表达式# 2 ：(5+1)",
          subText:
            "这段代码也是一个表达式，由于有括号存在，这段表达式，将首先进行计算，输出的结果为：6"
        }
      ],
      [
        3,
        {
          text: "表达式# 3：5",
          subText: "单个数字5也是一个表达式，它将产生一个值，输出的结果为：5"
        }
      ],
      [
        4,
        {
          text: "表达式# 4 ：1",
          subText: "同单个数字5一样，这也是一个表达式，输出的结果为：1"
        }
      ],
      [
        5,
        {
          text: "表达式# 1 ：2",
          subText:
            "同单个数字5一样，这也是一个表达式，跟前面的数字一起组成了最终的表达式，输出的结果为：2"
        }
      ]
    ])
  );
  const [rangeValue, setRangeValue] = React.useState(0);
  const onRangeChange = (e) => {
    setRangeValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.demo}>
        <span className={"chunk_1 " + (rangeValue == "1" ? styles.select : "")}>
          <span
            className={"chunk_2 " + (rangeValue == "2" ? styles.select : "")}
          >
            （
            <span
              className={"chunk_3 " + (rangeValue == "3" ? styles.select : "")}
            >
              5
            </span>
            +
            <span
              className={"chunk_4 " + (rangeValue === "4" ? styles.select : "")}
            >
              1
            </span>
            ）
          </span>
          *
          <span
            className={"chunk_5 " + (rangeValue === "5" ? styles.select : "")}
          >
            2
          </span>
        </span>
      </h3>
      <div className={styles.input}>
        <div className={styles.inputrangetext}>#{rangeValue}</div>
        <input
          className={styles.inputrange}
          type="range"
          value={rangeValue}
          max={5}
          step={1}
          onChange={onRangeChange}
        />
        <div>{textmap.current.get(Number.parseInt(rangeValue))?.text}</div>
        <div>{textmap.current.get(Number.parseInt(rangeValue))?.subText}</div>
      </div>
    </div>
  );
};

export default Demo;
