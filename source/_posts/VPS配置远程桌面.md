---
abbrlink: 2b71a36f
categories:
- - 技术
date: '2024-10-23T17:45:47.391253+08:00'
excerpt: 这篇文章介绍了如何为RDP服务创建专门的用户rdpserver并设置与root不同的密码。首先，更新系统并安装必要的软件包，然后创建一个新用户并设置密码。接下来，修改sshd配置文件，以确保用户登录时使用的是密码而非密钥。最后，重启SSH服务以应用更改。
tags:
- VPS
title: VPS配置远程桌面
updated: '2024-10-23T20:11:42.573+08:00'
---
修改后的文章，介绍如何为 RDP 服务创建专门的用户 `rdpserver` 并设置与 `root` 不同的密码：

---

### 1. 更新系统并安装必要的软件包

首先，确保系统是最新的。运行以下命令来更新系统并安装所有必要的软件包：

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. 安装 XFCE4 桌面环境

接下来，安装轻量级的 XFCE4 桌面环境：

```bash
sudo apt install xfce4 xfce4-goodies -y
```

### 3. 安装 XRDP 服务

XRDP 是一个允许你通过 RDP 协议远程连接到服务器的工具。安装 XRDP：

```bash
sudo apt install xrdp -y
```

### 4. 配置 XRDP 使用 XFCE4

XRDP 默认使用 Xvnc 作为会话类型。为了使用 XFCE4，需要编辑 XRDP 的会话配置文件：

```bash
sudo nano /etc/xrdp/startwm.sh
```

找到以下两行并注释掉它们（在行首加上 `#`）：

```bash
# test -x /etc/X11/Xsession && exec /etc/X11/Xsession
# exec /bin/sh /etc/X11/Xsession
```

然后在文件末尾添加以下内容，启用 XFCE4：

```bash
startxfce4
```

保存并关闭文件（按 `Ctrl+X`，然后按 `Y` 保存并退出）。

### 5. 创建一个专用用户 `rdpserver` 并设置密码

为了安全起见，建议为 RDP 服务创建一个单独的用户，而不是使用 `root` 用户。执行以下命令创建名为 `rdpserver` 的用户，并为其设置一个与 `root` 不同的密码：

```bash
sudo adduser rdpserver
```

按照提示设置新密码。确保密码与 `root` 的密码不同，以增加安全性。

### 6. 允许 XRDP 使用 `rdpserver` 用户

XRDP 使用 `xrdp` 用户组进行身份验证。将新创建的 `rdpserver` 用户添加到必要的组中：

```bash
sudo usermod -aG ssl-cert rdpserver
```

### 7. 启动并启用 XRDP 服务

接下来，启动 XRDP 并配置它在系统启动时自动启动：

```bash
sudo systemctl enable xrdp
sudo systemctl start xrdp
```

### 8. 配置防火墙以允许 RDP 连接

如果启用了防火墙（例如 UFW），需要允许 RDP 流量通过默认端口 3389：

```bash
sudo ufw allow 3389/tcp
```

### 9. 使用 RDP 客户端连接到 VPS

配置完成后，你可以使用支持 RDP 协议的客户端（如 Windows 的远程桌面连接工具 `mstsc`）连接到你的 VPS。

- **IP 地址**：VPS 的公网 IP 地址
- **用户名**：`rdpserver`
- **密码**：刚设置的 `rdpserver` 用户的密码

这样，RDP 服务会使用 `rdpserver` 用户进行连接，而不会暴露 `root` 用户，提升了系统的安全性。
