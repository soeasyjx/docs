---
title: 本地仓库关联远程git
---

## 前言
有时候我们在开发本地项目的时候，并没有事先在gitee或github等远程代码仓库上创建git项目，而是先在本地开发了，事后突然想放到git上，这应该怎么去操作呢

## 关联远程git

### 方法一
1. 先在gitee或github上创建项目
2. 在本地新建一个空文件夹 我们就先叫`hello-abc`吧
3. 在`hello-abc`中执行git clone 命令 [git clone [url]](https://www.runoob.com/git/git-clone.html)拉取远程项目
4. 将本地项目内容复制到`hello-abc`中
5. 通过sourcetree 或者git 命令直接提交

这种方式对于不是很熟悉git指令的同学来说还是挺好的，而已基本不是出错，只是多了第二步中的`hello-abc`文件夹创建

### 方法二
下面我们通过纯git指令的方式来实现远程git的关联，为了方便演示我们已在gitee上创建了名为`hello-abc`的仓库，并在其中添加了README.md文件
1. 在本地新建`hello-abc`文件夹，并新增index.js文件
```bash
mkdir hello-abc && cd hello-abc && touch index.js
```
2. 初始化git
>[git init](https://www.runoob.com/git/git-create-repository.html)
```
git init
```
3. 关联远程仓库
>这一步比较关键
>[git remote](https://www.runoob.com/git/git-remote.html)
```bash
git remote add origin https://gitee.com/soeasyjx/hello-abc.git
```
4. 本地文件暂存
>[git add](https://www.runoob.com/git/git-add.html)
```bash
git add .
```
5. 提取远程仓库更新本地
:::tip
这一步很关键，谁也无法保存远程仓库没有别人提交的东西，所以需要先拉取一下远程仓库更新到本地，这里也不能直接强制更新，不然会将别人的提交覆盖，这是很危险的操作`git push origin master -f`

当然如果你能确定远程库中没有任务文件，这一步可以不需要插，直接执行第6步就可以了
:::

>[git pull](https://www.runoob.com/git/git-pull.html)
```bash
git pull origin master
```
6. 将暂存文件添加到本地仓库
>[git commit](https://www.runoob.com/git/git-commit.html)
```bash
git commit -m "测试测试本地关联仓库"
```
7. 推送到远程
>[git push](https://www.runoob.com/git/git-push.html)
```bash
git push origin master
```

这样通过git指令完成了关系仓库的到远程git的关联

## git 常用指令

### 查看远程仓库地址
```bash
git remote -v
```

### 拷贝一个 Git 仓库到本地
```bash
git clone [url]

git clone https://github.com/soeasyjx/mytest-githubactions.git
```

## 参考
[git 指令](https://www.runoob.com/git/git-basic-operations.html)

[git 指令2](https://blog.csdn.net/weixin_44713763/article/details/104640842)