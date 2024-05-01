---
abbrlink: 816684ea
categories: []
date: '2024-05-01T21:34:36.740487+08:00'
excerpt: 简介 DoH（DNS over HTTPS）和 ECH（Encrypted Client Hello）是两种旨在增强网络通信隐私和安全性的新技术。它们通过加密某些易受攻击的通信部分，使得第三方更难以窃听或篡改网络流量。 DoH（DNS over HTTPS） 传统的 DNS 查询是以明文形式发送的，这意味着任何在网络路径上的人都可以看到您正在访问哪些域名。DoH 通过将 DNS 查询封装在加密的 HTTPS 连接中来解决这个问题。这样，网络上的其他人就无法轻易地监视您的 DNS 查询。 在系统中配置 DoH  Android：在&quot;设置&quot;&gt;&quot;网络和互联网&quot;&gt;&quot;私人 DNS&quot;中，选择一个支持 DoH 的提供商（如 Cloudflare 的 1dot1dot1dot1.cloudflare-dns.com）。 iOS：目前，iOS 尚未内置对 DoH 的支持。但您可以使用支持 DoH 的第三方 DNS 应用程序，如 DNSCloak 或 Cloudflare 1.1.1.1。 Windows：在&quot;设置&quot;&gt;&quot;网络和 Internet&quot;&gt;&quot;状态&quot;&gt;&quot;更改适配器选项&quot;中，右键单击您的网络连接并选择&quot;属性&quot;。选择&quot;Internet 协议版本 4 (TCP/IPv4)&quot;，单击&quot;属性&quot;，然后单击&quot;使用以下 DNS 服务器地址&quot;。输入支持 DoH 的 DNS 服务器的 IP 地址（如 Cloudflare 的 1.1.1.1 和 1.0.0.1）。  在 Firefox 中配置 DoH  在地址栏中输入 about:preferences#general 并按回车键。 滚动到&quot;网络设置&quot;部分，单击&quot;设置&quot;。 选择&quot;启用基于 HTTPS 的 DNS&quot;，然后选择一个提供商或输入自定义的 DoH 解析器 URL。  ECH（Encrypted Client Hello） ECH 是 TLS 1.3 的一个扩展，旨在加密 ClientHello 消息中的某些字段，特别是 SNI（Server Name Indication）字段。SNI 用于指示客户端想要连接的目标服务器的域名。 在 Firefox 中启用 ECH  在地址栏中输入 about:config 并按回车键。 搜索 network.dns.echconfig.enabled，双击将其值设置为 true。  请注意，ECH 仍处于试验阶段，并非所有网站都支持。 
tags: []
title: DoH 与 ECH：增强隐私保护的新技术
updated: '2024-05-01T22:21:13.112+08:00'
---
## 简介

DoH（DNS over HTTPS）和 ECH（Encrypted Client Hello）是两种旨在增强网络通信隐私和安全性的新技术。它们通过加密某些易受攻击的通信部分，使得第三方更难以窃听或篡改网络流量。

## DoH（DNS over HTTPS）

传统的 DNS 查询是以明文形式发送的，这意味着任何在网络路径上的人都可以看到您正在访问哪些域名。DoH 通过将 DNS 查询封装在加密的 HTTPS 连接中来解决这个问题。这样，网络上的其他人就无法轻易地监视您的 DNS 查询。

### 在系统中配置 DoH

- Android：在"设置">"网络和互联网">"私人 DNS"中，选择一个支持 DoH 的提供商（如 Cloudflare 的 `1dot1dot1dot1.cloudflare-dns.com`）。
- iOS：目前，iOS 尚未内置对 DoH 的支持。但您可以使用支持 DoH 的第三方 DNS 应用程序，如 DNSCloak 或 Cloudflare 1.1.1.1。
- Windows：在"设置">"网络和 Internet">"状态">"更改适配器选项"中，右键单击您的网络连接并选择"属性"。选择"Internet 协议版本 4 (TCP/IPv4)"，单击"属性"，然后单击"使用以下 DNS 服务器地址"。输入支持 DoH 的 DNS 服务器的 IP 地址（如 Cloudflare 的 `1.1.1.1` 和 `1.0.0.1`）。

### 在 Firefox 中配置 DoH

1. 在地址栏中输入 `about:preferences#general` 并按回车键。
2. 滚动到"网络设置"部分，单击"设置"。
3. 选择"启用基于 HTTPS 的 DNS"，然后选择一个提供商或输入自定义的 DoH 解析器 URL。

## ECH（Encrypted Client Hello）

ECH 是 TLS 1.3 的一个扩展，旨在加密 ClientHello 消息中的某些字段，特别是 SNI（Server Name Indication）字段。SNI 用于指示客户端想要连接的目标服务器的域名。

### 在 Firefox 中启用 ECH

1. 在地址栏中输入 `about:config` 并按回车键。
2. 搜索 `network.dns.echconfig.enabled`，双击将其值设置为 `true`。

请注意，ECH 仍处于试验阶段，并非所有网站都支持。
