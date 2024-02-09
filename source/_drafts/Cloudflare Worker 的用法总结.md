---
abbrlink: fc0a813f
categories:
- - 技术
date: '2024-02-09T20:26:07.131605+08:00'
tags: []
title: Cloudflare Worker 的用法总结
updated: '2024-02-09T20:26:08.814+08:00'
---
# 防欺诈Bot

***基于cloudflare worker的电报私聊机器人，集成骗子提醒功能***

**地址**：[NFD](https://github.com/LloydAsp/nfd)

## 搭建方法

1. **获取Token：**

   - 通过与Telegram的`@BotFather`对话获取bot的`token`。
   - 使用`/setjoingroups`指令，限制bot不能被添加到群组中。
2. **生成Secret：**

   - 访问`uuidgenerator`网站获得一个随机的`uuid`，用作`secret`。
3. **获取用户ID：**

   - 使用`@username_to_id_bot`获取个人的用户id。
4. **创建Cloudflare Worker：**

   - 登录cloudflare账户，进入worker页面创建一个新的worker。
5. **配置Worker变量：**

   - 在worker设置中添加环境变量`ENV_BOT_TOKEN`，值为步骤1中获取的`token`。
   - 添加环境变量`ENV_BOT_SECRET`，值为步骤2中获得的`secret`。
   - 添加环境变量`ENV_ADMIN_UID`，值为步骤3中获得的用户`id`。
6. **绑定KV数据库：**

   - 创建一个命名空间为`nfd`的kv数据库。
   - 在worker的变量设置中进行KV命名空间绑定，即设置`nfd -> nfd`。
7. **编辑Worker：**

   - 点击Quick Edit，将提供的代码复制到编辑器中。
8. **注册Webhook：**

   - 通过打开特定的https URL（示例：`https://xxx.workers.dev/registerWebhook`）来注册webhook。

**使用方法：**

- 当用户发送消息给bot时，这些消息会被转发给bot的创建者。
- 当创建者回复普通文本给这些转发的消息时，回复会被发送给原始消息的发送者。
- 如果回复包含`/block, /unblock, /checkblock`等指令，系统会执行相关命令，而不会将这些回复发送给原消息的发送者。

**欺诈数据源管理：**

- `fraud.db`文件包含欺诈数据，其格式为每一行记录一个`uid`。
- 可以通过pull request (pr) 方式增加数据，或者通过提交issue的方式请求添加数据。
- 当提供额外欺诈信息时，需要附上信息来源。

# 个人导航页


## 介绍

**CF-Worker-Dir - 导航页面快速搭建云函数**
这是一个在Cloudflare Worker平台上运行的程序，允许您在一分钟内搭建一个属于自己的导航页面，并有接口可以帮助您售出域名。如果您的域名暂未建站，不妨先使用CF-Worker-Dir，避免浪费。

**地址**：[CF-Worker-Dir GitHub Repository](https://github.com/sleepwood/CF-Worker-Dir/)


## 部署方法

**第一步：创建Worker**

1. 进入Workers & Pages栏目下的Overview页面。
2. 点击Create application按钮。
3. 点击Create Worker按钮。
4. 点击deploy按钮。

**第三步：配置Worker**

1. 点击Configure Worker按钮。
2. 在Triggers中修改您的域名配置。
3. 点击页面上方的Quick edit。
4. 填入以下内容来自定义导航页面：

```javascript
// 自定义网站配置 
const config = {
  title: "自定义导航",              //网站标题
  subtitle: "Cloudflare Workers Nav", //网站副标题
  //...其他配置...
}

//...其余必要的脚本和函数...
```
