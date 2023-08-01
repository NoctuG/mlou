---
abbrlink: alpine-linux-experience
categories: []
date: '2023-08-01T15:29:09.102546+08:00'
tags: []
title: Alpine Linux 体验
updated: 2023-8-1T15:29:11.805+8:0
---
重新安装操作系统

```shell
wget https://www.moerats.com/usr/shell/alpine.sh && bash alpine.sh

```

安装记录——

```shell
root@vm467583:~# sh <(curl -k 'https://cdn.jsdelivr.net/gh/52fancy/NetInstallAlpine/alpine.sh')
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3539    0  3539    0     0  13156      0 --:--:-- --:--:-- --:--:-- 13107
+------------------------------------------------------------------------+
|                             Alpine                                     |
+------------------------------------------------------------------------+
|                  A script to Net Install  Alpine                       |
+------------------------------------------------------------------------+
|              Welcome to  https://github.com/52Fancy                    |
+------------------------------------------------------------------------+
请选择分支版本[默认latest-stable]：
分支：latest-stable
请选择apk源[默认cdn]：
apk源：http://dl-cdn.alpinelinux.org/alpine
系统平台：x86_64
是否开启VIRTUAL[y/n]：n
关闭VIRTUAL
Generating public/private ed25519 key pair.
Your identification has been saved in KEY
Your public key has been saved in KEY.pub
The key fingerprint is:
SHA256:eJpEnsuojEsa+0CAZiNGL6LIUDaD6X0yBrKL3S33knM root@vm467583
The key's randomart image is:
+--[ED25519 256]--+
| +=              |
|*+.o             |
|OBo.  .          |
|&.o= + o         |
|+=..+.= S        |
|+ . o+o=         |
|o.  .o=o         |
|o* .  + E        |
|=o+    +         |
+----[SHA256]-----+
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   768  100   474  100   294    529    328 --:--:-- --:--:-- --:--:--   857
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3318  100  3318    0     0  10466      0 --:--:-- --:--:-- --:--:-- 10466
########################################################################################################################################################################################################## 100.0%
########################################################################################################################################################################################################## 100.0%
Generating grub configuration file ...
Found linux image: /boot/vmlinuz-5.10.0-23-amd64
Found initrd image: /boot/initrd.img-5.10.0-23-amd64
Found linux image: /boot/vmlinuz-5.10.0-20-amd64
Found initrd image: /boot/initrd.img-5.10.0-20-amd64
Found linux image: /boot/vmlinuz-3.18.2-netboot
Warning: os-prober will be executed to detect other bootable partitions.
Its output will be used to detect bootable binaries on them and create new boot entries.
done
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACAjegA2ayvrCsL28MlBnA6E1vNz5n9K3jEMhD+//NYh/QAAAJDUpdYU1KXW
FAAAAAtzc2gtZWQyNTUxOQAAACAjegA2ayvrCsL28MlBnA6E1vNz5n9K3jEMhD+//NYh/Q
AAAEANpDke4wOn+Iy7gZs4XZrF45Rg+mQcUdjSzV828HPHzCN6ADZrK+sKwvbwyUGcDoTW
83Pmf0reMQyEP7/81iH9AAAADXJvb3RAdm00Njc1ODM=
-----END OPENSSH PRIVATE KEY-----
请自行下载或者保存私钥，然后重启服务器继续安装
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1065  100   471  100   594    516    651 --:--:-- --:--:-- --:--:--  1167
https://file.io/************
重启服务器[y/n]：y


```

完成后VPS将重启
