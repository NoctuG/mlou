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
updated: '2022-08-19 21:51:02'
---# 一、运行环境

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

# 三、实用应用程序

## 1.prometheus+grafana 探针

### （1）grafana主控安装

```
mkdir /data/grafana/storage
chmod 777 /data/grafana/storage
docker run -d -p 3000:3000 --name=grafana -v /data/grafana/storage:/var/lib/grafana grafana/grafana
```

访问`http://ip:3000/login`，默认账号密码都是admin

`node_exporter`配置（被控执行）

```shell
wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
tar xvf node_exporter-1.3.1.linux-amd64.tar.gz
mv node_exporter-1.3.1.linux-amd64 /usr/local/bin/node_exporter
groupadd prometheus
useradd -g prometheus -m -d /var/lib/prometheus -s /sbin/nologin prometheus
mkdir /usr/local/prometheus
chown prometheus.prometheus -R /usr/local/prometheus
nano /etc/systemd/system/node_exporter.service
```

`node_exporter.service` 填入

```shell
[Unit]
Description=node_exporter
Documentation=https://prometheus.io/
After=network.target
[Service]
Type=simple
User=prometheus
ExecStart=/usr/local/bin/node_exporter/node_exporter --collector.processes  --collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc)($|/)
Restart=on-failure
[Install]
WantedBy=multi-user.target
```

### （2）进程管理

```shell
systemctl daemon-reload
systemctl restart node_exporter.service
systemctl enable node_exporter.service
systemctl start node_exporter.service
systemctl status node_exporter
```

执行后防火墙放行9100端口，访问 IP:9100,有输出就成功

## （3）prometheus主控执行

```shell
mkdir /data/prometheus.yml
vim prometheus.yml
```

右键粘贴配置——

```yml
global:
  scrape_interval:     60s
  evaluation_interval: 60s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ['localhost:9090']
        labels:
          instance: prometheus
  - job_name: 名称
    static_configs:
      - targets: ['被监控ip1:9100']
        labels:
          instance: 名称1
      - targets: ['被监控ip2:9100']
        labels:
          instance: 名称2
```

### （4）启动prometheus

```docker
docker run  -d -p 9090:9090 -v /data/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

> 引用于
> https://hostloc.com/thread-946383-1-1.html

## 2.通过Docker部署Office E5开发者订阅续期脚本实现自动续期

### （1）注册Azure应用

用请默认域名为 `@xxxx.onmicrosoft.com`的子账号

登录Azure,[https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps](https://haoduck.com/go.html?url=https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)

注册azure应用,确保应用有以下权限:
`files: Files.Read.All、Files.ReadWrite.All、Sites.Read.All、Sites.ReadWrite.All`
`user:User.Read.All、User.ReadWrite.All、Directory.Read.All、Directory.ReadWrite.All`
`mail: Mail.Read、Mail.ReadWrite、MailboxSettings.Read、MailboxSettings.ReadWrite`

重定向URL写 `http://localhost`即可，如果你还需要用其他Onedrive列表程序，可以把它们的重定向URL都写上去，比如这些。[https://haoduck.com/578.html](https://haoduck.com/578.html)
注册后一定要再点代表xxx授予管理员同意,否则outlook api无法调用

二、安装Rclone和获取 `refresh_token`

Rclone官网下载地址：[https://rclone.org/downloads/](https://haoduck.com/go.html?url=https://rclone.org/downloads/)

Linux下可以直接用官方一键脚本 `curl https://rclone.org/install.sh | sudo bash`

怎么安装就不多说了，直接到配置这一块

配置 `Onedrive`，其实也没什么好说的，就不上图了

到最后一步完成了，就能看到 `refresh_token`了，是 `0.A`开头的一长串，注意不要复制多了，也不要复制少了。

### 使用Docker镜像

`docker run -dit --name e5renew --restart always \<br/>-e id="你的id" \<br/>-e secret="你的secret" \<br/>-e refresh_token="你的refresh_token" \<br/>haoduck/e5renew`

平均每隔6小时调用API一次，这个6小时不是固定的，随机范围在十几分钟到2个多小时

### 一键脚本

`bash <(curl -sL https://raw.githubusercontent.com/haoduck/E5Renew/main/onekey.sh)`
或
`bash <(curl -sL https://cdn.jsdelivr.net/gh/haoduck/E5Renew@main/onekey.sh)`

### 查看运行日志

Docker的运行日志 `docker logs e5renew`

脚本的定时日志(等下次运行了才会有)`docker exec e5renew cat /work/crontab.log`

其中，`docker logs e5renew`里的 `e5renew`是容器名，如果你有自定义容器名，对应修改命令。查看定时日志的命令同理。

> [ https://haoduck.com/848.html]()
>
