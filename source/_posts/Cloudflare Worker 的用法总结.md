---
abbrlink: fc0a813f
categories:
- - 技术
date: '2024-02-09T20:26:07.131605+08:00'
excerpt: 这篇文章介绍了基于cloudflare worker的电报私聊机器人，该机器人具有防欺诈功能，能提醒用户注意骗子。文章提供了搭建该机器人的方法，以及如何获取必要的Token。
tags:
- Cloudflare
title: Cloudflare Worker 的用法总结
updated: '2024-06-18T23:02:42.227+08:00'
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

```js

const PREFIX = '/';
const MAX_REDIRECTS = 10;

const PREFLIGHT_INIT = {
    status: 204,
    headers: new Headers({
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
        'access-control-max-age': '1728000',
    }),
};

const GITHUB_PATTERNS = [
    /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i,
    /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i,
    /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i,
    /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i,
    /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i,
    /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i
];

function checkUrl(url) {
    return GITHUB_PATTERNS.some(pattern => pattern.test(url));
}

function makeRes(body, status = 200, headers = {}) {
    headers['access-control-allow-origin'] = '*';
    return new Response(body, {status, headers});
}

function newUrl(urlStr) {
    try {
        return new URL(urlStr);
    } catch (err) {
        console.error(`Invalid URL: ${urlStr}`, err);
        return null;
    }
}

addEventListener('fetch', e => {
    const ret = fetchHandler(e)
        .catch(err => makeRes('cfworker error:\n' + err.stack, 502));
    e.respondWith(ret);
});

async function fetchHandler(e, redirectCount = 0) {
    if (redirectCount > MAX_REDIRECTS) {
        return makeRes('Too many redirects', 502);
    }

    const req = e.request;
    const urlStr = req.url;
    const urlObj = new URL(urlStr);
    let path = urlObj.searchParams.get('q');

    path = urlObj.href.substr(urlObj.origin.length + PREFIX.length).replace(/^https?:\/+/, 'https://');
  
    if (checkUrl(path)) {
        if (path.search(GITHUB_PATTERNS[1]) === 0) {
            path = path.replace('/blob/', '/raw/');
        }
        return httpHandler(req, path);
    }

    return new Response('404 Not Found', {status: 404});
}

function httpHandler(req, pathname) {
    const reqHdrRaw = req.headers;

    if (req.method === 'OPTIONS' && reqHdrRaw.has('access-control-request-headers')) {
        return new Response(null, PREFLIGHT_INIT);
    }

    const reqHdrNew = new Headers(reqHdrRaw);

    if (pathname.search(/^https?:\/\//) !== 0) {
        pathname = 'https://' + pathname;
    }
    const urlObj = newUrl(pathname);

    const reqInit = {
        method: req.method,
        headers: reqHdrNew,
        redirect: 'manual',
        body: req.body
    };
    return proxy(urlObj, reqInit);
}

async function proxy(urlObj, reqInit, redirectCount = 0) {
    if (redirectCount > MAX_REDIRECTS) {
        return makeRes('Too many redirects', 502);
    }

    const res = await fetch(urlObj.href, reqInit);
    const resHdrOld = res.headers;
    const resHdrNew = new Headers(resHdrOld);

    if (resHdrNew.has('location')) {
        const location = resHdrNew.get('location');
        if (checkUrl(location)) {
            resHdrNew.set('location', PREFIX + location);
        } else {
            reqInit.redirect = 'follow';
            return proxy(newUrl(location), reqInit, redirectCount + 1);
        }
    }

    resHdrNew.set('access-control-expose-headers', '*');
    resHdrNew.set('access-control-allow-origin', '*');
    resHdrNew.delete('content-security-policy');
    resHdrNew.delete('content-security-policy-report-only');
    resHdrNew.delete('clear-site-data');

    return new Response(res.body, {
        status: res.status,
        headers: resHdrNew,
    });
}
```



### 基于[V2EX 用 cloudflare worker 搭建一个 Docker 镜像](https://www.nodeseek.com/jump?to=https%3A%2F%2Fv2ex.com%2Ft%2F1007922)

> 优化了一点点...

* 删除了返回头中的`Docker-Distribution-Api-VersionDocker-Distribution-Api-Version`特征,避免空间测绘引擎扫描到
* `404`状态时,返回空字符,进一步避免特征扫描

### 使用方法:

