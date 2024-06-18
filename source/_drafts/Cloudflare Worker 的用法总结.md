---
abbrlink: fc0a813f
categories:
- - 技术
date: '2024-02-09T20:26:07.131605+08:00'
excerpt: 这篇文章介绍了基于Cloudflare Worker的防欺诈Bot和CF-Worker-Dir导航页面的搭建方法。防欺诈Bot是一个电报私聊机器人，集成了骗子提醒功能，可以通过设置环境变量、绑定KV数据库等步骤来配置。CF-Worker-Dir是一个能在Cloudflare Worker平台上搭建导航页面的程序，可以快速创建个人导航页，方便售出域名。文章详细介绍了配置和部署的步骤。
tags:
- Cloudflare
title: Cloudflare Worker 的用法总结
updated: '2024-06-18T15:09:10.556+08:00'
---
# 防欺诈Bot

***基于cloudflare worker的电报私聊机器人，集成骗子提醒功能***

**地址**：[NFD](https://github.com/LloydAsp/nfd)

## 搭建方法

1. **获取Token：**

   - 通过与Telegram的 `@BotFather`对话获取bot的 `token`。
   - 使用 `/setjoingroups`指令，限制bot不能被添加到群组中。
2. **生成Secret：**

   - 访问 `uuidgenerator`网站获得一个随机的 `uuid`，用作 `secret`。
3. **获取用户ID：**

   - 使用 `@username_to_id_bot`获取个人的用户id。
4. **创建Cloudflare Worker：**

   - 登录cloudflare账户，进入worker页面创建一个新的worker。
5. **配置Worker变量：**

   - 在worker设置中添加环境变量 `ENV_BOT_TOKEN`，值为步骤1中获取的 `token`。
   - 添加环境变量 `ENV_BOT_SECRET`，值为步骤2中获得的 `secret`。
   - 添加环境变量 `ENV_ADMIN_UID`，值为步骤3中获得的用户 `id`。
6. **绑定KV数据库：**

   - 创建一个命名空间为 `nfd`的kv数据库。
   - 在worker的变量设置中进行KV命名空间绑定，即设置 `nfd -> nfd`。
7. **编辑Worker：**

   - 点击Quick Edit，将提供的代码复制到编辑器中。
8. **注册Webhook：**

   - 通过打开特定的https URL（示例：`https://xxx.workers.dev/registerWebhook`）来注册webhook。

**使用方法：**

- 当用户发送消息给bot时，这些消息会被转发给bot的创建者。
- 当创建者回复普通文本给这些转发的消息时，回复会被发送给原始消息的发送者。
- 如果回复包含 `/block, /unblock, /checkblock`等指令，系统会执行相关命令，而不会将这些回复发送给原消息的发送者。

**欺诈数据源管理：**

- `fraud.db`文件包含欺诈数据，其格式为每一行记录一个 `uid`。
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
const config = {
  title: "自定义导航",                 //自定义网站标题
  subtitle: "Cloudflare Workers Nav", //自定义网站副标题
  logo_icon: "sitemap",               //选择网站logo icon 暂时只支持 (eg:https://semantic-ui.com/elements/icon.html)
  hitokoto: true,                     //开启 一言 插件
  search:true,                        //开启 搜索 功能  
  search_engine:[                     //搜索引擎列表
    {
      name:"百度一下",                   //搜索引擎名称
      template:"https://www.baidu.com/s?wd=$s"  //搜索引擎模板（含关键词$s）
    }
  ],
  selling_ads: true,                  //是否要开启网址推广
  sell_info:{
    domain:"example.com",             //当前域名
    price:500,                        //价格
    mon_unit:"yen sign",              //货币单位 (eg:https://semantic-ui.com/elements/icon.html#computers)
    contact:[                         //联系方式
      {
        type:"envelope",              //通讯工具 ("weixin","qq","telegram plane","envelope" or "phone")
        content:"info@example.com"    //号码/地址
      }
    ]                    
  },
  lists: [                            //网址信息
    {
      name:"技术",                    //网址类别
      icon:"code",                    //网址类别icon 暂时只支持 (eg:https://semantic-ui.com/elements/icon.html)
      list:[
        {
          url:"https://oschina.net/", //网站url
          name:"开源中国",             //网站名称
          desc:"领先的中文开源技术社区" //网站描述
        }
      ]
    }
  ]
}

//...其余必要的脚本和函数...
```

# Workers-AI

**项目介绍：**

**workers-ai**
这是一个利用 Cloudflare Workers 调用AI模型API的项目，以构建一个AI功能网站。

**功能：**

- 文本生成：使用 `@cf/meta/llama-2-7b-chat-int8`模型
- 文本翻译：使用 `@cf/meta/m2m100-1.2b`模型
- 图像分类：使用 `@cf/microsoft/resnet-50`模型
- 文本生图：使用 `@cf/stabilityai/stable-diffusion-xl-base-1.0`模型

**部署方法：**

## 准备工作

1. 登录 Cloudflare 并访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)，地址栏中的 `xxxxxxxxx`代表你的 `{ACCOUNT_ID}`，请复制并保存。
2. 访问 [API Tokens](https://dash.cloudflare.com/profile/api-tokens) 页面，依次点击 `Create Token` -> `Workers AI (Beta) Use template` -> `Continue to summary` -> `Create Token`。**请妥善保管生成的Token。**

## 使用 Vercel 部署

1. 点击 [![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/barkure/workers-ai) 开始部署。
2. 输入仓库名，如：Workers-AI，并点击 `Create`。稍等片刻，构建完成后点击 `Continue to Dashboard`。
3. 选择 `Settings` -> `Environment Variables`，添加环境变量：

   ```
   REACT_APP_ACCOUNT_ID='abcdef'
   REACT_APP_API_TOKEN='123456'
   ```

   用你自己的 `ACCOUNT_ID`和 `Token`替换上面的示例值。
4. 在 `Deployments`页面点击 `Redeploy`重新部署。
5. 部署完成后，项目即可使用。

自定义域名配置：请自行研究设置方法。

{% notel red 提醒 %}
Vercel 对请求时长有10秒限制，而画图可能需要20-30秒，因此使用Vercel部署时文本转图功能不可用。
解决方法：可以反代Cloudflare Workers AI的API，修改 `src/components/AxiosInstance.js`中的baseURL为反代地址后，再进行部署。

{% endnotel %}



# Github 加速
