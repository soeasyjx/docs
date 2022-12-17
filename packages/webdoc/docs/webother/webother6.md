---
title: 前端脚手架开发-chiyou-cli
---

import Thumbnail from '@site/src/components/Thumbnail';

## 前言

一直都想学着开发自己的一个脚手架，像 create-react-app，ncu 一样的使用，输入一句命令，干活。

正好最近负责的运营平台有这方面的需求，我们公司的运营平台是基于 antd pro v5 来进行开发的  
通过<code>pro create business-name</code> 拉下模板后，还需要改一些代码来适应我们公司的特定需求，因此我的初衷中通过一个简单的全局命令来代替改代码的过程

## 需求分析

### 功能点

1. 问询功能
2. 下载模板
3. 写入模板
4. 优化

### 使用方式

1. 全局安装 `chiyoucli`
2. 有运营平台业务开发需求的同学，通过 `chiyoucli name` 命令来下载业务开发模板，当然这个业务模板，需要事先准备好，放到 git 仓库

## 开发

### 创建开发目录

```bash
cd test_project
mkdir chiyou-cli && cd chiyou-cli
```

### 初始化项目

下面的流程我们使用`pnpm` 来进行包的管理

#### 新建 package.json

```bash
pnpm init
```

#### 安装关键库

```bash
pnpm add chalk commander download-git-repo inquirer ora
```

#### [commander](https://github.com/tj/commander.js)

:::tip
Commander 是完整的 node 命令行解决方案, 编写代码来描述命令行界面。Commander 负责将参数解析为选项和命令参数，为问题显示使用错误，并实现一个有帮助的系统
:::

Commander 通过链式调用，有 option、argument、action 等常用方法，其中：

1. option 方法用来定义选项，同时可以附加选项的简介，每个选项可以定义一个短选项名称（-后面接单个字符）和一个长选项名称（--后面接一个或多个单词），使用逗号、空格或|分隔
2. aciton 方法添加命令， 第一个参数为命令名称，命令参数可以跟在名称后面，也可以用.argument()单独指定。参数可为必选的（尖括号表示）、可选的（方括号表示）或变长参数（点号表示，如果使用，只能是最后一个参数

```js
program.command("clone <source> [destination]");
```

3. argument 方法 在 Command 对象上使用.argument()来按次序指定命令参数。该方法接受参数名称和参数描述。参数可为必选的（尖括号表示，例如&lt;required&gt;）或可选的（方括号表示，例如[optional]）
4. action 方法 处理函数的参数：该命令声明的所有参数、解析出的选项、该命令对象自身

#### [chalk](https://github.com/chalk/chalk)

美化命令行输出的工具

语法很简单：

```js
chalk.<style>[.<style>...](string, [string...]);

Example: chalk.red.bold.underline('Hello', 'world');【链式调用】
```

#### [Inquirer](https://github.com/SBoudrias/Inquirer.js)

用户与命令行交互的工具

基本语法：

```js
import inquirer from "inquirer";

inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
```

inquirer 为每个问题提供很多参数：

- type：表示提问的类型，包括：input, confirm, list, rawlist, expand, checkbox, password, editor；
- name: 存储当前问题回答的变量；
- message：问题的描述；
- default：默认值；
- choices：列表选项，在某些 type 下可用，并且包含一个分隔符(separator)；
- validate：对用户的回答进行校验；
- filter：对用户的回答进行过滤处理，返回处理后的值；
- transformer：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；
- when：根据前面问题的回答，判断当前问题是否需要被回答；
- pageSize：修改某些 type 类型下的渲染行数；
- prefix：修改 message 默认前缀；
- suffix：修改 message 默认后缀。

#### [ora](https://github.com/sindresorhus/ora)

ora 包用于显示加载中的效果，类似于前端页面的 loading 效果

```js
import ora from "ora";
import chalk from "chalk";

const spinner = ora(`Loading ${chalk.red("模板")}`).start();
```

#### [download-git-repo](https://gitlab.com/flippidippi/download-git-repo)

从 github，gitlab，Bitbucket 下载资源

## 重新认识 package.json

```json
{
  "name": "chiyoucli",
  "version": "1.2.0",
  "description": "自动化命令工具",
  "main": "./bin.js",
  "bin": {
    "chiyoucli": "./bin.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "jiangxin",
  "license": "ISC",
  "keywords": ["chiyoucli"],
  "dependencies": {
    "chalk": "^4.1.2",
    "commander": "^9.4.0",
    "download-git-repo": "^3.0.2",
    "inquirer": "^8.1.0",
    "ora": "^5.4.1",
    "update-notifier": "^5.1.0"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0",
    "yarn": "^0.13.0"
  }
}
```

如上是一个中规中矩的 package.json 文件，我们对于 name、version、type、scripts 等字段含义都很熟悉了,介绍几个跟发包相关的字段：private、engines、browserlist、bin

- private 如果设置为 true，则可以防止应用程序/软件包被意外地发布到 npm。
- engines 设置了此软件包/应用程序在哪个版本的 Node.js 上运行。
- browserslist 用于告知要支持哪些浏览器

由于我们是写Node 程序因此 browserslist就不需要设置了

这里重点介绍下bin字段：

