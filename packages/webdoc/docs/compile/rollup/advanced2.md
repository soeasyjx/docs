---
title: 进阶-lodash
---

## 前言
当我们开发一个库的时候，难免会使用到第三方库，现在就以使用[lodash](https://www.lodashjs.com/)为例，看看如果在项目中使用了第三库，我们应该如何正确的配置rollup

## 目录结构调整
为了方便接下去库的本地测试工作，我们现将目录结构调整一下，使用[workspace](/category/workspace)目录结构，调整后的结构如下
```tree
rollup-project
├── examples
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
├── package.json
├── packages
│   ├── rollup-lodash-demo
│   └── rollup-simple-demo
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```
examples：库测试项目，便于测试我们开发的库，直接使用[`npx create-react-app`](https://create-react-app.bootcss.com/)创建即可
packages：库开发目录

## 内部lodash

```bash
pnpm add lodash -w

pnpm add @rollup/plugin-node-resolve @rollup/plugin-commonjs -w -D
```
需要额外安装`@rollup/plugin-node-resolve`和`@rollup/plugin-commonjs` 依赖，安装在根目录就可以了，以后再继续添加子项目可以直接使用，不需要再安装

-w：将依赖包安装在根目录中的node_modules中，这里需要主意一下，我们写在packages工作空间下的库，一般只需要添加peerDependency，不需要node_modules 这里要非常注意，我是发布后才发现的问题

### 添加测试代码
```js {1,4} title=src/index.js
import _ from "lodash";

export const myMap = () => {
  const maparr = _.map([1, 2, 3], (m) => {
    return m * 2;
  });

  return maparr;
};
```

### 执行打包
```bash
pnpm build-lodash
```
### 结果
打包后我们可以从`dist`文件夹中可以看到，lodash已经被全量打包到我们的bundle.js中，这不是我们想要的结果，如果我们在项目中使用了类似lodash这样的第三方库，我们正确的做法应该，将其实添加到[peerDependency](https://www.jianshu.com/p/e5b0f9515b3d)依赖中，让使用我们库的人来安装它(lodash)，

## 外部化lodash

### 安装lodash
```bash
pnpm add lodash -w
```
[--save-peer](https://pnpm.io/zh/cli/add#--save-peer)：将依赖写入peerDependency属性
### 修改rollup.config.js
```js
export default {
  input: "src/index.js",
  output: [
    {
      name: "mymap",
      file: "dist/bundle.js",
      format: "es",
    },
    {
      name: "mymap",
      file: "dist/bundle.iife.js",
      format: "iife",
      globals: {
        lodash: 'lodash'
      }
    }
  ],
  external:["lodash"],
};
```
> 注意如果输出的文件类型有`iife`还需要为其指定一个全局的名称

[external](https://www.rollupjs.org/guide/en/#external)：外部依赖

### 执行打包
```bash
pnpm build-lodash
```

### 结果
```js
import _ from 'lodash';

const myMap = () => {
  const maparr = _.map([1, 2, 3], (m) => {
    return m * 2;
  });

  return maparr;
};

export { myMap };
```
可以看到打包后的代码还是非常干净的，lodash并没有被打入到库中，而是做为了一个外部依赖

## 本地测试
得益于我们将项目结构调整为了workspace，因此测试`rollup-lodash-demo`非常的方便

### examples安装依赖
```bash
pnpm --filter examples add rollup-lodash-demo
```

:::caution
这里有一个问题需要注意一下，如果examples跟库在同一个根目录下，通过pnpm add rollup-lodash-demo --filter 安装的依赖，总是会使用packages/rollup-lodash-demo本地库，即使使用pnpm add rollup-lodash-demo 也是一样不会多npm register中去安装，如果需要从npm去安装，是需要使用**pnpm add father-lodash-demo --filter=example --link-workspace-packages=false**

[link-workspace-packages](https://pnpm.io/zh/npmrc#link-workspace-packages)
:::

## 思考
那么是不是所有的库都做为外部依赖呢，其实不然，应该当按具体情况来分析了，像react，vue这样的前端UI渲染库，体积大，肯定是做为外部依赖了，而一些很小的库，只有几KB，其实就没有必要做为外部依赖，直接打入到库即可