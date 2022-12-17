---
title: \**/*.js是啥语法
---

import Thumbnail from '@site/src/components/Thumbnail';

## 前言

有一种语法，大概知道它们是啥意思，但又不完全确定；问了好几个同事，大家都是一副 “差不多就是这个意思” 的态度

这个语法长这样：

```bash
node_modules

**/*.js

dist/**/package.json
```

常见吗？眼熟吗？
`.gitignore` 里、`.eslintignore` 里、 `jsconfig.json` 里、`webpack` 配置里、`vite` 配置里，`VSCode` 查找文件的“包含的文件”搜索框里…… ,甚至很多开发语言都支持它 像`PHP`、`Python`等等

<Thumbnail
  src='/myimage/webother3.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

“这玩意儿似乎无处不在，谁能告诉我它们是啥吗？有啥规范吗？暗下决心，一定要弄清楚这个细节，因为细节里往往藏着魔鬼。

不卖关子，先揭晓谜底：

这种语法叫 **glob**

## 起源

虽然 `glob` 语法在当前的前端项目里似乎无处不在，但它其实不是来源于 “前端”。甚至不是后端。
而是来源于 `linux`;

1975 年发行的 `Unix V6` 版本中，提供了一个安装路径为 `etc/glob` 的命令工具。
这个 `glob` 工具，允许使用者通过 **通配符** 来匹配目录和文件。

在后来的演进中，它开始渐渐成为 `linux shell` 的一部分，现在你几乎在所有的 `linux` 系统中都可以轻松快捷地使用它

因为其 “实用、好用”，所以渐渐出圈，因此，即便我们使用的是 windows，在前端项目里也有工具库可以轻松的解析这种语法

## 语法

有些人觉得：“这种语法只有一种语法，那就是写星号。”

其实这是对它最大的误解！人家可是有一套完善的规则的！

### 字符

| <div style={{width:"15vw"}}>字符</div> | 描述                                                           |
| -------------------------------------- | -------------------------------------------------------------- |
| \*                                     | 匹配任意长度任意字符                                           |
| \*\*                                   | 代表 0 或多个层级的目录                                        |
| ?                                      | 匹配任意单个字符                                               |
| [list]                                 | 匹配指定范围内（list）任意单个字符，也可以是单个字符组成的集合 |
| \[^list\]                              | 匹配指定范围外的任意单个字符或字符集合                         |
| [!list]                                | 同[\^list]                                                     |
| {str1,str2,...}                        | 匹配 srt1 或者 srt2 或者更多字符串，也可以是集合               |

### 专用字符集

- [:alnum:] 任意数字或者字母
- [:alpha:] 任意字母
- [:space:] 空格
- [:lower:] 小写字母
- [:digit:] 任意数字
- [:upper:] 任意大写字母
- [:cntrl:] 控制符
- [:graph:] 图形
- [:print:] 可打印字符
- [:punct:] 标点符号
- [:xdigit:] 十六进制数
- [:blank:] 空白字符（未验证)

### 用例

先看看 `?` 和 `*`，这是最常用的

```glob
?.js

# 可以命中 a.js、b.js， 但无法命中 ab.js

*.js

# 可以命中 a.js、ab.js、b.js

a?.js

# 可以命中 a.js 和 ab.js
```

再看看 [...] 方括号匹配

```glob
[ab].js

# 只能匹配 a.js和b.js
# 不能匹配到 ab.js

*[ab].js

# 可以匹配到 a.js、b.js、ab.js、aba.js...
```

再看看 [!...] 和 [\^...]，这两种语法完全等价

```glob
[!a].js

# 匹配除了 `a.js` 以外的所有文件
```

再看看 {...} 大括号模式

```glob
b{u,i}g.js

# 可以命中 bug.js 和 big.js
```

最后看看 {a..b} 大括号范围模式

```glob
{1..3}.js

# 可以命中 1.js、2.js、3.js
```

ok！看到这里，你已经大概知道它们的核心语法了，现在遇到一些特定的需求时，你也可以轻松驾驭了。
那么，前端有哪些可以解析 glob 语法的库呢？

## [node-glob](https://github.com/isaacs/node-glob)

```bash npm2yarn
npm install glob -D
```

使用方式：

```js
var glob = require("glob");

glob("**/*.js", function (er, files) {
  // files 就是它模糊查找到的文件咯
});
```

通过前面三节的描述，要明白这个库的使用，丝毫不费吹灰之力，不是吗？

## [fast-glob](https://github.com/mrmlnc/fast-glob)

只看名字就知道，这是一款比 `node-glob` 速度更快的 `glob` 工具库

一些大家所熟知的比如 `eslint`、`vite` 等工具都是用了 `fast-glob` 作为依赖

```bash npm2yarn
npm install fast-glob -D
```

使用方式：

```js
const fg = require("fast-glob");

const entries = await fg([".editorconfig", "**/index.js"]);
```

## 参数资料

[glob 模式](http://t.zoukankan.com/divent-p-5762154.html)

[micromatch](https://github.com/micromatch)

## html 转义字符表

https://tool.oschina.net/commons?type=2