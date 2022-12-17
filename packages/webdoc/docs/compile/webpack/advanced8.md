---
title: 进阶-实战6(多配置文件)
---

development(开发环境) 和 production(生产环境) 这两个环境下的构建目标存在着巨大差异。在开发环境中，我们需要：强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。而生产环境目标则转移至其他方面，关注点在于压缩 bundle、更轻量的 source map、资源优化等，通过这些优化方式改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置

虽然，以上我们将 生产环境 和 开发环境 做了细微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个 "common(通用)" 配置。为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。此工具会引用 "common" 配置，因此我们不必再在环境特定(environment-specific)的配置中编写重复代码

## [webpack-merge](https://github.com/survivejs/webpack-merge)

```bash
pnpm add webpack-merge -D
```

## 调整目录结构

在根目录分别创建如下文件：

- [webpack.common.js](/compile/webpack/advanced8#webpackcommonjs)：通用配置
- [webpack.dev.js](/compile/webpack/advanced8#webpackdevjs)：开发环境配置文件 (serve/build)
- [webpack.prod.js](/compile/webpack/advanced8#webpackprodjs)：生产环境配置文件 (build)
- [webpack.config.js](/compile/webpack/advanced8#webpackconfigjs)：webpack默认配置文件(入口配置)

你可以分的更细一些比如，在上面的基础上再添加：

- webpack.dev.build.js
- webpack.prod.build.js

**这里为了演示就不弄的这么麻烦了**

## webpack.common.js

有哪些属性属于公共配置，需要大伙自己根据项目实际进行分析

公共属性：
`entry`，`output`，`module`，`resolve`

```js title=webpack.common.js
const currentScript = process.env.npm_lifecycle_event;

// filename:业务名称
// env:开发[dev]/生产[prod]
// action:动作 serve/build
const {
  groups: { filename, env, action = "serve" }
} = currentScript?.match?.(
  /(?<filename>\w+-{1}\w+)-{1}(?<env>\w+)(:{1}(?<action>\w+))?/i
);

module.exports = () => {
  return {
    entry: {
      [filename]: { import: `./src/${filename}/index.jsx` }
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, "dist/", filename),
      filename: "app-[contenthash:16].js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          loader: "babel-loader"
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: "asset"
        }
      ]
    },
    resolve: {
      extensions: [".jsx", "..."]
    }
  };
};
```

## webpack.dev.js

开发环境，我们要区分是打包(build)还是启动服务(serve)

**dev-serve**

mode:development  
devtool:cheap-module-source-map

**dev-build**

mode:production  
devtool:hidden-source-map

:::tip
`devtool`这个属性还是非常有用的，我们的业务代码经过webpack处理后可读性已经非常不好了，需要调试代码就不太方便了，合理的设置devtool能够利用浏览器给我们提供的源码映射功能，方便代码调试，在生产环境或者测试环境我们则不需要这种映射源码的能力，只需要生成sourcemap即可，sourcemap其实就是告诉浏览器打包后的代码所对应源码的位置，为以后生成问题的排查提供一种思路
:::

```js title=webpack.dev.js
const webpack = require("webpack");
const { getDevConfig } = require("./utils/index");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlScriptPlugin = require("./utils/htmlscriptplugin");

const currentScript = process.env.npm_lifecycle_event;

// filename:业务名称
// env:开发[dev]/生产[prod]
// action:动作 serve/build
const {
  groups: { filename, env, action = "serve" }
} = currentScript?.match?.(
  /(?<filename>\w+-{1}\w+)-{1}(?<env>\w+)(:{1}(?<action>\w+))?/i
);

const getPlugins = () => {
  if (action === "build") {
    return [
      new webpack.DefinePlugin({
        INJECTWINDOW: `function(){
                    var currentenv=localStorage.getItem('SERVICEENV');
                    var SERVICEENV=currentenv?currentenv:${JSON.stringify(
                      process.env.SERVICE_ENV ?? "mock"
                    )};
                    console.log(SERVICEENV);
                    window.localStorage.setItem('SERVICEENV',SERVICEENV)
                    window.DEVCONFIG=${JSON.stringify(
                      getDevConfig(env, action)
                    )}
                }`
      }),
      new HtmlScriptPlugin()
    ];
  }

  if (action === "serve") {
    return [
      new webpack.DefinePlugin({
        INJECTWINDOW: `function(){
                var SERVICEENV=${JSON.stringify(
                  process.env.SERVICE_ENV ?? "mock"
                )}
                  console.log(SERVICEENV);
                  window.localStorage.setItem('SERVICEENV',SERVICEENV)
                  window.DEVCONFIG=${JSON.stringify(getDevConfig(env, action))}
    
            }`
      })
    ];
  }
};

module.exports = (env) => {
  const { WEBPACK_BUNDLE = false, WEBPACK_SERVE = false } = env;
  let devtool = "";
  let mode = "";
  if (WEBPACK_SERVE) {
    devtool = "cheap-module-source-map";
    mode = "development";
  }
  if (WEBPACK_BUNDLE) {
    devtool = "hidden-source-map";
    mode = "production";
  }
  return {
    mode,
    devtool,
    devServer: {
      open: `${filename}/index.html`,
      host: "0.0.0.0",
      devMiddleware: {
        publicPath: `/${filename}`
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        inject: "body"
      }),
      ...getPlugins()
    ]
  };
};
```

## webpack.prod.js

至于生成环境的配置，就没有那么多可变性了，很多属性值都可以直接写死

```js title=webpack.prod.js
const webpack = require("webpack");
const { getDevConfig } = require("./utils/index");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const currentScript = process.env.npm_lifecycle_event;

// filename:业务名称
// env:开发[dev]/生产[prod]
// action:动作 serve/build
const {
  groups: { filename, env, action = "serve" }
} = currentScript?.match?.(
  /(?<filename>\w+-{1}\w+)-{1}(?<env>\w+)(:{1}(?<action>\w+))?/i
);

const getPlugins = () => {
    console.log('action',action)
  if (action === "build") {
    return [
      new webpack.DefinePlugin({
        INJECTWINDOW: `function(){
                        window.localStorage.setItem('SERVICEENV','prod')
                        window.DEVCONFIG=${JSON.stringify(
                          getDevConfig(env, action)
                        )}
                    }`
      })
    ];
  }
};

module.exports = () => {
  return {
    mode: "production",
    devtool:"hidden-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        inject: "body"
      }),
      ...getPlugins()
    ]
  };
};

```

## webpack.config.js

webpack默认配置文件，则是对其他三个配置文件的动态引入 ，根据一些条件来创建最终的配置对象

```js title=webpack.config.js
const commonconfig = require("./webpack.common");
const devconfig = require("./webpack.dev");
const prodconfig = require("./webpack.prod");

const { mergeWithCustomize } = require("webpack-merge");

const currentScript = process.env.npm_lifecycle_event;

// filename:业务名称
// env:开发[dev]/生产[prod]
// action:动作 serve/build
const {
  groups: { filename, env, action = "serve" }
} = currentScript?.match?.(
  /(?<filename>\w+-{1}\w+)-{1}(?<env>\w+)(:{1}(?<action>\w+))?/i
);

const _merge = mergeWithCustomize({
  customizeArray(a, b, key) {
    if (key === "plugins") {
      return b;
    }
    // Fall back to default merging
    return undefined;
  }
});

module.exports = (...arg) => {
  // 开发环境
  if (env === "dev") {
    return _merge(commonconfig(), devconfig(...arg));
  }

  // 生产环境
  if (env === "prod") {
    return _merge(commonconfig(), prodconfig(...arg));
  }
};


```

好了，代码没什么好讲的，主要是思路的分享