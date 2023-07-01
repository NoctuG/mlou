---
abbrlink: docker-using
categories:
- VPS
date: '2022-08-19 21:50:59'
excerpt: 一、介绍 Docker是一种开源的容器技术，可以让开发者和运维人员在不同的平台上快速地创建、部署和运行应用程序。Docker的优势在于它可以将应用程序和其依赖的环境打包成一个轻量级的、可移植的、隔离的容器，从而实现高效的资源利用和快速的交付。 Docker Compose是一个用于定义和运行多容器Docker应用的工具。它使用简单的YAML文件来配置应用程序的服务、网络和卷等，并通过一条命令即可一...
tags:
- 应用
title: VPS上Docker使用笔记
updated: 2023-7-1T12:30:4.387+8:0
---
# 一、介绍

Docker是一种开源的容器技术，可以让开发者和运维人员在不同的平台上快速地创建、部署和运行应用程序。Docker的优势在于它可以将应用程序和其依赖的环境打包成一个轻量级的、可移植的、隔离的容器，从而实现高效的资源利用和快速的交付。

Docker Compose是一个用于定义和运行多容器Docker应用的工具。它使用简单的YAML文件来配置应用程序的服务、网络和卷等，并通过一条命令即可一键启动、停止和管理整个应用程序的容器集合。

# 二、VPS运行环境

* 一台服务器（内存至少为1G）
* Debian11
* Docker、Docker-compose
* 准备一个域名
* 安装好 Nginx
* 【可选】控制面板/LNMP一键包/Oneinstack

# 二、安装与卸载

## 2.1.安装 Docker

对于国外的VPS——

```shell
wget -qO- get.docker.com | sh
```

对于国内的——

```shell
curl -sSL https://get.daocloud.io/docker | sh
```

## 2.2.安装Docker-Compose

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

## 2.3.卸载

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

# 三、使用 Docker 的基本步骤


## **3.1. 获取镜像**

要获取一个镜像，可以使用`docker pull`命令，例如：

```
docker pull ubuntu:latest
```

这将从Docker Hub下载最新的Ubuntu镜像。

## **3.2. 运行容器**

要运行一个容器，可以使用`docker run`命令，例如：

```
docker run [options] <image_name> [command]
```


## **3.3. 管理容器**

以下是一些常用的容器管理命令：

- `docker ps`：列出当前正在运行的容器。
- `docker start <container_id>`：启动已停止的容器。
- `docker stop <container_id>`：停止正在运行的容器。
- `docker rm <container_id>`：删除容器。

## **3.4. 构建镜像**

如果你需要创建自定义的镜像，可以编写一个Dockerfile，并使用`docker build`命令构建镜像，例如：

```Dockerfile
# 基于ubuntu镜像
FROM ubuntu

# 更新软件源并安装nginx
RUN apt-get update && apt-get install -y nginx

# 暴露80端口
EXPOSE 80

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]

```

将上述内容保存为`Dockerfile`，然后在保存的目录下执行以下命令：

```
docker build -t my-nginx.
```

这将根据Dockerfile构建一个名为`my-nginx`的镜像。


# 四、使用Docker Compose的基本步骤

## **4.1. 创建Compose文件**

在你的项目目录下创建一个名为`docker-compose.yml`的文件，并使用YAML语法编写配置。

```shell
nano docker-compose.yml
```

## **4.2. 定义服务**

在Compose文件中，你可以定义一个或多个服务（services）。每个服务代表一个容器，并包含该容器的配置信息，例如镜像、端口映射、环境变量等。

示例：

```yaml
version: "3"  ##版本
services:     ##服务
  web:        ##服务1名称
    image: nginx:latest   ##镜像
    ports:
      - "80:80"     #容器端口；主机端口
  db:         ##服务2名称
    image: mysql:latest   ##镜像
    environment:          #环境变量
      - MYSQL_ROOT_PASSWORD=secret
```

上述示例定义了两个服务，分别是`web`和`db`。`web`服务使用最新的Nginx镜像，并将容器的80端口映射到主机的80端口。`db`服务使用最新的MySQL镜像，并设置了一个环境变量`MYSQL_ROOT_PASSWORD`。

## **4.3. 启动应用程序**

在项目目录中执行以下命令来启动应用程序：

```shell
docker-compose up
```

Docker Compose将会读取配置文件并自动下载所需的镜像，然后启动并运行所有的容器。

## 4.4. 管理应用程序

以下是一些常用的Docker Compose命令：

- `docker-compose up`：启动应用程序的所有容器。
- `docker-compose down`：停止并删除应用程序的所有容器。
- `docker-compose ps`：查看应用程序的容器状态。
- `docker-compose logs`：查看应用程序的容器日志。

## 4.5. 高级用法和扩展

Docker Compose提供了许多高级功能和扩展选项，使得你可以更好地管理复杂的多容器应用。以下是一些常见的高级用法：

- **环境变量和秘密管理**：可以使用环境变量和Docker Secrets来管理敏感数据，例如密码、API密钥等。
- **多环境部署**：可以使用不同的Compose文件来支持不同的部署环境，例如开发、测试和生产环境。
- **服务扩展和负载均衡**：可以通过配置服务的副本数来扩展应用程序，并使用负载均衡器来分配流量。
- **网络配置**：可以定义自定义网络，并将服务连接到指定的网络中。

深入了解这些高级用法和扩展将使你能够更好地利用Docker Compose的强大功能。



参考：

* [Docker官方文档]([https://docs.docker.com/](https://docs.docker.com/compose/))
* [Docker Compose GitHub仓库]([https://github.com/docker/compose](https://github.com/docker/compose))
* [Docker Compose | 菜鸟教程](https://www.runoob.com/docker/docker-compose.html)
* [Docker Compose使用总结 - 知乎](https://zhuanlan.zhihu.com/p/141848522)
* [Docker Compose介绍及使用入门 - 简书](https://www.jianshu.com/p/ee2fea4136f0)
