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
  //   baseUrl: "/",
  baseUrl: "/doc/webdoc/",
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
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg"
        },
        items: [
          {
            type: "doc",
            docId: "javascript/jsonp",
            position: "left",
            label: "前端技术"
          },
          {
            type: "doc",
            docId: "toolFragment/javascript/jstool1",
            label: "工具代码",
            position: "left"
          },
          {
            type: "dropdown",
            label: "前端大杂烩",
            items: [
              { href:"http://easycli.cn:8891/doc/typescriptdoc/category/%E7%AE%80%E4%BB%8B", label: "TypeScript" },
            //   { to: "/node/aaa", label: "Node" },
            //   { to: "/node/aaa", label: "svg/canvas" },
              //   { type: "doc",docId: "compile/index", label: "打包编译" },
              { to: "compile", label: "打包编译" },
            //   {
            //     type: "doc",
            //     docId: "微前端/qiankun/entry",
            //     label: "微前端"
            //   }
            ]
          },
          {
            href: "https://gitee.com/soeasyjx/docs.git",
            label: "gitee",
            position: "right"
          }
        ]
      },
      //   autoCollapseSidebarCategories: true,
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