如果我们想在项目中执行一个node文件，直接 node +文件路径 就好了，但是我们要用脚手架，肯定不能这样。我们需要把项目发布到npm（或者tnpm），用户进行全局安装，然后直接使用我们自定义的命令，类似npm init rax 这样。
这个功能就是由 bin 实现的：将bin的字段命令映射到本地文件名， npm将软链接这个文件到prefix/bin里面或者在./node_modules/.bin/


用一个demo来说明下：  
我们在package.json中添加：
```json
"bin": {
    "chiyoucli": "./bin.js"
}
```

然后项目根目录新建bin.js， 注意这个文件头部一定要 [`#!/usr/bin/env node`](https://www.jianshu.com/p/322dbb06f9ef/)，这个其实也叫shebang 使用 node 进行脚本的解释

```js title=bin.js
#!/usr/bin/env node
function run (argv) {
    if (argv[0] === '-v' || argv[0] === '--version') {
        console.log('  version is 0.0.1');
    } else if (argv[0] === '-h' || argv[0] === '--help') {
        console.log('  usage:\n');
        console.log('  -v --version [show version]');
    }
}
run(process.argv.slice(2));
```

必须要打成全局包才可以使用该命令,打成全局包的命令  
npm install . -g  或者 npm link  
执行 chiyoucli -v 或者 chiyoucli -h


<Thumbnail
  src='/myimage/webother6.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

举一反三：
我们以全局安装的`ncu`命令为列，执行`where ncu` 查看bin

where nuc

<Thumbnail
  src='/myimage/webother6-1.png'
  alt='Choose either AWS or GCP'
  width='556px'
/>

## 实战
```js title=bin.js
#!/usr/bin/env node

const chalk = require("chalk");
const commander = require("commander");
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const ora = require("ora");
const download = require("download-git-repo");
const updateNotifier = require("update-notifier");

const packageJson = require("./package.json");
const templates = require("./template");

const program = new commander.Command();

const notifier = updateNotifier({ pkg: packageJson });

// updateCheckInterval 更新检查的间隔时间，在该时间内会直接使用缓存，超过该时候才会去npm检查，默认是一天的缓存时间
// 因此这就是为什么在npm 包更新后，没有立刻提示需要更新包的信息

if (notifier.update && notifier.update.latest !== packageJson.version) {
  notifier.notify({ defer: false, isGlobal: true });
}

const isObject = (val) => {
  return Object.prototype.toString.call(val) === "[object Object]";
};

// 可通过 chiyou-cli --version 输出版本信息
program.version(packageJson.version);

program
  .name(packageJson.name)
  .version(packageJson.version, "-v,--version")
  // 创建命令
  .command(`create [project-directory]`)
  // 命令别名
  .alias("cy")
  .description("输入项目名称，初始化项目模板")
  .action(async (projectname, option, command) => {
    if (
      typeof projectname === "undefined" ||
      (isObject(projectname) && Object.keys(projectname).length === 0)
    ) {
      console.error("请输入业务文件夹名称:");
      console.log(
        `  ${chalk.cyan(packageJson.name)} ${chalk.green(
          "<project-directory>"
        )}`
      );
      console.error("示例:");
      console.log(
        `  ${chalk.cyan(packageJson.name)} ${chalk.green("slave-notice-app")}`
      );
      process.exit(1);
    }
    // 业务开发目录
    const dir = path.join(process.cwd(), projectname);
    // 检查命令运行目录下是否存在同名文件夹
    const checkDir = fs.existsSync(dir);
    if (checkDir) {
      console.log(
        `${chalk.red(
          `目录下已存在名为：${chalk.underline(projectname)} 的文件夹`
        )}`
      );
      process.exit(1);
    }

    const promptResult = await inquirer.prompt([
      {
        type: "list",
        name: "templatekey",
        message: "请选择您要拉取的开发模板",
        choices: Object.keys(templates)
      }
    ]);

    const getTemplateInfo = templates[promptResult.templatekey];
    if (!getTemplateInfo || !getTemplateInfo.url) {
      console.log(`${chalk.red("模板配置信息有误！")}`);
      process.exit(1);
    }

    const spinner = ora(
      `正在下载${chalk.bgGreen(promptResult.templatekey)}业务模板到项目中`
    ).start();

    // 开始下载项目
    download(getTemplateInfo.url, dir, { clone: true }, (error) => {
      if (error) {
        spinner.fail(`下载失败：${chalk.red(error)}`);
      } else {
        spinner.succeed("项目模板下载成功！");
        // 修改package.json内容
        const packageContent = fs.readFileSync(
          path.join(dir, "package.json"),
          "utf8"
        );
        const packageContentObject = JSON.parse(packageContent);
        packageContentObject.name = projectname;

        fs.writeFileSync(
          path.join(dir, "package.json"),
          JSON.stringify(packageContentObject, null, 2)
        );
      }
    });
  });

program.parse();
```

上面的代码就不一一进行解释了

### 本地测试
开发好之后，我们先需要进行本地测试
1. npm install . -g  或者 npm link
2. 在终端中执行命令 `chiyoucli create projectName`

## 发布
1. npm login
2. npm publish

### 使用

#### 安装

```bash
npm i -g chiyoucli
```

#### 使用

```bash
chiyoucli create projectName
// 或者 通过npx 直接使用命令 ，则无需进行全局安装
npx chiyoucli create projectName
```

