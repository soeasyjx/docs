// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "typescript",
  tagline: "Dinosaurs are cool",
  url: "https://your-docusaurus-test-site.com",
  //   baseUrl:'/typescriptdoc/',
  baseUrl: "/typescriptdoc/",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  projectName: "typescript", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: "zh-CN",
      locales: ["zh-CN"]
    },
  plugins: ["docusaurus-plugin-sass"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          //   docItemComponent: require.resolve(
          //     "./src/components/CustomDocItem/index.tsx"
          //   )
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.scss")
        }
      })
    ],
    [
      "docusaurus-preset-shiki-twoslash",
      {
        themes: ["min-light", "nord"],
        languages:["Python","powershell","node"],
        ignoreCodeblocksWithCodefenceMeta: ["live"]
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["http", "nginx"]
      },
      navbar: {
        title: "Typescript",
        // logo: {
        //   alt: "My Site Logo",
        //   src: "img/logo.svg"
        // },
        items: [
          {
            href: "https://github.com/soeasyjx/docs.git",
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          }
        ]
      },
      //   footer: {
      //     style: 'dark',
      //     links: [
      //       {
      //         title: 'Docs',
      //         items: [
      //           {
      //             label: 'Tutorial',
      //             to: '/docs/intro',
      //           },
      //         ],
      //       },
      //       {
      //         title: 'Community',
      //         items: [
      //           {
      //             label: 'Stack Overflow',
      //             href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //           },
      //           {
      //             label: 'Discord',
      //             href: 'https://discordapp.com/invite/docusaurus',
      //           },
      //           {
      //             label: 'Twitter',
      //             href: 'https://twitter.com/docusaurus',
      //           },
      //         ],
      //       },
      //       {
      //         title: 'More',
      //         items: [
      //           {
      //             label: 'Blog',
      //             to: '/blog',
      //           },
      //           {
      //             label: 'GitHub',
      //             href: 'https://github.com/facebook/docusaurus',
      //           },
      //         ],
      //       },
      //     ],
      //     copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      //   },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true
        }
      }
    })
};

module.exports = config;

