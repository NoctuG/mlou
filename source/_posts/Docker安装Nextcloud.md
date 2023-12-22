---
abbrlink: docker-nextcloud
categories:
- - 程序
date: '2023-08-07T14:24:38.400558+08:00'
excerpt: 新建目录 mkdir opt/nxd  准备 docker-compose.yml version: '3'  services:   db:     image: mariadb     command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW     restart: always     volumes:     ...
tags:
- VPS
title: Docker安装Nextcloud
updated: '2023-12-23T00:14:43.925+08:00'
---
## Nextcloud介绍

Nextcloud是一个开源的云存储和协作平台，可以让您在自己的服务器上存储、同步和共享文件、日历、联系人、任务等。本文将介绍如何使用Docker来部署Nextcloud，以及如何解决一些常见的问题。

## 新建目录

首先，我们需要创建一个目录，用来存放Nextcloud的配置文件和数据。这里我们选择在/opt下创建一个名为nxd的目录，您也可以根据自己的喜好选择其他位置。

```shell
mkdir opt/nxd
```

## 准备 `docker-compose.yml`

接下来，我们需要编写一个docker-compose.yml文件，用来定义Nextcloud的服务和容器。这里我们使用了三个服务：db，redis和app。db服务使用了mariadb镜像，用来提供数据库支持。redis服务使用了redis镜像，用来提供缓存功能。app服务使用了nextcloud镜像，用来运行Nextcloud的应用程序。我们还使用了一些环境变量和卷，用来配置数据库的密码、用户、名称等，以及挂载数据目录到容器中。我们还指定了app服务的端口为8080，这意味着我们可以通过http://localhost:8080来访问Nextcloud。如果您想使用其他端口，可以修改这个参数。

```yaml
version: '3'

services:
  db:
    image: mariadb # 使用mariadb镜像
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW # 设置事务隔离级别和二进制日志格式
    restart: always # 设置容器重启策略为always
    volumes:
      - db:/var/lib/mysql # 挂载db卷到容器的/var/lib/mysql目录，用来存放数据库文件
    environment:
      - MYSQL_ROOT_PASSWORD=<your_root_password> # 设置数据库的root密码，您需要替换为自己的密码
      - MYSQL_PASSWORD=<your_user_password> # 设置数据库的用户密码，您需要替换为自己的密码
      - MYSQL_DATABASE=nextcloud # 设置数据库的名称为nextcloud
      - MYSQL_USER=nextcloud # 设置数据库的用户为nextcloud

  redis:
    image: redis # 使用redis镜像
    restart: always # 设置容器重启策略为always

  app:
    image: nextcloud # 使用nextcloud镜像
    restart: always # 设置容器重启策略为always
    ports:
      - 8080:80 # 映射容器的80端口到主机的8080端口，用来访问Nextcloud
    volumes:
      - nextcloud:/var/www/html # 挂载nextcloud卷到容器的/var/www/html目录，用来存放Nextcloud的程序文件
    environment:
      - MYSQL_HOST=db # 设置数据库的主机名为db，与db服务的名称相同
      - MYSQL_PASSWORD=<your_user_password> # 设置数据库的用户密码，与db服务的环境变量相同
      - MYSQL_DATABASE=nextcloud # 设置数据库的名称，与db服务的环境变量相同
      - MYSQL_USER=nextcloud # 设置数据库的用户，与db服务的环境变量相同
      - REDIS_HOST=redis # 设置缓存的主机名为redis，与redis服务的名称相同
    depends_on:
      - db # 设置app服务依赖于db服务
      - redis # 设置app服务依赖于redis服务

volumes:
  db: # 定义db卷，用来存放数据库文件
  nextcloud: # 定义nextcloud卷，用来存放Nextcloud的程序文件

```

## 部署记录

最后，我们可以使用docker-compose命令来部署Nextcloud。我们需要在opt/nxd目录下执行以下命令：

```shell
docker-compose up -d
```

这个命令会根据docker-compose.yml文件来创建和启动Nextcloud的服务和容器，并在后台运行。我们可以看到以下的输出：

```shell
root@linux:/opt/nxd# docker-compose up -d
[+] Running 36/36
 ✔ app 19 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                                                                177.5s 
   ✔ 318af44fe185 Pull complete                                                                                                                                               33.7s 
   ✔ ed9eb75e2f2e Pull complete                                                                                                                                              111.2s 
   ✔ bb6a1589be26 Pull complete                                                                                                                                              111.2s 
   ✔ 46b9d509db51 Pull complete                                                                                                                                              116.4s 
   ✔ c1b069ee18a8 Pull complete                                                                                                                                              116.4s 
   ✔ fc306e44a7c8 Pull complete                                                                                                                                              116.5s 
   ✔ 116ffa5d03f3 Pull complete                                                                                                                                              117.0s 
   ✔ 2dc3ab5137dc Pull complete                                                                                                                                              117.1s 
   ✔ 262b5055c905 Pull complete                                                                                                                                              120.2s 
   ✔ 1ea65da8eabf Pull complete                                                                                                                                              120.2s 
   ✔ 51ee24cedb04 Pull complete                                                                                                                                              120.3s 
   ✔ 2107e32d4353 Pull complete                                                                                                                                              120.3s 
   ✔ 363cb14e37dc Pull complete                                                                                                                                              124.6s 
   ✔ e929eea06b91 Pull complete                                                                                                                                              128.5s 
   ✔ 87ef0c8b7557 Pull complete                                                                                                                                              128.5s 
   ✔ a6e91c7dec0d Pull complete
```

这表示Nextcloud已经成功部署了。我们可以在浏览器中输入http://localhost:8080来访问Nextcloud的界面，

此时Nextcloud需要我们输入一个管理员账号和密码，以及数据库的相关信息，来完成安装和配置的过程。我们可以根据自己的喜好选择一个管理员账号和密码，但是数据库的信息必须与docker-compose.yml文件中的环境变量相一致，否则会出现连接错误。
