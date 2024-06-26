---
abbrlink: 816684ea
categories:
- - 技术
date: '2024-05-01T21:34:36.740487+08:00'
excerpt: 这篇文章介绍了DoH&ECH技术，它能为网络浏览提供双重保护。类似于保护信件不被他人偷看，这项技术保护用户网上活动不被窥探。通过使用DoH（DNS over HTTPS）和ECH（Encrypted Client Hello）协议，所有网络通信都被加密，确保用户数据安全，隐私得到保护。
tags:
- Internet
title: DoH&ECH——开启与使用
updated: '2024-06-18T23:05:13.595+08:00'
---
# DoH&ECH——为您的网上冲浪加上双重保护罩

## 引言

在这个信息爆炸的时代，我们的每一次点击、每一次搜索都可能被他人窥探。就像我们不希望别人偷看我们的信件一样，我们的网上活动也需要保护。为了让我们在网上冲浪时更安心，科技专家们开发了两项厉害的技术：DNS over HTTPS（简称DoH）和Encrypted Client Hello（简称ECH）。这两项技术就像是给我们的网上活动加上了一层又一层的保护罩。本文将用通俗易懂的语言，带您了解这两项技术的神奇之处。

## DoH和ECH：您的网上隐私卫士

### 为什么它们很重要？

想象一下，DoH就像是一个隐形的信封，把您想访问的网站名字悄悄地传递给网络管理员，不让路上的人偷看。而ECH则是一个神奇的面具，让您在与网站打招呼时保持神秘感，不被其他人认出来。这两项技术合起来，就能让您在网上畅游时更加自在，不用担心被人跟踪或窥探。

## DoH：您的秘密向导

### DoH是如何工作的？

传统的上网方式就像是在街上大声喊出您要去的地方，路人都能听到。而DoH就像是用对讲机悄悄告诉一个可信的向导，让他帮您指路。这样，即使有人在偷听，也只能听到一串加密的悄悄话，完全不知道您要去哪里。

### DoH比传统方式好在哪里？

1. **更私密**：就像用密码本写信，别人看不懂您在问路。
2. **更安全**：防止坏人故意把您带到假网站。
3. **更自由**：有些地方可能会限制您访问某些网站，DoH可以帮您绕过这些限制。

### 如何在浏览器中开启DoH？

不同的浏览器设置方法略有不同，但基本上都是在"设置"或"选项"中找到"安全"或"隐私"相关的选项，然后开启"安全DNS"或"DNS over HTTPS"功能。具体步骤可以参考文章中的说明，或查阅浏览器的帮助文档。

{% notel red 提示 %}

**主流浏览器中DoH的配置方法**

* **Google Chrome**：进入设置 > 安全和隐私 > 安全，开启“使用安全DNS”并选择提供商。
* **Mozilla Firefox**：进入选项 > 一般 > 网络设置 > 设置，勾选“启用DNS over HTTPS”并选择提供商。
* **Microsoft Edge**：进入设置 > 隐私、搜索和服务 > 安全，开启“使用安全DNS”并选择提供商。

{% endnotel %}

## ECH技术详解

### ECH：您的神秘面具

### ECH是如何工作的？

当您访问一个网站时，浏览器需要和网站打个招呼。传统方式就像是直接报上自己的大名，而ECH则是戴上了一个神奇的面具，只有目标网站才能认出您来。这样，路上的其他人就无法知道您到底是谁，要去哪里。

### ECH如何保护您的隐私？

ECH就像是给您的网上身份加了一层迷雾，让别人无法通过您和网站打招呼的方式猜测您要访问哪个网站。这样，您的网上活动就更加私密和安全。

### ECH目前的使用情况

ECH还是一项比较新的技术，就像是刚刚发明的新式雨伞，还没有被广泛使用。但是，越来越多的浏览器和网站正在努力支持这项技术，相信在不久的将来，我们都能享受到ECH带来的好处。

## DoH和ECH：双剑合璧

### 两项技术一起使用有什么好处？

如果说DoH是给您的网上活动加了一层隐形衣，那ECH就是再加一层隐身斗篷。两者一起使用，就能让您在网上活动时更加安心，不用担心被跟踪或窥探。

### 如何同时使用这两项技术？

1. 首先按照前面的说明在浏览器中开启DoH。
2. 对于ECH，由于它还比较新，可能需要使用一些特殊版本的浏览器或进行一些高级设置。如果您对计算机不是很熟悉，可以等待浏览器在未来的版本中自动支持这项功能。

## 可能遇到的小问题及解决方法

### 兼容性问题

有时候，使用这些新技术可能会遇到一些小障碍，就像使用新发明的雨伞可能一时不太习惯。如果遇到网站打不开或者速度变慢的情况，可以尝试暂时关闭这些功能，或者更新您的浏览器到最新版本。

### 如何让上网速度更快？

使用这些保护技术可能会让上网速度稍微变慢一些，就像戴上雨衣可能会让走路速度变慢。但是不用担心，您可以：

- 选择一些快速可靠的DNS服务器，比如Cloudflare、Google或OpenDNS提供的服务。
- 使用性能较好的电脑和浏览器，这样就像穿上轻便的雨衣，既保护又不影响速度。

## 总结

DoH和ECH就像是给您的网上冲浪加上了双重保护罩。虽然现在这些技术还在不断完善中，但它们代表了互联网隐私保护的未来。通过使用这些技术，我们可以在享受互联网便利的同时，也保护好自己的隐私。让我们一起期待更安全、更私密的网络世界！