* 直接修改全局镜像地址: 修改或创建`/etc/docker/daemon.json`写入以下内容

  ```json
  {
  	"registry-mirrors": [ "https://自定义域名" ]
  }
  ```

  ![使用方法](https://openai-75050.gzc.vod.tencent-cloud.com/openaiassets_b70c097737e579533b8ce10ce08cc291_2579861718099507192.png)
* 手动拉取单个镜像

  ```bash
  docker pull 域名/ubuntu
  ```
* 搭建时,将`自定义子域名`修改为Workers设置中的自定义域名
* **必须添加自定义域名,默认的workers.dev在国内无法使用**

---

以下为Workers源代码

```js
'use strict'

const hub_host = 'registry-1.docker.io'
const auth_url = 'https://auth.docker.io'
const workers_url = 'https://自定义域名'
/**
* static files (404.html, sw.js, conf.js)
*/

/** @type {RequestInit} */
const PREFLIGHT_INIT = {
  // status: 204,
  headers: new Headers({
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
    'access-control-max-age': '1728000',
  }),
}

/**
* @param {any} body
* @param {number} status
* @param {Object<string, string>} headers
*/
function makeRes(body, status = 200, headers = {}) {
  headers['access-control-allow-origin'] = '*'
  return new Response(body, { status, headers })
}


/**
* @param {string} urlStr
*/
function newUrl(urlStr) {
  try {
    return new URL(urlStr)
  } catch (err) {
    return null
  }
}


addEventListener('fetch', e => {
  const ret = fetchHandler(e)
    .catch(err => makeRes('error: ' + err.stack + "\n", 502))
  e.respondWith(ret)
})


/**
* @param {FetchEvent} e
*/
async function fetchHandler(e) {
  const getReqHeader = (key) => e.request.headers.get(key);

  let url = new URL(e.request.url);

  // 修改 pre head get 请求
  // 是否含有 %2F ，用于判断是否具有用户名与仓库名之间的连接符
  // 同时检查 %3A 的存在
  if (!/%2F/.test(url.search) && /%3A/.test(url.toString())) {
    let modifiedUrl = url.toString().replace(/%3A(?=.*?&)/, '%3Alibrary%2F');
    url = new URL(modifiedUrl);
    console.log(`handle_url: ${url}`)
  }

  if (url.pathname === '/token') {
    let token_parameter = {
      headers: {
        'Host': 'auth.docker.io',
        'User-Agent': getReqHeader("User-Agent"),
        'Accept': getReqHeader("Accept"),
        'Accept-Language': getReqHeader("Accept-Language"),
        'Accept-Encoding': getReqHeader("Accept-Encoding"),
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0'
      }
    };
    let token_url = auth_url + url.pathname + url.search
    return fetch(new Request(token_url, e.request), token_parameter)
  }

  // 修改 head 请求
  if (/^\/v2\/[^/]+\/[^/]+\/[^/]+$/.test(url.pathname) && !/^\/v2\/library/.test(url.pathname)) {
    url.pathname = url.pathname.replace(/\/v2\//, '/v2/library/');
    console.log(`modified_url: ${url.pathname}`)
  }

  url.hostname = hub_host;

  let parameter = {
    headers: {
      'Host': hub_host,
      'User-Agent': getReqHeader("User-Agent"),
      'Accept': getReqHeader("Accept"),
      'Accept-Language': getReqHeader("Accept-Language"),
      'Accept-Encoding': getReqHeader("Accept-Encoding"),
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0'
    },
    cacheTtl: 3600
  };

  if (e.request.headers.has("Authorization")) {
    parameter.headers.Authorization = getReqHeader("Authorization");
  }

  let original_response = await fetch(new Request(url, e.request), parameter)
  let original_response_clone = original_response.clone();
  let original_text = original_response_clone.body;
  let response_headers = original_response.headers;
  let new_response_headers = new Headers(response_headers);
  let status = original_response.status;

  if (new_response_headers.get("Www-Authenticate")) {
    let auth = new_response_headers.get("Www-Authenticate");
    let re = new RegExp(auth_url, 'g');
    new_response_headers.set("Www-Authenticate", response_headers.get("Www-Authenticate").replace(re, workers_url));
  }
  if (new_response_headers.get("Docker-Distribution-Api-Version")){
    new_response_headers.delete("Docker-Distribution-Api-Version");
  }

  if (new_response_headers.get("Location")) {
    return httpHandler(e.request, new_response_headers.get("Location"))
  }
  if (status === 404){
    original_text = "";
  }
  let response = new Response(original_text, {
    status,
    headers: new_response_headers
  })
  return response;

}


/**
* @param {Request} req
* @param {string} pathname
*/
function httpHandler(req, pathname) {
  const reqHdrRaw = req.headers

  // preflight
  if (req.method === 'OPTIONS' &&
    reqHdrRaw.has('access-control-request-headers')
  ) {
    return new Response(null, PREFLIGHT_INIT)
  }

  let rawLen = ''

  const reqHdrNew = new Headers(reqHdrRaw)

  const refer = reqHdrNew.get('referer')

  let urlStr = pathname

  const urlObj = newUrl(urlStr)

  /** @type {RequestInit} */
  const reqInit = {
    method: req.method,
    headers: reqHdrNew,
    redirect: 'follow',
    body: req.body
  }
  return proxy(urlObj, reqInit, rawLen)
}


/**
*
* @param {URL} urlObj
* @param {RequestInit} reqInit
*/
async function proxy(urlObj, reqInit, rawLen) {
  const res = await fetch(urlObj.href, reqInit)
  const resHdrOld = res.headers
  const resHdrNew = new Headers(resHdrOld)

  // verify
  if (rawLen) {
    const newLen = resHdrOld.get('content-length') || ''
    const badLen = (rawLen !== newLen)

    if (badLen) {
      return makeRes(res.body, 400, {
        '--error': `bad len: ${newLen}, except: ${rawLen}`,
        'access-control-expose-headers': '--error',
      })
    }
  }
  const status = res.status
  resHdrNew.set('access-control-expose-headers', '*')
  resHdrNew.set('access-control-allow-origin', '*')
  resHdrNew.set('Cache-Control', 'max-age=1500')

  resHdrNew.delete('content-security-policy')
  resHdrNew.delete('content-security-policy-report-only')
  resHdrNew.delete('clear-site-data')

  return new Response(res.body, {
    status,
    headers: resHdrNew
  })
}
```


## 使用 Cloudreve + E5 + Workers 搭建免费高速云盘 | 跑满带宽

本文由 `High Ping Network` 的小伙伴 GenshinMinecraft 进行编撰，首发于 [本博客](https://www.nodeseek.com/jump?to=https%3A%2F%2Fblog.highp.ing)

### 前言

Cloudreve 也不是什么新玩意了，就不过多介绍了

本文主要讲述的是有关于 **Cloudflare Workers 代理 E5 下载链接**的部分，其他应该会一笔带过，除非有特别需要注意的地方

你只需要:

* 用于搭建 Cloudreve 的机器
* 一个域名
* 一个用于优选的 Cname 域名
* 一个 Cloudflare 帐号
* 一个用作网盘的 Microsoft 365 E5 帐号 (当然有 Onedrive 权限的任意账号也可以)

请注意: 用于 Workers 的优选 IP 不能为反代 IP，只能为 Cloudflare 官方 IP 列表中的 IP

### 搭建 Cloudreve 并连接网盘

这一步跟着[官方教程](https://www.nodeseek.com/jump?to=https%3A%2F%2Fdocs.cloudreve.org%2Fgetting-started%2Finstall)来就行了，无需多言

相信能阅读到本篇文章的朋友也不至于不会搭建

记住这里，留意下，这里填写的就是等会使用的 Workers 的域名

![IMG_20240527_214124_048.jpg](https://blogcdn.blog.highp.ing/p/cloudreve/IMG_20240527_214124_048.jpg)

目前可以先不管

### 中转 E5 下载地址

我们默认的 E5 下载地址直连还是比较慢的，中国移动 1000M 宽带速度高达 500kb/s

![](https://blogcdn.blog.highp.ing/p/cloudreve/IMG_20240527_214837_392.jpg)

#### 获取 E5 下载地址

一般地，E5 的通用下载地址域名为 `xxxx-my.sharepoint.com`

其中 `xxxx` 为 E5 的组织名字，也就是 `xxxx.onmicrosoft.com` 的二级，替换即可

比如我的域名为 `genmine5.onmicrosoft.com`，对应的下载域名为 `genmine5-my.sharepoint.com`

将其记住并保存下来

#### 反代 E5 下载地址

来到 Cloudflare Dashboard，`Workers And Pages`，新建一个 Workers

将代码改为:

```js
export default {
	async fetch(request, env, ctx) {
		let url = new URL(request.url);
		if(url.pathname.startsWith('/')){
			url.hostname="genmine5-my.sharepoint.com"; // 修改成自己的域名
			let new_request = new Request(url, request)
			return await fetch(new_request)
		}
		return await env.ASSETS.fetch(request);
	},
};
```

记得修改其中的反代域名，保存部署即可

#### 连接域名

回到 Cloudflare Dashboard 主界面，点进一个域名，找到 `Workers 路由`，新增一个类似于下图的路由:

![](https://blogcdn.blog.highp.ing/p/cloudreve/IMG_20240527_221036_568.jpg)

PS: *不建议使用顶级域名，建议二级，顶级域名有 Cname 拉平*

还有一个注意的点，后面的 `/*` 千万不要忘记

#### 解析域名

回到 DNS 解析，将刚才设置的域名 Cname 到一个 `Cloudflare 官方 IP 优选地址`上

注意一定要 **官方 IP**，反代 IP 没用的！

解析就不多说了，简单得很

#### 测试访问

现在，访问你的反代地址，当跳转到 Onedrive 登陆界面即为完成:

![](https://blogcdn.blog.highp.ing/p/cloudreve/IMG_20240528_125235_035.jpg)

### 编辑反代 IP

![IMG_20240527_214124_048.jpg](https://blogcdn.blog.highp.ing/p/cloudreve/IMG_20240527_214124_048.jpg)

还记得这里吗，将其改为反代的地址即可，以后所有的下载请求都会走反代了

PS: 上传不走，也不太可能走，Cloudflare 上传最大 100MB

### 测试

![](https://blogcdn.blog.highp.ing/p/cloudreve/IMG_20240528_125814_900.jpg)

前后提升巨大，优选前下载速度 500KB/s，优选后下载速度 80MB/s+

也算是把 E5 优化到极致了
