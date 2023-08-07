---
abbrlink: docker-nextcloud
categories:
- - 程序
date: '2023-08-07T14:24:38.400558+08:00'
excerpt: 新建目录 mkdir opt/nxd  准备 docker-compose.yml version: '3'  services:   db:     image: mariadb     command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW     restart: always     volumes:     ...
tags:
- VPS
title: Docker安装Nextcloud
updated: 2023-8-7T14:29:8.576+8:0
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
no such service: d
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
   ✔ a6e91c7dec0d Pull complete                                                                                                                                              128.6s 
   ✔ 5e2529c4ad62 Pull complete                                                                                                                                              175.9s 
   ✔ 25cdf4eac15b Pull complete                                                                                                                                              175.9s 
   ✔ 872dcb4dd835 Pull complete                                                                                                                                              176.0s 
 ✔ db 8 layers [⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                                                                             116.7s 
   ✔ 9d19ee268e0d Pull complete                                                                                                                                               74.6s 
   ✔ 718e898a86ff Pull complete                                                                                                                                               74.7s 
   ✔ 43bd7a143a6c Pull complete                                                                                                                                               78.6s 
   ✔ 80cdf483b70a Pull complete                                                                                                                                               78.9s 
   ✔ 8c13b197eea7 Pull complete                                                                                                                                               79.1s 
   ✔ fe76c18bf258 Pull complete                                                                                                                                              115.1s 
   ✔ 67fa5c829e7f Pull complete                                                                                                                                              115.2s 
   ✔ a5cb79f31ff6 Pull complete                                                                                                                                              115.3s 
 ✔ redis 6 layers [⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                                                                             75.3s 
   ✔ 648e0aadf75a Pull complete                                                                                                                                               33.2s 
   ✔ 3b637010cd4d Pull complete                                                                                                                                               33.7s 
   ✔ af4cd59cb295 Pull complete                                                                                                                                               35.4s 
   ✔ 5c4cdbac1c67 Pull complete                                                                                                                                               72.2s 
   ✔ 70c6437ca3ab Pull complete                                                                                                                                               72.5s 
   ✔ 3d38f0110a91 Pull complete                                                                                                                                               72.9s 
[+] Running 6/6
 ✔ Network nxd_default     Created                                                                                                                                             1.0s 
 ✔ Volume "nxd_db"         Created                                                                                                                                             0.0s 
 ✔ Volume "nxd_nextcloud"  Created                                                                                                                                             0.0s 
 ✔ Container nxd-redis-1   Started                                                                                                                                             6.2s 
 ✔ Container nxd-db-1      Started                                                                                                                                             6.9s 
 ✔ Container nxd-app-1     Started                                                                                                                                            21.2s 
```
