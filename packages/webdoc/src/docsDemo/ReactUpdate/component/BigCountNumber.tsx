/*
 * @Author: jiangxin
 * @Date: 2022-08-25 16:16:10
 * @Company: orientsec.com.cn
 * @Description: 
 */
import React from 'react';
function BigCountNumber({ count }) {
    return (
      <p>
        <span className="prefix">Count:</span>
        {count}
      </p>
    );
  }
  
  export default BigCountNumber;