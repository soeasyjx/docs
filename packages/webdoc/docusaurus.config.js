/*
 * @Author: jiangxin
 * @Date: 2022-08-14 10:15:21
 * @Company: orientsec.com.cn
 * @Description:
 */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/vsLight");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "前端猿客",
  tagline: "Dinosaurs are cool",
  url: "https://your-docusaurus-test-site.com",
    // baseUrl: "/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "hasura",
  projectName: "graphql-engine",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  //   organizationName: "facebook", // Usually your GitHub org/user name.
  //   projectName: "docusaurus", // Usually your repo name.
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN"]
  },
  plugins: ["docusaurus-plugin-sass", "@docusaurus/theme-live-codeblock"],
//   themes: [
//     [
//       require.resolve("@easyops-cn/docusaurus-search-local"),
//       {
//         // ... Your options.
//         // `hashed` is recommended as long-term-cache of index file is possible.
//         hashed: true
//         // For Docs using Chinese, The `language` is recommended to set to:
//         // ```
//         // language: ["en", "zh"],
//         // ```
//       }
//     ]
//   ],
  //   themes: ["@docusaurus/theme-search-algolia"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          docItemComponent: require.resolve(
            "./src/components/CustomDocItem/index.tsx"
          ),
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }]
          ]
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.scss")
        }
      })
    ]
    // [
    //     "docusaurus-preset-shiki-twoslash",
    //     {
    //       themes: ["min-light", "nord"]
    //     }
    //   ]
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      colorMode: {
        // defaultMode: "dark",
        //   disableSwitch: false,
        respectPrefersColorScheme: true
      },
      //   image:
      //     "https://graphql-engine-cdn.hasura.io/assets/hge-docs/og-image.png",
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["http", "nginx"]
      },
      navbar: {
        title: "猿极客",
        // logo: {
        //   alt: "My Site Logo",
        //   src: "img/logo.svg"
        // },
        items: [
          {
            type: "doc",
            docId: "javascript/jsonp",
            position: "left",
            label: "前端技术"
          },
          {
            type: "doc",
            docId: "compile/index",
            position: "left",
            label: "编译相关"
          },
          {
            type: "doc",
            docId: "toolFragment/javascript/jstool1",
            label: "工具代码",
            position: "left"
          },
          {
            type: "doc",
            docId: "node/node1",
            label: "node",
            position: "left"
          },
          {
            // type:"doc",
            label: "组件",
            href: "http://easycli.cn/componentdoc/",
            position: "right"
          },
          {
            // type:"doc",
            label: "TS",
            href: "http://easycli.cn/typescriptdoc/category/%E7%AE%80%E4%BB%8B",
            position: "right"
          },
          //   {
          //     type: "dropdown",
          //     label: "前端大杂烩",
          //     items: [
          //       { href:"http://easycli.cn:8890/doc/typescriptdoc/category/%E7%AE%80%E4%BB%8B", label: "TypeScript" },
          //     //   { to: "/node/aaa", label: "Node" },
          //     //   { to: "/node/aaa", label: "svg/canvas" },
          //       //   { type: "doc",docId: "compile/index", label: "打包编译" },
          //       { to: "compile", label: "编译相关" },
          //     //   {
          //     //     type: "doc",
          //     //     docId: "微前端/qiankun/entry",
          //     //     label: "微前端"
          //     //   }
          //     ]
          //   },
          {
            type: "search",
            position: "right"
          },
          {
            href: "https://github.com/soeasyjx/docs.git",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository"
          }
        ]
      },
      //   autoCollapseSidebarCategories: true,
        algolia: {
          // Algolia 提供的应用 ID
          appId: "RJX07KU35V",

          //  公开 API 密钥：提交它没有危险
          apiKey: "56240d7fb5a3e6f9796c3749bffd535a",

          // indexName: 'indexwebdoc',
          indexName: "webdoc",
          contextualSearch: true,

          // // 可选：见下文
          // contextualSearch: true,

          // // 可选：声明哪些域名需要用 window.location 型的导航而不是 history.push。 适用于 Algolia 配置会爬取多个文档站点，而我们想要用 window.location.href 在它们之间跳转时。
          // externalUrlRegex: 'external\\.com|domain\\.com',

          // // 可选：Algolia 搜索参数
          // searchParameters: {},

          // // 可选：搜索页面的路径，默认启用（可以用 `false` 禁用）
          searchPagePath: "search"
        },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true
        }
      }
      //   prism: {
      //     theme: lightCodeTheme,
      //     darkTheme: darkCodeTheme
      //   }
    }
};

module.exports = config;

