---
title: Docker系列项目
date: 2022-06-24 17:44:49
tags:
- Docker
categories:
  - VPS
---

程序由 [我不是咕咕鸽](https://blog.laoda.de/)分享得知，记录下其中几个程序的使用
---

# 一、事前准备

## 更新组件

```bash
apt-get update && apt-get upgrade
```

## 安装 Docker

```bash
wget -qO- get.docker.com | bash
docker -v
```

## 安装 Dockr-Compose

```
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```


# 二、# Dashy 服务器面板

## 项目展示

GitHub原项目地址：[https://github.com/Lissy93/dashy](https://github.com/Lissy93/dashy)

官网地址：[https://dashy.to/](https://dashy.to/)

Demo地址：[https://demo.dashy.to/](https://demo.dashy.to/)

文档地址：[https://dashy.to/docs/](https://dashy.to/docs/)

## 部署

### 创建目录与配置文件

```bash
mkdir -p /root/data/docker_data/dashy/ {icons,public}
cd /root/data/docker_data/dashy
nano docker-compose.yml
```

### 编辑配置文件

在`docker-compose.yml`中粘贴并保存：

```yml
version: '3.3'
services:
dashy:
ports:
- '8395:80'
volumes:
- '/root/data/docker_data/dashy/public/conf.yml:/app/public/conf.yml'
- '/root/data/docker_data/dashy/icons:/app/public/item-icons/icons'
container_name: dashy
restart: unless-stopped
image: 'lissy93/dashy:latest'
```

### 查看端口是否可用

```bash
lsof -i:8395
```

出现：

```bash
-bash: lsof: command not found
```

则手动安装：

```bash
apt install lsof
```

如果没有报错则运行

```bash
cd public/
nano conf.yml
```

再粘贴并保存：

```
# Page meta info, like heading, footer text and nav links

pageInfo:
title: Dashy
description: Welcome to your new dashboard!
navLinks:

- title: GitHub
  path: https://github.com/Lissy93/dashy
- title: Documentation
  path: https://dashy.to/docs

# Optional app settings and configuration

appConfig:
theme: colorful
layout: auto
iconSize: medium
language: en
auth:
users:

- user: your-preferred-username    # 改成自己的用户名
  hash: hash-of-a-password-you-choose-using-sha256-hashing  # cha256 哈希加密，地址用这个： https://emn178.github.io/online-tools/sha256.html
  type: admin

# Main content - An array of sections, each containing an array of items

sections:

- name: Getting Started
  icon: fas fa-rocket
  items:
  - title: Dashy Live
    description: Development a project management links for Dashy
    icon: https://i.ibb.co/qWWpD0v/astro-dab-128.png
    url: https://live.dashy.to/
    target: newtab
  - title: GitHub
    description: Source Code, Issues and Pull Requests
    url: https://github.com/lissy93/dashy
    icon: favicon
  - title: Docs
    description: Configuring & Usage Documentation
    provider: Dashy.to
    icon: far fa-book
    url: https://dashy.to/docs
  - title: Showcase
    description: See how others are using Dashy
    url: https://github.com/Lissy93/dashy/blob/master/docs/showcase.md
    icon: far fa-grin-hearts
  - title: Config Guide
    description: See full list of configuration options
    url: https://github.com/Lissy93/dashy/blob/master/docs/configuring.md
    icon: fas fa-wrench
  - title: Support
    description: Get help with Dashy, raise a bug, or get in contact
    url: https://github.com/Lissy93/dashy/blob/master/.github/SUPPORT.md
    icon: far fa-hands-helping
```

再运行：

```
cd /root/data/docker_data/dashy/icons
git clone https://github.com/walkxcode/dashboard-icons.git  
cd /root/data/docker_data/dashy
docker-compose up -d
```

## 更新

```
cp -r /root/data/docker_data/dashy /root/data/docker_data/dashy.archive  # 备份数据
cd /root/data/docker_data/dashy  # 进入docker-compose所在的文件夹
docker-compose pull    # 拉取最新的镜像
docker-compose up -d   # 重新更新当前镜像
```

访问 `IP:8935`即可


* 可搭配反向代理使用，根据介绍也可以自行添加组件，详见
[官方文档](https://dashy.to/docs/)


# 三、Docker版桌面

## 项目展示

* GitHub项目地址：[https://github.com/fcwu/docker-ubuntu-vnc-desktop](https://github.com/fcwu/docker-ubuntu-vnc-desktop)
*  Docker Hub：[https://hub.docker.com/r/imlala/ubuntu-xfce-vnc-novnc](https://hub.docker.com/r/imlala/ubuntu-xfce-vnc-novnc)

## 安装部署

### 创建目录与配置文件

```bash
mkdir -p /root/data/docker_data/Ubuntu_desktop
cd /root/data/docker_data/Ubuntu_desktop
nano docker-compose.yml
```

### 编辑配置文件

在`docker-compose.yml`粘贴并保存：

```yml
version: '3.5'
services:
ubuntu-xfce-vnc:
container_name: xfce
image: imlala/ubuntu-xfce-vnc-novnc:latest
shm_size: "1gb"  # 防止高分辨率下Chromium崩溃,如果内存足够也可以加大一点点
ports:
- 5900:5900   # TigerVNC的服务端口（保证端口是没被占用的，冒号右边的端口不能改，左边的可以改）
- 6080:6080   # noVNC的服务端口，注意事项同上
environment:
- VNC_PASSWD=PAS3WorD    # 改成你自己想要的密码
- GEOMETRY=1280x720      # 屏幕分辨率，800×600/1024×768诸如此类的可自己调整
- DEPTH=24               # 颜色位数16/24/32可用，越高画面越细腻，但网络不好的也会更卡
volumes:
- ./Downloads:/root/Downloads  # Chromium/Deluge/qBittorrent/Transmission下载的文件默认保存位置都是root/Downloads下
- ./Documents:/root/Documents  # 映射一些其他目录
- ./Pictures:/root/Pictures
- ./Videos:/root/Videos
- ./Music:/root/Music
restart: unless-stopped
```

安装记录

```bash
root@1495399293hax:~/data/docker_data/Ubuntu_desktop# docker-compose up -d
Pulling ubuntu-xfce-vnc (imlala/ubuntu-xfce-vnc-novnc:latest)...
latest: Pulling from imlala/ubuntu-xfce-vnc-novnc
5c939e3a4d10: Pull complete
c63719cdbe7a: Pull complete
19a861ea6baf: Pull complete
651c9d2d6c4f: Pull complete
a028d17d35bd: Pull complete
45cf37e3e57b: Pull complete
321aed0b68db: Pull complete
d46680579ebc: Pull complete
Digest: sha256:9e4c4bfe7fb269cc0a0cca0ff9479c2a329a0e83c9cd8495266d28be96bf94d7
Status: Downloaded newer image for imlala/ubuntu-xfce-vnc-novnc:latest
Creating xfce ... done
```

### 运行使用

```docker
docker-compose up -d
```

访问` IP:6080` 即可

# 四、个人笔记——Trilium

## 项目展示

* GitHub原项目地址：[https://github.com/zadam/trilium](https://github.com/zadam/trilium)
* 英文版本客户端下载地址：[https://github.com/zadam/trilium/releases](https://github.com/zadam/trilium/releases)
* GitHub项目中文版本地址：[https://github.com/Nriver/trilium-translation](https://github.com/Nriver/trilium-translation)
* 中文版本客户端下载地址：[https://github.com/Nriver/trilium-translation/releases](https://github.com/Nriver/trilium-translation/releases)
## 部署

创建安装目录：

```docker
mkdir -p /root/data/docker_data/trilium
cd /root/data/docker_data/trilium
nano docker-compose.yml
```

编辑`docker-compose.yml`粘贴并保存：

```docker
version: '3'
services:
trilium-cn:
image: nriver/trilium-cn
restart: always
ports:
- "8080:8080"
volumes:
# 把同文件夹下的 trilium-data 目录映射到容器内
- ./trilium-data:/root/trilium-data
environment:
# 环境变量表示容器内笔记数据的存储路径
- TRILIUM_DATA_DIR=/root/trilium-data
```

然后运行：

```docker
docker-compose up -d
```

访问 `ip:8080`即可
安装记录

```bash
root@5547902421woiden:~/data/docker_data/trilium# docker-compose up -d
Creating network "trilium_default" with the default driver
Pulling trilium-cn (nriver/trilium-cn:)...
latest: Pulling from nriver/trilium-cn
405f018f9d1d: Pull complete
2755e351a24c: Pull complete
Digest: sha256:cbb73430f595a4a75d57ab0783929519f819f6cf303052b62fa00ac5b3d4a844
Status: Downloaded newer image for nriver/trilium-cn:latest
Creating trilium_trilium-cn_1 ... done
```


