---
abbrlink: amd-update-trouble-slove
categories:
- 技术
- life
date: '2022-08-08 22:11:23'
excerpt: 在进行Windows系统升级后AMD报错，导致屏幕分辨率自动降低，其解决过程略微有些复杂，特此记录一下。 故障再现 解决过程 1 调整更新设置 在系统属性中找到硬件部分
  点击设备安装设置 选择 "否（你的设备可能无法像预期那样工作），然后点击保存更改 重装显卡驱动 卸载原有的驱动 找到设备管理器中的 AMD Radeon Vega
  8 右键卸载 下载AMD驱动 设备对应驱动 下载制造商官方驱动 对...
tags:
- ''
- 故障
title: AMD显卡在升级后的问题的解决
updated: '2022-08-11 14:40:01'
---在进行Windows系统升级后AMD报错，导致屏幕分辨率自动降低，其解决过程略微有些复杂，特此记录一下。

---

# 故障再现

![warning](https://storageapi.fleek.co/f116623f-180d-40e3-b9f8-9d276a61754b-bucket/warning.jpg)

# 解决过程

## 1 调整更新设置

在系统属性中找到硬件部分

![xtsx](https://storageapi.fleek.co/f116623f-180d-40e3-b9f8-9d276a61754b-bucket/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-08-11%20150330.jpg)

点击设备安装设置

选择 "否（你的设备可能无法像预期那样工作），然后点击保存更改

![屏幕截图 2022-08-11 151918.jpg (925×454) (fleek.co)](https://storageapi.fleek.co/f116623f-180d-40e3-b9f8-9d276a61754b-bucket/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-08-11%20151918.jpg)

## 重装显卡驱动

### 卸载原有的驱动

找到设备管理器中的 AMD Radeon Vega 8

右键卸载

![uninstall](https://storageapi.fleek.co/f116623f-180d-40e3-b9f8-9d276a61754b-bucket/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-08-08%20173630.jpg)

### 下载AMD驱动

[设备对应驱动]([Radeon™ RX Vega 64 Drivers & Support | AMD](https://www.amd.com/zh-hans/support/graphics/radeon-rx-vega-series/radeon-rx-vega-series/radeon-rx-vega-64))

![屏幕截图 2022-08-11 161737.jpg (1885×889)](https://storageapi.fleek.co/f116623f-180d-40e3-b9f8-9d276a61754b-bucket/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-08-11%20161737.jpg)

### 下载制造商官方驱动

[对应设备型号的驱动下载]([HP ProBook 445R G6 笔记本电脑 软件和驱动下载 | 惠普®客户支持](https://support.hp.com/cn-zh/drivers/selfservice/hp-probook-445r-g6-notebook-pc/26575216/model/26575218?sku=6XP84PC&serialnumber=5CD9383TQP&ssfFlag=true))

![屏幕截图 2022-08-11 144124.](https://storageapi.fleek.co/f116623f-180d-40e3-b9f8-9d276a61754b-bucket/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-08-11%20144124.jpg)

找到显卡——

![屏幕截图 2022-08-11 144312.jpg (1414×220) (fleek.co)](https://storageapi.fleek.co/f116623f-180d-40e3-b9f8-9d276a61754b-bucket/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-08-11%20144312.jpg)

点击下载并安装

![屏幕截图 2022-08-11 150723.jpg (1300×97) (fleek.co)](https://storageapi.fleek.co/f116623f-180d-40e3-b9f8-9d276a61754b-bucket/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-08-11%20150723.jpg)

故障排除,AMD正常运转🙂 ↓↓

![屏幕截图 2022-08-11 160735.jpg (693×817) (fleek.co)](https://storageapi.fleek.co/f116623f-180d-40e3-b9f8-9d276a61754b-bucket/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-08-11%20160735.jpg)

#### 参考

> [已解决： AMD Radeon Vega 8 图形错误代码 43 - AMD 社区](https://community.amd.com/t5/drivers-software/amd-radeon-vega-8-graphics-error-code-43/td-p/515090)
>
> [PA-300 | AMD Radeon™ Software Compatibility Issue | AMD](https://www.amd.com/en/support/kb/faq/pa-300)
