/*
 * @Author: jiangxin
 * @Date: 2022-09-22 13:31:44
 * @Company: orientsec.com.cn
 * @Description:
 */
/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  baseSidebar: [
    {
      type: "category",
      label: "简介",
      collapsible: false,
      collapsed: true,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: ["introduction/page1", "introduction/page2", "introduction/page3"]
    },
    {
      type: "category",
      label: "基础",
      collapsible: false,
      collapsed: true,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [
        "base/page1",
        "base/page2",
        "base/page3",
        "base/page4",
        "base/page5",
        "base/page6",
        "base/page7",
        "base/page8",
        "base/page9",
        "base/page10"
      ]
    },
    {
      type: "category",
      label: "进阶",
      collapsible: false,
      collapsed: true,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [
        "advanced/page1",
        "advanced/page2",
        "advanced/page3",
        "advanced/page4",
        "advanced/page5",
        "advanced/page6",
        "advanced/page7",
        "advanced/page8",
        "advanced/page9"
      ]
    },
    {
      type: "category",
      label: "工具",
      collapsible: false,
      collapsed: true,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: ["production/page1", "production/page2", "production/page3","production/page4"]
    },
    {
      type: "category",
      label: "新版本",
      collapsible: false,
      collapsed: true,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: ["new/ts4.9"]
    }
  ]
};

module.exports = sidebars;

