---
abbrlink: '51755'
categories:
- - 技术
date: '2026-01-18T23:05:54.016026+08:00'
tags:
- AI
title: Claude Code 配置与使用
updated: '2026-01-18T23:05:57.217+08:00'
---
***需要准备：① 中转API；② 安装 Nodejs；③ 安装Git***

# 1.全局安装 npm 包

```bash
npm install -g @anthropic-ai/claude-code
```

# 2.环境变量配置

到 API 中转服务 `Keys` 页面生成密钥，记录密钥与中转地址。接下来在系统环境变量中填入这个密钥和转发地址。
[https://mopsite.pp.ua/i/2026/01/18/696cfa5b6297f.webp](https://mopsite.pp.ua/i/2026/01/18/696cfa5b6297f.webp "记录 KEY的内容")

![1768749614166.webp](https://mopsite.pp.ua/i/2026/01/18/696cfa5bdb73a.webp "记录密钥")

![屏幕截图_18-1-2026_232510_docs.aihubmix.com.webp](https://mopsite.pp.ua/i/2026/01/18/696cfb5e4b34d.webp "记录中转的地址")

###### 方法一：使用命令提示符

```bash
setx ANTHROPIC_BASE_URL "模型API地址"
setx ANTHROPIC_AUTH_TOKEN "你的API密钥"
setx ANTHROPIC_MODEL "模型名称"
```

###### 方法二：使用 PowerShell


```bash
[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "sk-xxx", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.whatai.cc", "User")
```



###### **方法三：通过**settings.json 设置 [#](http://localhost:1313/docs/otherai/devtools/claudecode/#%e6%96%b9%e6%b3%95%e5%9b%9b%e9%80%9a%e8%bf%87settingsjson-%e8%ae%be%e7%bd%ae)

找到 settings.json 文件，如果没有请创建

```css
C:\Users\{user}\.claude\settings.json
```

设置 API 信息，保存

```json
{
    "env": {
      "ANTHROPIC_MODEL": "claude-sonnet-4-20250514",
      "ANTHROPIC_SMALL_FAST_MODEL": "claude-sonnet-4-20250514",
      "ANTHROPIC_BASE_URL": "https://api.whatai.cc",
      "ANTHROPIC_AUTH_TOKEN": "sk-AG2"
    }
  }
```
