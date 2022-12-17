/*
 * @Author: jiangxin
 * @Date: 2022-08-19 10:31:05
 * @Company: orientsec.com.cn
 * @Description:
 */
module.exports = {
  babel: [
    "compile/babel/base",
    "compile/babel/pluginPreset",
    "compile/babel/config",
    "compile/babel/babeldemo1"
  ],
  //   esbuild: ["compile/esbuild/base"],
  rollup: [
    "compile/rollup/base",
    "compile/rollup/advanced1",
    "compile/rollup/advanced2",
    "compile/rollup/advanced3"
  ],
  father: [
    "compile/father/base",
    "compile/father/advanced1",
    "compile/father/advanced2"
  ],
  webpack: [
    "compile/webpack/base",
    "compile/webpack/advanced1",
    "compile/webpack/advanced2",
    "compile/webpack/advanced3",
    "compile/webpack/advanced4",
    "compile/webpack/advanced5",
    "compile/webpack/advanced6",
    "compile/webpack/advanced7",
    "compile/webpack/advanced8",
    "compile/webpack/advanced9"
  ],
  browserslist: ["compile/browserslist"],
  workspace: [
    "compile/workspace/base",
    "compile/workspace/npm",
    "compile/workspace/pnpm",
    // "compile/workspace/lerna"
  ],
  changesets: ["compile/changesets/base", "compile/changesets/advanced1"]
};

