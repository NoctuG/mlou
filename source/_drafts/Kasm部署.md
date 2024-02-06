---
abbrlink: 5236716e
categories:
- - 技术
date: '2024-01-25T19:30:43.062380+08:00'
excerpt: 这篇文章介绍了Kasm 平台，它是一个通过网络交付的应用程序流式传输平台，可以通过网络浏览器将浏览器、桌面和自定义应用程序安全地传送到终端用户的设备上。Kasm Workspaces 使用容器化的工作环境，可以分配给用户，并且可以通过网络浏览器访问，无需任何额外的客户端软件。Kasm 应用程序是为高安全性环境和需要安全访问应用程序或桌面的远程用户而设计的。文章还介绍了Kasm的部署方法和资源配置要求，并提供了安装成功后的输出信息。
tags:
- Docker
title: Kasm部署
updated: '2024-02-06T19:26:24.413+08:00'
---
# Kasm 介绍

Kasm 是一个通过网络交付的应用程序流式传输平台，它提供了一种创新的方式，通过网络浏览器将浏览器、桌面和自定义应用程序安全地传送到终端用户的设备上。Kasm Workspaces 使用容器化的工作环境，可以分配给用户，并且可以通过网络浏览器访问，无需任何额外的客户端软件。

Kasm 应用程序是为高安全性环境和需要安全访问应用程序或桌面的远程用户而设计的。Kasm 通过使用容器化的方法实现这一目标，每个会话都相互隔离，为每个用户提供一个安全的、按需的工作空间。

# 资源配置要求

* 安装了 Docker。
* 有足够的磁盘空间用于存放 Kasm 镜像和容器。（至少推荐 10GB）
* 至少 2 个 CPU 核心（根据使用情况，可能需要更多）。

# 部署方法

**使用第三方镜像**

```docker
docker run -d \
  --name=kasm \
  --privileged \
  -e KASM_PORT=4443 \
  -p 3000:3000 \
  -p 4443:443 \
  -v /opt/kasm:/opt \
  --restart unless-stopped \
  lscr.io/linuxserver/kasm:latest
```

**使用命令行**

```bash
cd /tmp
curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_1.14.0.3a7abb.tar.gz
tar -xf kasm_release_1.14.0.3a7abb.tar.gz
sudo bash kasm_release/install.sh -L 8443
```

**安装成功输出**

```bash
Installation Complete


Kasm UI Login Credentials

------------------------------------
  username: admin@kasm.local
  password: FTb9DXjP9f2nI
------------------------------------
  username: user@kasm.local
  password: 1PDxQvo9ALm0L
------------------------------------

Kasm Database Credentials
------------------------------------
  username: kasmapp
  password: gtI4Ze5Y631lIFfmizLD
------------------------------------

Kasm Redis Credentials
------------------------------------
  password: NzC9yfAE3Vb5M86VSdde
------------------------------------

Kasm Manager Token
------------------------------------
  password: cAI2bY7oaQ0SVXT3q06V
------------------------------------

Kasm Guac Token
------------------------------------
  password: ZiYjURUj0U29jAg3aiIF8R
------------------------------------

Service Registration Token
------------------------------------
  password: kRXhhkP8rBNPt15mqaas
------------------------------------
```

**容器状态**

```bash
root ➜ /tmp $ docker container ls
CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS                    PORTS                                               NAMES
1c9a899ff21a   kasmweb/nginx:1.25.1       "/docker-entrypoint.…"   15 minutes ago   Up 15 minutes             80/tcp, 0.0.0.0:8443->8443/tcp, :::8443->8443/tcp   kasm_proxy
313cd1673891   kasmweb/share:1.14.0       "/bin/sh -c '/usr/bi…"   15 minutes ago   Up 15 minutes (healthy)   8182/tcp                                            kasm_share
d9e1bfd7efb8   kasmweb/agent:1.14.0       "/bin/sh -c '/usr/bi…"   15 minutes ago   Up 15 minutes (healthy)   4444/tcp                                            kasm_agent
6aeca029de4a   kasmweb/api:1.14.0         "/bin/sh -c '/usr/bi…"   15 minutes ago   Up 15 minutes (healthy)   8080/tcp                                            kasm_api
6e381cda27cf   kasmweb/kasm-guac:1.14.0   "/dockerentrypoint.sh"   15 minutes ago   Up 15 minutes (healthy)                                                       kasm_guac
badba3ab8207   kasmweb/manager:1.14.0     "/bin/sh -c '/usr/bi…"   15 minutes ago   Up 15 minutes (healthy)   8181/tcp                                            kasm_manager
153ea8f0ce70   redis:5-alpine             "docker-entrypoint.s…"   15 minutes ago   Up 15 minutes             6379/tcp                                            kasm_redis
b1cee51f0c6c   postgres:12-alpine         "docker-entrypoint.s…"   16 minutes ago   Up 15 minutes (healthy)   5432/tcp                                            kasm_db
```
