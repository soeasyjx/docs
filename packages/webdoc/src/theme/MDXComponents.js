/*
 * @Author: jiangxin
 * @Date: 2022-08-15 16:22:53
 * @Company: orientsec.com.cn
 * @Description: 
 */
import React from 'react';
// 导入原映射
import MDXComponents from '@theme-original/MDXComponents';
import BrowserWindow from '@site/src/components/BrowserWindow';

export default {
  // 复用默认的映射
  ...MDXComponents,
  // 把 "highlight" 标签映射到我们的 <Highlight /> 组件！
  // `BrowserWindow` 会收到在 MDX 中被传递给 `highlight` 的所有 props
  BrowserWindow: BrowserWindow,
};