---
abbrlink: docker-using
categories:
- VPS
date: '2022-08-19 21:50:59'
excerpt: 一、运行环境  一台服务器（内存至少为1G） Debian11 Docker、Docker-compose 准备一个域名 安装好 Nginx 【可选】控制面板/LNMP一键包/Oneinstack
  二、安装与卸载 1.安装 Docker 对于国外的VPS—— shell wget -qO- get.docker.com | sh 对于国内的—— shell
  curl -sSL https://ge...
tags:
- 应用
title: Docker使用笔记
updated: '2022-12-18 17:35:27'
---
# 一、运行环境

* 一台服务器（内存至少为1G）
* Debian11
* Docker、Docker-compose
* 准备一个域名
* 安装好 Nginx
* 【可选】控制面板/LNMP一键包/Oneinstack

# 二、安装与卸载

## 1.安装 Docker

对于国外的VPS——

```shell
wget -qO- get.docker.com | sh
```

对于国内的——

```shell
curl -sSL https://get.daocloud.io/docker | sh
```

## 2.安装Docker-Compose

对于国外——

```shell
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-(uname -s)-(uname−s)−(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

对于国内——

```shell
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.1.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## 3.卸载

```shell
dpkg -l | grep -i docker
apt-get purge -y docker-ce docker-ce-cli
apt-get purge -y docker-engine docker docker.io docker-ce docker-ce-cli
rm -rf /var/lib/docker /etc/docker
rm /etc/apparmor.d/docker
groupdel docker
rm -rf /var/run/docker.sock
brctl delbr docker0
```
