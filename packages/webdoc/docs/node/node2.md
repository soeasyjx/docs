---
title: envsubst 变量值替换
---

## 前言

最近在公司的项目中遇到这样一个问题，公司的前端项目，目录结构是基于[pnpm workspace](https://pnpm.io/workspaces)的，版本管理使用的是[changeset](https://github.com/changesets/changesets)，如果对于这两个比较陌生的，可以自行查阅相关资料，在我们的库开发完成后，执行 changeset 命令`init`,`add`,`version`，会生成 CHANGELOG.md 文件，里面记录着包修改的相关信息以及版本信息，当我们需要将包发布到 npm 上，npm 对于包的介绍使用的是 README.md 文件，因此我们不得不将 CHANGELOG.md 内容手动复制到 README.md 文件中，这样的手动复制其实是一件比较繁琐且容易忘记的事情，那有没有办法可以自动将 CHANGELOG.md 内容，填充到 README.md 中呢，这就是我接来了要讲的内容了

## envsubst

> `envsubst`是一个 Linux 命令行工具，用于将环境变量的值替换为其在环境中的实际值。它可以将包含环境变量的文本文件作为输入，并将其输出到标准输出，或将其写入指定的输出文件中

解释一下上面的内容，其实说白了，就是使用另一个值，来替换占位符，这里的另一个值可以是一个文件的输出，也可以是一个普通的文本字符串

根据上面的信息，我们大致实现 CHANGELOG.md 内容输出到 README.md 中思路如下：

1. 读取 CHANGELOG.md 内容
2. 将读取到的内容文本赋值到环境变量中
3. 将使用到这个环境变量的地方替换为其真实文本值
4. 输出到 README.md 中

### cat

在 linux 中我们通过 cat 命令来读取文件内容并输出到设备(对文件类型没有要求)

```linux
MyEnv=$(cat file.tpl)
```

上面命令的意思是，读取 file.tpl 文件的内容，并将成输出到 `MyEnv` 变量中，其实我们可以将这句 linux 指令放到`npm script`中，如下：

```json title=package.json
{
  "scripts": {
    "start": "MyEnv=${cat file.tpl} && echo $MyEnv"
  }
}
```

> echo 可以用于在终端输出文本或变量的值，实际可以不用添加`echo $MyEnv`，如果你想看一下变量的值，可以用此方法，linux 中访问变量，需要在变量名前添加`$`

通过上面的步聚，我们可以很快的实际，思路中的第一点和第二点，至于第三点我们需要使用到`envsubst`来完成

envsubst 的语法很简单，只需在命令行中输入以下命令：

```linux
envsubst < input_file > output_file
```

> 其中，input_file 是您要替换环境变量的文件，（input_file 有变量$MyEnv），output_file 是生成的已替换环境变量的文件。envsubst 将读取 input_file 中的所有环境变量，并将其替换为其值，然后将结果写入 output_file

好了，从技术上我们都解讲了一次，下面就来实现最开始的那个需求吧

## 实现

```json title=package.json
{
  "scripts": {
    "start": "MyEnv=$(cat ./CHANGELOG.md) envsubst < ./README.md.tmpl > ./README.md"
  }
}
```

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
<TabItem value="CHANGELOG.md" label="CHANGELOG.md">

```js title=CHANGELOG.md
# create-fastman2-app

## 1.0.1

### Patch Changes

- 46d7cf0f87: 初始化
- 添加 READMD.md 说明文件
- 测试发布

## 1.0.1-beta.2

### Patch Changes

- 测试发布

## 1.0.1-beta.1

### Patch Changes

- 添加 READMD.md 说明文件

## 1.0.1-beta.0

### Patch Changes

- 初始化

```

</TabItem>
<TabItem value="README.md.tmpl" label="README.md.tmpl">

```js title=README.md.tmpl
## 自定义内容

$MyEnv

## 自定义内容
```

</TabItem>
<TabItem value="README.md" label="README.md">

```js title=README.md
## 自定义内容

# create-fastman2-app

## 1.0.1

### Patch Changes

- 46d7cf0f87: 初始化
- 添加 READMD.md 说明文件
- 测试发布

## 1.0.1-beta.2

### Patch Changes

- 测试发布

## 1.0.1-beta.1

### Patch Changes

- 添加 READMD.md 说明文件

## 1.0.1-beta.0

### Patch Changes

- 初始化

## 自定义内容
```

</TabItem>
</Tabs>

最开始 README.md 应该是没有内容的，执行`npm run start`后就会自动将 README.md.tmpl 文件中的变量占位**$MyEnv**使用 CHANGELOG.md 中的内容进行替换，当然这个替换并不是说，会去修改 README.md.tmpl 文件本身，进而将替换后的内容输出到 README.md 文件中

## 结合 changeset version 命令

```json
"version":"changeset version"
```

现在我们需要在项目执行`version`命令脚本后，自动执行`start`命令，这个方案就很多了，如果你使用npm包管理工具，则可以利用其提供的[生命周期勾子](https://docs.npmjs.com/cli/v6/using-npm/scripts#pre--post-scripts)，也可以直接将`start`命令通过**&&**添加到`version`命令之后，如：`changeset version && npm run start`

## 资料
[17 个常用linux命令](https://javascript.plainenglish.io/useful-cli-17-commands-you-should-know-as-a-developer-afeb0a916fea#559b)