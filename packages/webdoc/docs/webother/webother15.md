---
title: github action系列-npm publish
---

## 前言
在实际在项目打包和布署上，不知道大家没有觉得，打包和布署其实是一项重复性很高的事情，当我们开发一个库的时候，一般简单点的流程如下：
`创建项目->编写代码->执行打包->发布到npm`，当然这个流程不是规范的，一般还需要添加单元测试等，库开发不是本章重点，所以怎么简单怎么来吧  

在后两个阶段`执行打包->发布到npm`，其实是一个比较简单且重复性较高的工作，可能一天会有很多时间段都需要花一部分时间在这两个阶段上，因此很有必要将这两个阶段自动化，[github actions](https://docs.github.com/en/actions)为我们提供了自动处理这两个阶段的解决方案，`github actions`能力非常强大没必要刻意去花时间单独学习，只需要结合我们项目或需求的实际去了解其使用

## 创建项目

我们创建如下结构的项目

```tree
├── LICENSE
├── README.md
├── node_modules
│   └── rollup
├── package.json
├── pnpm-lock.yaml
├── rollup.config.js
└── src
    └── index.js
```

#### 创建步骤
1. npm init -y 初始化工程
2. pnpm add rollup 安装打包库
3. src/index.js 编写库源码
4. 添加rolup.config.js文件，进行rollup配置

有关[rollup](https://rollupjs.org/)相关知识，请大伙自行脑补

## 创建工作流

创建github actions的方法有两种：
1. 在项目根目录手动新建.github文件夹，并添加yml文件
2. 基于他人提交到github的模板

**我觉得学习一个新知识，从看别人的代码入手是最快的，先把功能完成，之后再去慢慢理解里面的细节点**，因此这里我就直接选择第二种方式了，当我们在github创建仓库后，点击`Actions`，再点击`New workflow`按钮，之后可以搜索到你需要的模板

#### npm-publish-github-packages.yml
```yaml
name: npm-publish
on:
  push:
    paths:
      - ".github/workflows/*.yml"
      - "src/**/*.*"
      - "package.json"

jobs:
  publish-gpr:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - name: checkout
        uses: actions/checkout@v3
      - name: node
        uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: "https://registry.npmjs.org/"
      - name: 安装pnpm
        run: |
          npm i pnpm -g
          pnpm -v
      - name: 安装依赖并执行打包
        run: |
          pnpm install
          pnpm build
      - name: 查看权限
        run:  npm whoami
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}} 
      - name: 发布到npm   
        run: pnpm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```
#### 属性解释
[on](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow): 触发工作流的方式，也就是什么样的情况去运行这个工作流，github提供了手动和自动(当满足特定的条件)两种方法  
[jobs](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobs): 工作流中的具体工作，这个是组件工作流的必须属性，可以理解为具体干哪些事情  
publish-gpr: 工作，可根据实情，随意命名 
[runs-on](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on): 在哪个系统中运行该(publish-gpr)工作流  
[permissions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#permissions): 权限  
[steps](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idsteps): 步骤，工作流中包含了多个工作，工作中又包含了多个步骤  
[uses](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsuses): 使用[第三方库](https://github.com/marketplace?category=&query=&type=actions&verification=)  
[with](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepswith): 第三方库入参

下面我们来用一句话解释一下`npm-publish`工作流所做的事情：当我们src目录下的文件或者*.yml有更新被推送到github仓库时，触发我们的工作流，工作流运行在`ubuntu-latest`系统环境下，在该系统下我们拉取仓库源码([actions/checkout@v3](https://github.com/marketplace/actions/checkout))，并安装node([actions/setup-node@v3](https://github.com/marketplace/actions/setup-node-js-environment))，在全局环境中安装pnpm，执行pnpm build 打包指令，打包完后，发布到npm上

:::tip
这里有几点需要注意的地方，github自动化发布包到npm上，是需要先到npm上获取用户身份指令，也就是token，当拿到token后，在github中当前项目下，添加secrets

npm token获取：
1. 登录你自己的npm账号，如果没有要先注册
2. 点击头像下拉，选择`Access Tokens`
3. 点击按钮`Generate New Token`选择`Classic Token`
4. 填写名称，选择`Automation`即可

**随后要记得先复制生成的token，因为下次进来就不然让你有复制的机会了，只能重新生成**

github填写npm Token：  
身份令牌是非常敏感的信息，github是不准许你直接将token值填写到yml文件中的，需要到项目的设置中进行填写，然后通过`secrets.<NPM_TOKEN>`来在yml中获取
1. 进入到当前项目，点击`Settings`
2. 点击左侧侧边栏中的`Secrets and variables`->`Actions`
3. 点击`New repository secret`按钮，新增敏感数据（记住所有的敏感数据都应该添加在这里），这里的命名，就是你在yml中使用的名称，`secrets.<NPM_TOKEN>`

这样就完成了npm token的填写，这样就不会将npm token数据直接暴露出来
:::


## is not in the npm registry
1. 当运行工作流出现这个错误提示时，建议在yml中添加`npm whoami`来检查，是否有发布的权限
2. 在yml中请在`npm publish`层级中添加`env`，当执行命令`npm publish`时，会去获取`env`中的`NODE_AUTH_TOKEN`，yml语法以'-'为同层级标识，这就在这里搞了好久，最后发现是这里的问题

大伙可以使用[json2yaml](https://www.json2yaml.com/)来验证自己的yml或查看yml结构

#### 错误写法
```yml
      - name: 发布到npm   
          run: pnpm publish
      - env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```
