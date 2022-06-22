---
title: EasyNode服务器管理面板
date: 2022-06-22 14:17:33
tags:
- VPS
---

简要说明：基础探针+webssh终端

# 服务端

一键脚本安装

```shell
wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/chaos-zhu/easynode/master/easynode-server-install.sh | bash
```

Docker安装

* 查看日志：`pm2 log easynode-server`
* 启动服务：`pm2 start easynode-server`
* 停止服务：`pm2 stop easynode-server`
* 停止服务：`pm2 delete easynode-server`

安装记录：

````bash
root@iZwz91hhe6wa3igyngrc3jZ:~# wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/chaos-zhu/easynode/master/easynode-server-install.sh | bash
开始安装nvm
=> Git clone nvm
Cloning into '/root/.nvm'...
remote: Enumerating objects: 8719, done.
remote: Counting objects: 100% (8719/8719), done.
remote: Compressing objects: 100% (3038/3038), done.
remote: Total 8719 (delta 5591), reused 8719 (delta 5591), pack-reused 0
Receiving objects: 100% (8719/8719), 3.06 MiB | 681.00 KiB/s, done.
Resolving deltas: 100% (5591/5591), done.
Note: checking out 'v0.39.1'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

git checkout -b <new-branch-name>

HEAD is now at 9600617... v0.39.1
=> 添加nvm环境变量(Bash,Zsh)
=> 使用淘宝镜像
=> 安装nvm-update,升级更新请使用该命令
=> 安装完成!
=> 重启终端后生效

nvm version: 0.39.1
开始安装node&npm
Installing latest LTS version.
Downloading and installing node v16.15.1...
Downloading https://nodejs.org/dist/v16.15.1/node-v16.15.1-linux-x64.tar.xz...
######################################################################## 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v16.15.1 (npm v8.11.0)
Creating default alias: default -> lts/* (-> v16.15.1)
node version: v16.15.1 安装成功
npm version: 8.11.0 安装成功
开始安装pm2
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.

added 182 packages in 15s
npm notice
npm notice New minor version of npm available! 8.11.0 -> 8.12.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.12.2
npm notice Run npm install -g npm@8.12.2 to update!
npm notice
pm2 version:
-------------

__/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
_\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
_\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
_\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
_\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
_\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
_\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
_\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
_\///______________\///______________\///__\///////////////__




Runtime Edition

    PM2 is a Production Process Manager for Node.js applications
                 with a built-in Load Balancer.

            Start and Daemonize any application:
            $ pm2 start app.js

            Load Balance 4 instances of api.js:
            $ pm2 start api.js -i 4

            Monitor in production:
            $ pm2 monitor

            Make pm2 auto-boot at server restart:
            $ pm2 startup

            To go further checkout:
            http://pm2.io/


                    -------------


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
│ id  │ name               │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ easynode-server    │ default     │ 0.0.1   │ fork    │ 30555    │ 0s     │ 0    │ online    │ 0%       │ 19.5mb   │ root     │ disabled │
└─────┴────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴────────
``````
