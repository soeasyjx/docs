/*
 * @Author: jiangxin
 * @Date: 2022-08-14 10:31:18
 * @Company: orientsec.com.cn
 * @Description:
 */
const baseSidebar = require("./sidebars/baseSidebar");
const toolFragmentSidebar = require("./sidebars/toolFragmentSidebar");
const microSidebar = require("./sidebars/microSidebar");
const compileSidebar = require("./sidebars/compileSidebar");
const graphicsSidebar = require("./sidebars/graphicsSidebar");
const typescriptSidebar = require("./sidebars/typescriptSidebar");
const nodeSidebar = require("./sidebars/nodeSidebar");
console.log("nodeSidebar", nodeSidebar);
module.exports = {
  baseSidebar: [
    // {
    //   id: "main",
    //   type: "doc",
    //   label: "测试用的"
    // },
    {
      type: "category",
      label: "javascript",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [...baseSidebar.js]
    },
    {
      type: "category",
      label: "html",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [...baseSidebar.html]
    },
    {
      type: "category",
      label: "css",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [...baseSidebar.css]
    },
    {
      type: "category",
      label: "其它",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [...baseSidebar.webother]
    }
  ],
  toolFragmentSidebar: [
    // {
    //   id: "toolfragmentmain",
    //   type: "doc",
    //   label: "11111"
    // },
    {
      type: "category",
      label: "javascript",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [...toolFragmentSidebar.items]
    },
    {
      type: "category",
      label: "css",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [...toolFragmentSidebar.cssitems]
    },
    {
      type: "category",
      label: "其它",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [...toolFragmentSidebar.otheritems]
    }
  ],
  nodeSidebar: [
    {
      type: "category",
      label: "基础",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        description: '记录node有关的知识点',
        title: "目录总览"
      },
      items: nodeSidebar
    }
  ],
  //   microSidebar: [
  //     {
  //       id: "microMain",
  //       type: "doc",
  //       label: "11111"
  //     },
  //     {
  //       type: "category",
  //       label: "qiankun",
  //       link: {
  //         type: "generated-index",
  //         title: "目录总览"
  //       },
  //       items: [...microSidebar.qiankun]
  //     }
  //   ],
  compileSidebar: [
    {
      id: "compile/index",
      type: "doc",
      label: "模块化发展"
    },
    {
      id: "compile/browserslist",
      type: "doc"
    },
    {
      type: "category",
      label: "babel",
      collapsible: false,
      collapsed: false,
      items: [...compileSidebar.babel]
    },
    // {
    //   type: "category",
    //   label: "esbuild",
    //   collapsible: true,
    //   collapsed: false,
    //   items: [...compileSidebar.esbuild]
    // },
    {
      type: "category",
      label: "rollup",
      collapsible: false,
      collapsed: false,
      items: [...compileSidebar.rollup]
    },
    {
      type: "category",
      label: "father",
      collapsible: true,
      collapsed: false,
      items: [...compileSidebar.father]
    },
    {
      type: "category",
      label: "webpack",
      collapsible: false,
      collapsed: false,
      items: [...compileSidebar.webpack]
    },
    {
      type: "category",
      label: "workspace",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        title: "目录总览"
      },
      items: [...compileSidebar.workspace]
    },
    {
      type: "category",
      label: "changesets",
      collapsible: true,
      collapsed: false,
      items: [...compileSidebar.changesets]
    }
  ]
  // nodeSidebar: [{type: 'autogenerated', dirName: '.'}],
  //   docs: [{type: 'autogenerated', dirName: '.'}],
};

