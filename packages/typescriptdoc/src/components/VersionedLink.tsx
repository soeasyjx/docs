/*
 * @Author: jiangxin
 * @Date: 2022-08-18 15:30:31
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";

const VersionedLink = ({ to, ...props }) => (
  <BrowserOnly>{() => <Link to={`/${to}`} {...props} />}</BrowserOnly>
);

export default VersionedLink;

