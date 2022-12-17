---
title: 进阶-引入第三方样式库
---

在接下来的几篇文章中，我们会尝试引入一些比较流行的第三方库，来协助我们进行业务方面的开发

在实现的业务分开中必然会写很多的样式，像：居中，定位，动画等等，这样样式如何我们自己从头到尾一个一个写，必然会浪费很多时间，而且也会造成样式不可复用性，因此我们会需要借助一些第三方样式库来做我们的基础样式，这样不仅可以健壮我们的项目，且可以很多好的复用样式，提高开发的效率，优秀的第三方库在兼容性方面也是做的很好的，我们没有必要自己去处理这一问题

## 基础样式库

- [tailwindcss](https://www.tailwindcss.cn/)
- [Bootstrap](https://www.bootcss.com/)

这里我们选择`tailwindcss`

## 安装

```bash
pnpm add tailwindcss@latest -D
```

## postcss.config.js

在配置文件中引入`tailwindcss` 插件

```js
module.exports = {
  // Add you postcss configuration here
  // Learn more about it at https://github.com/webpack-contrib/postcss-loader#config-files
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

## tailwind.config.js

如果您想要自定义您的 Tailwind 安装，可以使用 Tailwind CLI 工具生成一份配置文件，这个命令行工具已包含在了 tailwindcss 这个 npm 包里了

```bash
npx tailwindcss init
```

这将会在您的工程根目录创建一个最小的 `tailwind.config.js` 文件

```js title=tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
};
```

## 引入样式
在我们的业务入口脚本或者入口样式中引用tailwind作为我们的基础样式

### 入口脚本
```js
import "tailwindcss/tailwind.css"
```

### 入口样式
```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

任选其中一种引入方式，即可成功接入tailwindcss，剩下的就是对tailwindcss样式的使用了，这里就不说了，可以自行去官网查看