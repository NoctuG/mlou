---
abbrlink: 5236716e
categories:
- - 技术
date: '2024-01-25T19:30:43.062380+08:00'
excerpt: 这篇文章介绍了一个摘要生成工具的安装过程。文章中提供了安装所需的命令和文件链接，以及安装成功后的登录凭据和各种凭证。最后，文章列出了各个容器的状态信息。
tags:
- Docker
title: Kasm部署
updated: '2024-01-25T19:35:37.993+08:00'
---
```bash
cd /tmp
curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_1.14.0.3a7abb.tar.gz
tar -xf kasm_release_1.14.0.3a7abb.tar.gz
sudo bash kasm_release/install.sh -L 8443
```

安装成功：

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

容器状态：

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
