/*
 * @Author: jiangxin
 * @Date: 2023-02-05 12:56:39
 * @Company: orientsec.com.cn
 * @Description:
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  mfsu: false,
  base: '/doc/componentdoc/',
  publicPath: '/doc/componentdoc/',
  outputPath:'build',
  themeConfig: {
    name: '猿极客',
    deviceWidth: 375,
    nav: [
      { title: '组件', link: '/components/agreement' },
      { title: 'hook', link: '/hook' },
      { title: '脚手架', link: '/cli/chiyoucli' },
    ],
    footer: false,
    logo: 'https://dumi-theme-chakra.deno.dev/dumi-theme-chakra-logo.png',
  },
  theme: { '@c-primary': '#359756' },
});
