---
abbrlink: vps-bbr
categories:
- - VPS
date: '2023-07-01T14:20:36.774966+08:00'
excerpt: 介绍 BBR 是一种基于 TCP 的拥塞控制算法，由 Google 开发，旨在提高网络传输的速度和稳定性。BBR 可以有效地利用带宽，减少延迟，抵抗丢包，避免缓冲区膨胀等问题。BBR 已经被集成到 Linux 内核中，只需要简单的配置就可以启用。本文将介绍如何在 Linux VPS 上安装 BBR，并测试其效果。 前提条件  推荐使用 Ubuntu 或 Debian 系统。 需要至少 256M 空...
tags:
- 网络
title: 如何在Linux VPS 上安装 BBR
updated: 2023-7-1T14:33:56.754+8:0
---
### 介绍

BBR 是一种基于 TCP 的拥塞控制算法，由 Google 开发，旨在提高网络传输的速度和稳定性。BBR 可以有效地利用带宽，减少延迟，抵抗丢包，避免缓冲区膨胀等问题。BBR 已经被集成到 Linux 内核中，只需要简单的配置就可以启用。本文将介绍如何在 Linux VPS 上安装 BBR，并测试其效果。

### 前提条件

- 推荐使用 Ubuntu 或 Debian 系统。
- 需要至少 `256M` 空闲运存。
- 一个 SSH 客户端，如 PuTTY 或 Xshell。
- 已经在主机商提供的控制面板上打开TUN/TAP

判断是否成功打开TUN/TAP

```bash
cat /dev/net/tun
```

返回值如下即为打开成功

```bash
File descriptor in bad state
```

### 一、更新系统

首先，我们需要更新系统，确保安装了最新的软件包和内核。登录到 VPS 后，执行以下命令：

```bash
sudo apt update
sudo apt upgrade
```

如果系统提示需要重启，选择是并重启 VPS。

### 二、检查内核版本

BBR 需要 Linux 内核版本至少为 4.9，我们可以使用以下命令来检查当前的内核版本：

```bash
uname -r
```

如果输出的版本号小于 4.9，我们需要安装一个更高版本的内核。我们可以使用以下命令来安装最新的稳定版内核：

```bash
sudo apt install linux-image-generic
```

安装完成后，重启 VPS，并再次检查内核版本。

### 三、启用 BBR

现在我们已经有了支持 BBR 的内核，我们只需要修改一些系统参数来启用 BBR。我们可以使用以下命令来编辑 `/etc/sysctl.conf` 文件：

```bash
sudo nano /etc/sysctl.conf
```

在文件末尾添加以下内容：

```bash
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr
```

保存并退出文件。然后执行以下命令来应用修改：

```bash
sudo sysctl -p
```

我们可以使用以下命令来检查 BBR 是否已经启用：

```bash
sysctl net.ipv4.tcp_congestion_control
```

如果输出为 `net.ipv4.tcp_congestion_control = bbr`，则说明 BBR 已经成功启用。

### 四、测试 BBR

为了测试 BBR 的效果，我们可以使用一些网络测速工具来比较开启和关闭 BBR 时的网络性能。例如，我们可以使用 speedtest-cli 来测试下载和上传速度。我们可以使用以下命令来安装 speedtest-cli：

```bash
sudo apt install speedtest-cli
```

然后执行以下命令来进行测速：

```bash
speedtest-cli
```

输出结果类似于：

```bash
Retrieving speedtest.net configuration...
Testing from Google Cloud (35.201.245.13)...
Retrieving speedtest.net server list...
Selecting best server based on ping...
Hosted by Google Cloud (Singapore) [0.59 km]: 1.554 ms
Testing download speed................................................................................
Download: 1877.57 Mbit/s
Testing upload speed......................................................................................................
Upload: 1005.32 Mbit/s
```

我们可以记录下开启 BBR 时的测速结果，并且关闭 BBR 后再次进行测速。关闭 BBR 的方法是将 `/etc/sysctl.conf` 文件中的 `net.ipv4.tcp_congestion_control=bbr` 改为 `net.ipv4.tcp_congestion_control=cubic`，并执行 `sudo sysctl -p` 命令。然后我们可以比较两次测速的结果，看看 BBR 是否有提升网络性能。

---

# 使用一键脚本

```bash
bash <(curl -Lso- https://git.io/kernel.sh)
```
