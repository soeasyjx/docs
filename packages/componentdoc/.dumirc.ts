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
//   styles: [
//     `
//     .dumi-default-sidebar {
//       min-width: 260px;
//     }
//     .dumi-default-previewer-demo {
//       min-height: 580px;
//       max-height: 580px;
//       display: flex;
//       overflow: auto;
//       flex-direction: column;
//     }
//     .dumi-default-previewer-demo > iframe {
//       height: 100%!important;
//       flex:1;
//     }
//     .dumi-default-header:not([data-static]){
//       border-bottom: 1px solid #ddd;
//     }
//     .dumi-default-header-left {
//       min-width: 230px;
//       margin-right: 32px;
//   }
//   `,
//   ],
  themeConfig: {
    name: '猿极客',
    deviceWidth: 375,
    nav: [
      { title: '组件', link: '/components/agreement' },
      { title: 'hook', link: '/hook' },
      { title: '脚手架', link: '/cli/chiyoucli' },
    ],
    // sidebar:{
    //     '/components': [
    //         {
    //           title: '架构设计',
    //           children: [
    //             {
    //               title: 'Components - 组件设计',
    //               link: 'components',
    //             },
    //             {
    //               title: 'Schema - 通用配置',
    //               link: '/components/agreement',
    //             },
    //           ],
    //         },
            // {
            //   title: '布局',
            //   children: [
            //     {
            //       title: 'ProLayout - 高级布局',
            //       link: '/components/layout',
            //     },
            //     {
            //       title: 'PageContainer - 页容器',
            //       link: '/components/page-container',
            //     },
            //     {
            //       title: 'ProCard - 高级卡片',
            //       link: '/components/card',
            //     },
            //     {
            //       title: 'WaterMark - 水印组件',
            //       link: '/components/water-mark',
            //     },
            //     {
            //       title: 'StatisticCard - 指标卡',
            //       link: '/components/statistic-card',
            //     },
            //     {
            //       title: 'CheckCard - 多选卡片',
            //       link: '/components/check-card',
            //     },
            //   ],
            // },
            // {
            //   title: '数据录入',
            //   children: [
            //     {
            //       title: 'ProForm - 高级表单',
            //       link: '/components/form',
            //     },
            //     {
            //       title: 'ProFormFields - 表单项',
            //       link: '/components/field-set',
            //     },
            //     {
            //       title: 'ProFormList - 数据结构化',
            //       link: '/components/group',
            //     },
            //     {
            //       title: 'ProFormDependency - 数据联动',
            //       link: '/components/dependency',
            //     },
            //     {
            //       title: 'Schema Form - JSON 表单',
            //       link: '/components/schema-form',
            //     },
            //     {
            //       title: ' Query/LightFilter - 筛选表单',
            //       link: '/components/query-filter',
            //     },
            //     {
            //       title: 'StepsForm - 分步表单',
            //       link: '/components/steps-form',
            //     },
            //     {
            //       title: 'Modal/Drawer - 浮层表单',
            //       link: '/components/modal-form',
            //     },
            //     {
            //       title: 'LoginForm/Page - 登录表单',
            //       link: '/components/login-form',
            //     },
            //   ],
            // },
            // {
            //   title: '数据展示',
            //   children: [
            //     {
            //       title: 'ProTable - 高级表格',
            //       link: '/components/table',
            //     },
            //     {
            //       title: 'EditableProTable - 可编辑表格',
            //       link: '/components/editable-table',
            //     },
            //     {
            //       title: ' DragSortTable - 拖动排序表格',
            //       link: '/components/drag-sort-table',
            //     },
            //     {
            //       title: 'ProList - 高级列表',
            //       link: '/components/list',
            //     },
            //     {
            //       title: 'ProDescriptions - 定义列表',
            //       link: '/components/descriptions',
            //     },
            //   ],
            // },
            // {
            //   title: '通用',
            //   children: [
            //     {
            //       title: 'ProSkeleton - 骨架屏',
            //       link: '/components/skeleton',
            //     },
            //     {
            //       title: 'ProField - 原子组件',
            //       link: '/components/field',
            //     },
            //   ],
            // },
    //       ],
    // },
    footer: false,
    logo: 'https://dumi-theme-chakra.deno.dev/dumi-theme-chakra-logo.png',
  },
  theme: { '@c-primary': '#359756' },
});
