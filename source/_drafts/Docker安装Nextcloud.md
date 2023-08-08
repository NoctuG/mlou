---
abbrlink: docker-nextcloud
categories:
- - 程序
date: '2023-08-07T14:24:38.400558+08:00'
excerpt: 新建目录 mkdir opt/nxd  准备 docker-compose.yml version: '3'  services:   db:     image: mariadb     command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW     restart: always     volumes:     ...
tags:
- VPS
title: Docker安装Nextcloud
updated: 2023-8-8T21:56:22.333+8:0
---
新建目录

```shell
mkdir opt/nxd
```

准备 `docker-compose.yml`

```yaml
version: '3'

services:
  db:
    image: mariadb
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    restart: always
    volumes:
      - db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=<your_root_password>
      - MYSQL_PASSWORD=<your_user_password>
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  redis:
    image: redis
    restart: always

  app:
    image: nextcloud
    restart: always
    ports:
      - 8080:80 # change this if you want to use a different port for Nextcloud
    volumes:
      - nextcloud:/var/www/html
    environment:
      - MYSQL_HOST=db
      - MYSQL_PASSWORD=<your_user_password>
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis

volumes:
  db:
  nextcloud:

```

部署记录

```shell
root@linux:/opt/nxd# docker-compose up d
[+] Running 22/22
 ✔ nextcloud 9 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                                                                     321.1s 
   ✔ 288f10deefc5 Pull complete                                                                                                                                                1.5s 
   ✔ 8bc286c87514 Pull complete                                                                                                                                                1.6s 
   ✔ fc17cd253e4c Pull complete                                                                                                                                                1.6s 
   ✔ fe000ddf37eb Pull complete                                                                                                                                                3.0s 
   ✔ 4801a1684981 Pull complete                                                                                                                                                3.0s 
   ✔ 422e43ed2adb Pull complete                                                                                                                                                4.7s 
   ✔ db9a099c1150 Pull complete                                                                                                                                                4.8s 
   ✔ cd10ad655eb6 Pull complete                                                                                                                                              320.2s 
   ✔ e62121bbe6bc Pull complete                                                                                                                                              320.3s 
 ✔ mysql 11 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                                                                      246.5s 
   ✔ 49bb46380f8c Pull complete                                                                                                                                               48.0s 
   ✔ aab3066bbf8f Pull complete                                                                                                                                               48.1s 
   ✔ d6eef8c26cf9 Pull complete                                                                                                                                               48.2s 
   ✔ 0e908b1dcba2 Pull complete                                                                                                                                               49.3s 
   ✔ 480c3912a2fd Pull complete                                                                                                                                               49.6s 
   ✔ 264c20cd4449 Pull complete                                                                                                                                               50.5s 
   ✔ d7afa4443f21 Pull complete                                                                                                                                              127.8s 
   ✔ d32c26cb271e Pull complete                                                                                                                                              127.9s 
   ✔ f1f84a2204cb Pull complete                                                                                                                                              237.3s 
   ✔ 9a41fcc5b508 Pull complete                                                                                                                                              237.4s 
   ✔ 7b8402026abb Pull complete                                                                                                                                              237.4s 
[+] Running 3/3
 ✔ Network nextcloud_default  Created                                                                                                                                          0.7s 
 ✔ Container nextcloud        Started                                                                                                                                          6.9s 
 ✔ Container nextcloud-db     Started                
```
