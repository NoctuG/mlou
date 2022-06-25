---
title: Cloudflare Worker项目
date: 2022-06-25 22:16:20
tags:
- Cloudflare
categories：
- 资源
---

---



一个能简单地运行JS代码的平台，免费可靠，以下是一些实用的项目

---

# 一、反向代理

任意网站

```javascript
async function handleRequest(request) {
const urlObj = new URL(request.url)
let url = urlObj.href.replace(urlObj.origin+'/', '').trim()
if (0!==url.indexOf('https://') && 0===url.indexOf('https:')) {
url = url.replace('https:/', 'https://')
} else if (0!==url.indexOf('http://') && 0===url.indexOf('http:')) {
url = url.replace('http:/', 'http://')
}
const response = await fetch(url, {
headers: request.headers,
body: request.body,
method: request.method
})
let respHeaders = {}
response.headers.forEach((value, key)=>respHeaders[key] = value)
respHeaders['Access-Control-Allow-Origin'] = '*'
return new Response( await response.blob() , {
headers: respHeaders,
status: response.status
});
}
addEventListener('fetch', event => {
return event.respondWith(handleRequest(event.request))
})
```

使用方法：`https://xxx.workers.dev/https://proxy.com` (需要代理的域名）
GitHub加速[来源——利用CloudflareWorkers加速Github - 好鸭 (haoduck.com)](https://haoduck.com/575.html)：

```
'use strict'

/**

* static files (404.html, sw.js, conf.js)
  */
const ASSET_URL = 'https://hunshcn.github.io/gh-proxy/'
// 前缀，如果自定义路由为example.com/gh/*，将PREFIX改为 '/gh/'，注意，少一个杠都会错！
  const PREFIX = '/'
  // 分支文件使用jsDelivr镜像的开关，0为关闭，默认开启
  const Config = {
  jsdelivr: 1
  }

/** @type {RequestInit} */
const PREFLIGHT_INIT = {
status: 204,
headers: new Headers({
'access-control-allow-origin': '*',
'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
'access-control-max-age': '1728000',
}),
}

const exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i
const exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i
const exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i
const exp4 = /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i
const exp5 = /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i
const exp6 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i

/**

* @param {any} body
* @param {number} status
* @param {Object} headers
  */
function makeRes(body, status = 200, headers = {}) {
headers['access-control-allow-origin'] = '*'
  return new Response(body, {status, headers})
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
.catch(err => makeRes('cfworker error:\n' + err.stack, 502))
e.respondWith(ret)
})

function checkUrl(u) {
for (let i of [exp1, exp2, exp3, exp4, exp5, exp6]) {
if (u.search(i) === 0) {
return true
}
}
return false
}

/**

* @param {FetchEvent} e
  */
  async function fetchHandler(e) {
  const req = e.request
  const urlStr = req.url
  const urlObj = new URL(urlStr)
  let path = urlObj.searchParams.get('q')
  if (path) {
  return Response.redirect('https://' + urlObj.host + PREFIX + path, 301)
  }
  // cfworker 会把路径中的 `//` 合并成 `/`
  path = urlObj.href.substr(urlObj.origin.length + PREFIX.length).replace(/^https?:\/+/, 'https://')
  if (path.search(exp1) === 0 || path.search(exp5) === 0 || path.search(exp6) === 0 || path.search(exp3) === 0 || path.search(exp4) === 0) {
  return httpHandler(req, path)
  } else if (path.search(exp2) === 0) {
  if (Config.jsdelivr) {
  const newUrl = path.replace('/blob/', '@').replace(/^(?:https?:\/\/)?github\.com/, 'https://cdn.jsdelivr.net/gh')
  return Response.redirect(newUrl, 302)
  } else {
  path = path.replace('/blob/', '/raw/')
  return httpHandler(req, path)
  }
  } else if (path.search(exp4) === 0) {
  const newUrl = path.replace(/(?<=com\/.+?\/.+?)\/(.+?\/)/, '@$1').replace(/^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com/, 'https://cdn.jsdelivr.net/gh')
  return Response.redirect(newUrl, 302)
  } else {
  return fetch(ASSET_URL + path)
  }
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
  
  const reqHdrNew = new Headers(reqHdrRaw)
  
  let urlStr = pathname
  if (urlStr.startsWith('github')) {
  urlStr = 'https://' + urlStr
  }
  const urlObj = newUrl(urlStr)
  
  /** @type {RequestInit} */
  const reqInit = {
  method: req.method,
  headers: reqHdrNew,
  redirect: 'manual',
  body: req.body
  }
  return proxy(urlObj, reqInit)
  }

/**
*

* @param {URL} urlObj
* @param {RequestInit} reqInit
  */
  async function proxy(urlObj, reqInit) {
  const res = await fetch(urlObj.href, reqInit)
  const resHdrOld = res.headers
  const resHdrNew = new Headers(resHdrOld)
  
  const status = res.status
  
  if (resHdrNew.has('location')) {
  let _location = resHdrNew.get('location')
  if (checkUrl(_location))
  resHdrNew.set('location', PREFIX + _location)
  else {
  reqInit.redirect = 'follow'
  return proxy(newUrl(_location), reqInit)
  }
  }
  resHdrNew.set('access-control-expose-headers', '*')
resHdrNew.set('access-control-allow-origin', '*')
  
  resHdrNew.delete('content-security-policy')
  resHdrNew.delete('content-security-policy-report-only')
  resHdrNew.delete('clear-site-data')
  
  return new Response(res.body, {
  status,
  headers: resHdrNew,
  })
  }
```

# 二、图床

无需KV:

GitHub: [realByg/cfworker-kv-image-hosting: Cloudflare workers KV 图床 ](https://github.com/realByg/cfworker-kv-image-hosting)

KV+IFPS:

GitHub:[ChenYFan-Tester/IPFS_PHOTO_SHARE: 💰用甚嚒服务器，ServerLess搭建一个图片分享站点！| 基于CloudFlareWorker无服务器函数和IPFS去中心化存储的图片分享网站 (github.com)](https://github.com/ChenYFan-Tester/IPFS_PHOTO_SHARE)

# 三、生成短链

[xyTom/Url-Shorten-Worker: A URL Shortener created using Cloudflare worker ](https://github.com/xyTom/Url-Shorten-Worker)

```javascript
const config = {
no_ref: "off", //Control the HTTP referrer header, if you want to create an anonymous link that will hide the HTTP Referer header, please set to "on" .
theme:"",//Homepage theme, use the empty value for default theme. To use urlcool theme, please fill with "theme/urlcool" .
cors: "on",//Allow Cross-origin resource sharing for API requests.
unique_link:false,//If it is true, the same long url will be shorten into the same short url
custom_link:false,//Allow users to customize the short url.
}

const html404 = `

404 Not Found.
The url you visit is not found.
Fork me on GitHub
`

let response_header={
"content-type": "text/html;charset=UTF-8",
}

if (config.cors=="on"){
response_header={
"content-type": "text/html;charset=UTF-8",
"Access-Control-Allow-Origin":"*",
"Access-Control-Allow-Methods": "POST",
}
}

async function randomString(len) {
　　len = len || 6;
　　let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　let maxPos = $chars.length;
　　let result = '';
　　for (i = 0; i < len; i++) {
　　　　result += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return result;
}

async function sha512(url){
url = new TextEncoder().encode(url)

const url_digest = await crypto.subtle.digest(
{
name: "SHA-512",
},
url, // The data you want to hash as an ArrayBuffer
)
const hashArray = Array.from(new Uint8Array(url_digest)); // convert buffer to byte array
const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//console.log(hashHex)
return hashHex

}
async function checkURL(URL){
let str=URL;
let Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
let objExp=new RegExp(Expression);
if(objExp.test(str)==true){
if (str[0] == 'h')
return true;
else
return false;
}else{
return false;
}
}
async function save_url(URL){
let random_key=await randomString()
let is_exist=await LINKS.get(random_key)
console.log(is_exist)
if (is_exist == null)
return await LINKS.put(random_key, URL),random_key
else
save_url(URL)
}
async function is_url_exist(url_sha512){
let is_exist = await LINKS.get(url_sha512)
console.log(is_exist)
if (is_exist == null) {
return false
}else{
return is_exist
}
}
async function handleRequest(request) {
console.log(request)
if (request.method === "POST") {
let req=await request.json()
console.log(req["url"])
if(!await checkURL(req["url"])){
return new Response(`{"status":500,"key":": Error: Url illegal."}`, {
headers: response_header,
})}
let stat,random_key
if (config.unique_link){
let url_sha512 = await sha512(req["url"])
let url_key = await is_url_exist(url_sha512)
if(url_key){
random_key = url_key
}else{
stat,random_key=await save_url(req["url"])
if (typeof(stat) == "undefined"){
console.log(await LINKS.put(url_sha512,random_key))
}
}
}else{
stat,random_key=await save_url(req["url"])
}
console.log(stat)
if (typeof(stat) == "undefined"){
return new Response(`{"status":200,"key":"/`+random_key+`"}`, {
headers: response_header,
})
}else{
return new Response(`{"status":200,"key":": Error:Reach the KV write limitation."}`, {
headers: response_header,
})}
}else if(request.method === "OPTIONS"){
return new Response(``, {
headers: response_header,
})

}

const requestURL = new URL(request.url)
const path = requestURL.pathname.split("/")[1]
const params = requestURL.search;

console.log(path)
if(!path){

const html= await fetch("https://xytom.github.io/Url-Shorten-Worker/"+config.theme+"/index.html")

return new Response(await html.text(), {
headers: {
"content-type": "text/html;charset=UTF-8",
},


})
}

const value = await LINKS.get(path);
let location ;

if(params) {
location = value + params
} else {
location = value
}
console.log(value)

if (location) {
if (config.no_ref=="on"){
let no_ref= await fetch("https://xytom.github.io/Url-Shorten-Worker/no-ref.html")
no_ref=await no_ref.text()
no_ref=no_ref.replace(/{Replace}/gm, location)
return new Response(no_ref, {
headers: {
"content-type": "text/html;charset=UTF-8",
},
})
}else{
return Response.redirect(location, 302)
}

}
// If request not in kv, return 404
return new Response(html404, {
headers: {
"content-type": "text/html;charset=UTF-8",
},
status: 404
})
}

addEventListener("fetch", async event => {
event.respondWith(handleRequest(event.request))
})
```

# 四、网盘目录

[qkqpttgf/OneManager-cfworkerskv: 部署在cloudflare的workers中的OneManager](https://github.com/qkqpttgf/OneManager-cfworkerskv)
以下的两个项目年久失修——

[maple3142/GDIndex: A Google Drive Index built with Vue Running on CloudFlare Workers )](https://github.com/maple3142/GDIndex)
[reruin/workers: Cloudflare Workers Scripts ](https://github.com/reruin/workers)

# 五、网址导航

[sleepwood/CF-Worker-Dir: A web directories base on Cloudflare worker. (github.com)](https://github.com/sleepwood/CF-Worker-Dir)
[ytorpedol/cloudflare-works-nav: 基于Bootstrap4，jquery的导航程序 ](https://github.com/ytorpedol/cloudflare-works-nav)

# 六、博客

[gdtool/cloudflare-workers-blog: A Blog Powered By Cloudflare Workers and KV (github.com)](https://github.com/gdtool/cloudflare-workers-blog)


# 七、其它

IPV6测试：

[RaidAndFade/ipv6-tools: [Pure CF Workers] Source code for https://ipv6.tools ](https://github.com/RaidAndFade/ipv6-tools)
服务状态监控:
[eidam/cf-workers-status-page: Monitor your websites, showcase status including daily history, and get Slack/Telegram/Discord notification whenever your website status changes. Using Cloudflare Workers, CRON Triggers, and KV storage](https://github.com/eidam/cf-workers-status-page)

