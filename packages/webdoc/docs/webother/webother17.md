---
title: linux常用命令集
---

- 针对MAC电脑

## 查询IPV4地址
```linux
ifconfig | grep inet
<!-- 精确匹配 -->
ifconfig | grep -Eo 'inet .*'
```

:::tip
这段代码会执行一个命令 `ifconfig`，该命令用于查看网络接口的配置信息。然后使用管道符 `|` 将该命令的输出作为输入传递给另一个命令 `grep`，该命令用于在文本中搜索指定的字符串。在这里，我们搜索字符串 `inet`，该字符串通常用于表示 IP 地址。因此，这段代码的作用是从网络接口的配置信息中提取出 IP 地址，`grep` 还可以精确匹配
:::


## 查看可执行文件安装目录
```linux
which node
```
:::tip
可以通过`which`来查看可执行文件在当前系统中的安装目录，npm,pnpm,node等等
:::