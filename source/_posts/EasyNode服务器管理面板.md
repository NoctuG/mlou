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

## 3.安装记录：



`````shell
[PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
[PM2] PM2 Successfully daemonized
5.2.0 安装成功
开始下载EasyNode
--2022-06-22 14:25:14--  https://ghproxy.com/https://github.com/chaos-zhu/easynode/releases/download/v1.0/easynode-server.zip
Resolving ghproxy.com (ghproxy.com)... 146.56.158.111
Connecting to ghproxy.com (ghproxy.com)|146.56.158.111|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 457356 (447K) [application/octet-stream]
Saving to: ‘/root/easynode-server.zip’

/root/easynode-server.zip             100%[=========================================================================>] 446.64K   535KB/s    in 0.8s

2022-06-22 14:25:17 (535 KB/s) - ‘/root/easynode-server.zip’ saved [457356/457356]

开始解压
Archive:  easynode-server.zip
creating: /root/easynode-server/app/
creating: /root/easynode-server/app/config/
inflating: /root/easynode-server/app/config/index.js
creating: /root/easynode-server/app/config/pem/
extracting: /root/easynode-server/app/config/pem/.gitkeep
creating: /root/easynode-server/app/config/storage/
inflating: /root/easynode-server/app/config/storage/host-list.json
inflating: /root/easynode-server/app/config/storage/key.json
inflating: /root/easynode-server/app/config/storage/ssh-record.json
creating: /root/easynode-server/app/controller/
inflating: /root/easynode-server/app/controller/host-info.js
inflating: /root/easynode-server/app/controller/os-info.js
inflating: /root/easynode-server/app/controller/ssh-info.js
inflating: /root/easynode-server/app/controller/user.js
inflating: /root/easynode-server/app/init.js
creating: /root/easynode-server/app/logs/
extracting: /root/easynode-server/app/logs/.gitkeep
extracting: /root/easynode-server/app/logs/receive.log
inflating: /root/easynode-server/app/main.js
creating: /root/easynode-server/app/middlewares/
inflating: /root/easynode-server/app/middlewares/body.js
inflating: /root/easynode-server/app/middlewares/compress.js
inflating: /root/easynode-server/app/middlewares/cors.js
inflating: /root/easynode-server/app/middlewares/history.js
inflating: /root/easynode-server/app/middlewares/index.js
inflating: /root/easynode-server/app/middlewares/jwt.js
inflating: /root/easynode-server/app/middlewares/log4.js
inflating: /root/easynode-server/app/middlewares/response.js
inflating: /root/easynode-server/app/middlewares/router.js
inflating: /root/easynode-server/app/middlewares/static.js
creating: /root/easynode-server/app/router/
inflating: /root/easynode-server/app/router/index.js
inflating: /root/easynode-server/app/router/routes.js
inflating: /root/easynode-server/app/server.js
creating: /root/easynode-server/app/socket/
inflating: /root/easynode-server/app/socket/clients.js
inflating: /root/easynode-server/app/socket/monitor.js
inflating: /root/easynode-server/app/socket/terminal.js
creating: /root/easynode-server/app/static/
creating: /root/easynode-server/app/static/assets/
inflating: /root/easynode-server/app/static/assets/bg.4d05532a.jpg
inflating: /root/easynode-server/app/static/assets/index.4226ec12.css
inflating: /root/easynode-server/app/static/assets/index.49bfeae7.js
inflating: /root/easynode-server/app/static/favicon.ico
inflating: /root/easynode-server/app/static/index.html
creating: /root/easynode-server/app/static/upload/
extracting: /root/easynode-server/app/static/upload/.gitkeep
creating: /root/easynode-server/app/utils/
inflating: /root/easynode-server/app/utils/index.js
inflating: /root/easynode-server/app/utils/os-data.js
inflating: /root/easynode-server/package.json
inflating: /root/easynode-server/yarn.lock
安装依赖
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

added 1 package in 806ms
yarn install v1.22.19
[1/4] Resolving packages...
[2/4] Fetching packages...
info There appears to be trouble with your network connection. Retrying...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
[1/3] ⠁ cpu-features
[-/3] ⠁ waiting...
warning Error running install script for optional dependency: "/root/easynode-server/node_modules/cpu-features: Command failed.
Exit code: 1
Command: node buildcheck.js > buildcheck.gypi && node-gyp rebuild
Arguments:
Directory: /root/easynode-server/node_modules/cpu-features
Output:
gyp info it worked if it ends with ok
gyp info using node-gyp@9.0.0
gyp info using node@16.15.1 | linux | x64
gyp ERR! find Python
gyp ERR! find Python Python is not set from command line or npm configuration
gyp ERR! find Python Python is not set from environment variable PYTHON
gyp ERR! find Python checking if \"python3\" can be used
gyp ERR! find Python - executable path is \"/usr/bin/python3\"
gyp ERR! find Python - version is \"3.5.3\"
gyp ERR! find Python - version is 3.5.3 - should be >=3.6.0
gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
gyp ERR! find Python checking if \"python\" can be used
gyp ERR! find Python - executable path is \"/usr/bin/python\"
gyp ERR! find Python - version is \"2.7.13\"
gyp ERR! find Python - version is 2.7.13 - should be >=3.6.0
gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
gyp ERR! find Python
gyp ERR! find Python **********************************************************
gyp ERR! find Python You need to install the latest version of Python.
gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
gyp ERR! find Python you can try one of the following options:
gyp ERR! find Python - Use the switch --python=\"/path/to/pythonexecutable\"
gyp ERR! find Python   (accepted by both node-gyp and npm)
gyp ERR! find Python - Set the environment variable PYTHON
gyp ERR! find Python - Set the npm configuration variable python:
gyp ERR! find Python   npm config set python \"/path/to/pythonexecutable\"
gyp ERR! find Python For more information consult the documentation at:
gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
gyp ERR! find Python **********************************************************
gyp ERR! find Python
gyp ERR! configure error
gyp ERR! stack Error: Could not find any Python installation to use
gyp ERR! stack     at PythonFinder.fail (/root/.nvm/versions/node/v16.15.1/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:330:47)
gyp ERR! stack     at PythonFinder.runChecks (/root/.nvm/versions/node/v16.15.1/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:159:21)
gyp ERR! stack     at PythonFinder.<anonymous> (/root/.nvm/versions/node/v16.15.1/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:266:16)
gyp ERR! stack     at PythonFinder.execFileCallback (/root/.nvm/versions/node/v16.15.1/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:297:7)
gyp ERR! stack     at ChildProcess.exithandler (node:child_process:390:7)
gyp ERR! stack     at ChildProcess.emit (node:events:527:28)
gyp ERR! stack     at maybeClose (node:internal/child_process:1092:16)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (node:internal/child_process:302:5)
gyp ERR! System Linux 4.9.0-12-amd64
gyp ERR! command \"/root/.nvm/versions/node/v16.15.1/bin/node\" \"/root/.nvm/versions/node/v16.15.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js\" \"rebuild\"
gyp ERR! cwd /root/easynode-server/node_modules/cpu-features
gyp ERR! node -v v16.15.1
gyp ERR! node-gyp -v v9.0.0
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
