---
abbrlink: 2b71a36f
categories:
- - 技术
date: '2024-10-23T17:45:47.391253+08:00'
excerpt: 这篇文章介绍了在Linux系统上，如何通过命令行更新系统、安装必要的软件包以及安装XFCE4桌面环境的步骤。首先，使用sudo apt update &amp;&amp; sudo apt upgrade -y命令更新系统和安装必要的软件包。然后，运行sudo apt install xfce4命令安装XFCE4桌面环境。
tags:
- VPS
title: VPS配置远程桌面
updated: '2024-10-23T18:07:41.904+08:00'
---
### 1. 更新系统和安装必要的软件包

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. 安装 XFCE4 桌面环境

运行以下命令：

```bash
sudo apt install xfce4 xfce4-goodies -y
```

### 3. 安装 XRDP

安装 XRDP——RDP 服务器：

```bash
sudo apt install xrdp -y
```

### 4. 配置 XRDP 使用 XFCE4

XRDP 默认使用 `Xvnc` 作为会话类型，但我们要配置它使用 XFCE4，因此编辑 XRDP 会话文件：

```bash
sudo nano /etc/xrdp/startwm.sh
```

找到文件中的以下两行并注释掉它们（在行前面加上 `#`）：

```bash
# test -x /etc/X11/Xsession && exec /etc/X11/Xsession
# exec /bin/sh /etc/X11/Xsession
```

然后在文件末尾添加以下内容以启用 XFCE4：

```bash
startxfce4
```

保存并关闭文件（按 `Ctrl+X`，然后按 `Y` 保存并退出）。

### 5. 允许 XRDP 使用你的用户

XRDP 使用 `xrdp` 用户进行身份验证，确保该用户被添加到允许使用的组中：

```bash
sudo adduser xrdp ssl-cert
```

### 6. 启动并启用 XRDP 服务

启动 XRDP 并让它在系统启动时自动启动：

```bash
sudo systemctl enable xrdp
sudo systemctl start xrdp
```

### 7. 配置防火墙（如果启用了 UFW）

如果 VPS 启用了防火墙（例如 UFW），你需要允许 RDP 流量通过端口 3389：

```bash
sudo ufw allow 3389/tcp
```

### 8. 使用 RDP 客户端连接到 VPS

配置完成后，即可使用任何支持 RDP 协议的客户端（例如 Windows 的远程桌面连接工具，`mstsc`）连接到你的 VPS。连接时使用你的 VPS 的 IP 地址和默认端口 `3389`。

- IP 地址：VPS 的公网 IP
- 用户名：你 VPS 上的用户名
- 密码：你 VPS 用户的密码
