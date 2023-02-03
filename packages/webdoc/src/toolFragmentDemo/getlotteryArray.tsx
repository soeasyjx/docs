/*
 * @Author: jiangxin
 * @Date: 2022-09-06 09:06:40
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";

import "./getlotteryArray.scss";

const randomNumber = (min: number, max: number) => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min + "";
  return num.padStart(2, "0");
};

enum LuckTypeEnum {
  "双色球",
  "大乐透"
}

interface IRandomIntArrayInRangeParams {
  min: number;
  max: number;
  length: number;
  type: LuckTypeEnum;
}

const randomIntArrayInRange = (
  count: number,
  redball: IRandomIntArrayInRangeParams
) => {
  const res = new Array<number[]>();
  for (let index = 0; index < count; index++) {
    const numberarr = new Array<number>();
    while (numberarr.length < redball.length) {
      const num = randomNumber(redball.min, redball.max);

      if (numberarr.includes(num)) continue;

      numberarr.push(num);
    }
    numberarr.sort((prev, current) => prev - current);

    if (redball.type == LuckTypeEnum.双色球) {
      const blueball = randomNumber(1, 16);
      numberarr.push(blueball);
    }

    if (redball.type == LuckTypeEnum.大乐透) {
      const blues: Array<number> = [];

      for (let index = 0; index < 2; index++) {
        const num = randomNumber(1, 12);
        if (blues.includes(num)) {
          index--;
          console.log("存在相同的数字");
          continue;
        }

        blues.push(num);
      }
      blues.sort((a, b) => a - b);
      //   const blueball1 = randomNumber(1, 12);
      //   const blueball2 = randomNumber(1, 12);
      //   const blues = [blueball1, blueball2].sort((a, b) => a - b);
      numberarr.push(...blues);
    }

    res.push(numberarr);
  }

  return res;
};

const Flag = (props: { className?: string; children: number }) => {
  return (
    <span className={"flag " + (props.className ?? "")}>{props.children}</span>
  );
};

export const GetlotteryArrayDemo = () => {
  const [nums, setNums] = React.useState<number[][]>([]);
  const restHandle = () => {
    setNums(
      randomIntArrayInRange(4, {
        min: 1,
        max: 33,
        length: 6,
        type: LuckTypeEnum.双色球
      })
    );
  };
  return (
    <>
      <input type="button" value="点击获取您的幸运号" onClick={restHandle} />
      {nums.map((item) => {
        return (
          <div className="lotterypanel">
            {item.map((num, index) => {
              const className = ++index == item.length ? "blue" : "";
              return <Flag className={className}>{num}</Flag>;
            })}
          </div>
        );
      })}
    </>
  );
};

export const GetlotteryArrayDemo2 = () => {
  const [nums, setNums] = React.useState<number[][]>([]);
  const restHandle = () => {
    setNums(
      randomIntArrayInRange(1, {
        min: 1,
        max: 35,
        length: 5,
        type: LuckTypeEnum.大乐透
      })
    );
  };
  return (
    <>
      <input type="button" value="点击获取您的幸运号" onClick={restHandle} />
      {nums.map((item) => {
        return (
          <div className="lotterypanel">
            {item.map((num, index) => {
              const className =
                index === item.length - 1 || index === item.length - 2
                  ? "blue"
                  : "";
              return <Flag className={className}>{num}</Flag>;
            })}
          </div>
        );
      })}
    </>
  );
};

