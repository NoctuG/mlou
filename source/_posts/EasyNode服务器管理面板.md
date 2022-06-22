---
title: EasyNode服务器管理面板
date: 2022-06-22 14:17:33
tags:
- VPS
---

简要说明：基础探针+webssh终端

# 一、服务端

## 1.一键脚本安装

```````bash
wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/chaos-zhu/easynode/master/easynode-server-install.sh | bash
`````````````````````````````````````````````````````````

## 2.Docker安装

* 查看日志：`pm2 log easynode-server`
* 启动服务：`pm2 start easynode-server`
* 停止服务：`pm2 stop easynode-server`
* 停止服务：`pm2 delete easynode-server`

## 3.安装完成：

`````shell
Done in 20.76s.
启动服务
[PM2] Starting /root/easynode-server/app/main.js in fork_mode (1 instance)
[PM2] Done.
┌─────┬────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name               │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching |
├─────┼────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ easynode-server    │ default     │ 0.0.1   │ fork    │ 30555    │ 0s     │ 0    │ online    │ 0%       │ 19.5mb   │ root     │ disabled │
└─────┴────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────│
`````


![1400069b99a277bce58d239a182c1ba1.jpg](https://ttfou.com/images/2022/06/22/1400069b99a277bce58d239a182c1ba1.jpg)


-----------------------

# 二、客户端


# 1.安装：支持后续一键升级


```shell
wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/chaos-zhu/easynode/master/easynode-client-install.sh | bash
```



# 2.卸载：无服务残留


```shell
wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/chaos-zhu/easynode/master/easynode-client-uninstall.sh | bash
```


# 3. 打开 localhost:2022 查看



# 4. 使用


查看客户端状态：


`````bash
systemctl status easynode-client
`````

查看客户端日志: 



`````bash
journalctl --follow -u easynode-client
``````
