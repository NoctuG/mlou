---
abbrlink: termux-debian
categories:
- - 技术
date: '2023-10-02T18:17:11.019944+08:00'
excerpt: 1.更新软件源 pkg up  2.安装必要依赖 pkg install proot pkg install proot-distro  3.安装Debian系统：  proot-distro install debian  ~ $ proot-distro install debian [] Installing Debian... [] Creating directory '/data/da...
tags:
- Linux
- Termux
title: Termux安装运行Debian
updated: /2023-10-02T18:24:42.775+08:00
---
1.更新软件源

```bash
sudo sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
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


```bash
~ $ proot-distro install debian
[] Installing Debian...
[] Creating directory '/data/data/com.termux/files/usr/var/lib/proot-distro/installed-rootfs/debian'...
[] Creating directory '/data/data/com.termux/files/usr/var/lib/proot-distro/installed-rootfs/debian/.l2s'...
[] Downloading rootfs tarball...% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
Dload  Upload   Total   Spent    Left  Speed
0     0    0     0    0     0      0      0 --:--:--  0:00:01 --:--:--     0
100 36.4M  100 36.4M    0     0  1665k      0  0:00:22  0:00:22 --:--:-- 1833k[] Checking integrity, please wait...
[] Extracting rootfs, please wait...
[] Creating file '/data/data/com.termux/files/usr/var/lib/proot-distro/installed-rootfs/debian/etc/profile.d/termux-proot.sh'...
[] Creating file '/data/data/com.termux/files/usr/var/lib/proot-distro/installed-rootfs/debian/etc/resolv.conf'...
[] Creating file '/data/data/com.termux/files/usr/var/lib/proot-distro/installed-rootfs/debian/etc/hosts'...
[] Registering Android-specific UIDs and GIDs...
[*] Finished.Now run 'proot-distro login debian' to log in.
```
