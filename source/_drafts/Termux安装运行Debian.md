---
abbrlink: termux-debian
categories:
- - 技术
date: '2023-10-02T18:17:11.019944+08:00'
tags:
- Linux
- Termux
title: Termux安装运行Debian
updated: '2023-10-02T18:21:56.630+08:00'
---
1.更新软件源

```bash
pkg up
```

2.安装必要依赖

```
pkg install proot
pkg install proot-distro
```


3.安装Debian系统：

```bash
 proot-distro install debian
```
