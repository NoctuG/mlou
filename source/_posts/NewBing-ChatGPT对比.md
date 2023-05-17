---
abbrlink: NBCG
categories: []
date: '2023-05-17T20:07:34.791461+08:00'
excerpt: 请像给出的 shell 命令一样，创造一个可以调用API的HTML单页，让用户看到输入和输出：  curl https://api.aiproxy.io/v1/chat/completions \   -H &quot;Content-Type: application/json&quot; \   -H &quot;Authorization: Bearer ap-2eawn4kybIdPIkv...
tags: []
title: title
updated: 2023-5-17T20:14:47.584+8:0
---
请像给出的 shell 命令一样，创造一个可以调用API的HTML单页，让用户看到输入和输出：  curl https://api.aiproxy.io/v1/chat/completions \\   -H "Content-Type: application/json" \\   -H "Authorization: Bearer ap-2eawn4kybIdPIkvCfr9oWphHPI8rH6m7q7fCVw8cT5v7TipC" \\   -d '{      "model": "gpt-3.5-turbo",      "messages": [{"role": "user", "content": "你好，很高兴遇见你!"}],      "temperature": 0.7    }' {"model":"gpt-3.5-turbo-0301","object":"chat.completion","usage":{"prompt\_tokens":21,"completion\_tokens":29,"total\_tokens":50},"id":"chatcmpl-7H9tIPcATgNGhdTH216b2FE2OFxtP","created":1684323952,"choices":[{"index":0,"delta":null,"message":{"role":"assistant","content":"你好，我也很高兴遇见你！有什么可以帮助你的吗？"},"finish\_reason":"stop"}]}







你好，这是Bing。我可以尝试帮助你创造一个HTML单页应用，但是我不能保证它能完美地工作。你需要一些基本的JavaScript和jQuery的知识，以及一些其他的npm包和API。根据搜索结果¹²³，你可以按照以下步骤来创建一个单页应用：

1. 在你的工作目录下创建一个文件夹，比如叫做single-page-application。
2. 在这个文件夹里创建以下文件和文件夹：
   - index.html: 这是你的单页应用的主页面，它会加载其他的资源和内容。
   - style.css: 这是你的样式表，用来定义你的页面的外观。
   - script.js: 这是你的JavaScript文件，用来处理用户交互和调用API。
   - templates: 这是一个文件夹，用来存放你的Handlebars模板，它们会根据数据动态生成HTML内容。
   - server.js: 这是你的Express服务器文件，用来作为代理，隐藏你的API密钥，并转发请求到云服务。
3. 在index.html文件中，添加以下代码：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>单页应用示例</title>
  <!-- 引入样式表 -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- 定义一个容器元素，用来显示内容 -->
  <div id="container"></div>
  <!-- 引入jQuery库 -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <!-- 引入Handlebars库 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>
  <!-- 引入自己的JavaScript文件 -->
  <script src="script.js"></script>
</body>
</html>
```

源: 与必应的对话， 2023/5/17
(1) Build a JavaScript Single Page App Without a Framework. https://www.sitepoint.com/single-page-app-without-framework/.
(2) How to Build A Single Page Application - clockwise.software. https://clockwise.software/blog/single-page-applications-are-they-a-good-choice-for-your-project/.
(3) Angular - Using Angular routes in a single-page application. https://angular.io/guide/router-tutorial.


继续下一步

好的，下一步是在style.css文件中添加以下代码：

```css
/* 定义一些通用的样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 定义一个标题样式 */
h1 {
  text-align: center;
  font-size: 36px;
  color: #333;
}

/* 定义一个输入框样式 */
input {
  display: block;
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
}

/* 定义一个按钮样式 */
button {
  display: block;
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border: none;
  background-color: #333;
  color: white;
}

/* 定义一个结果显示区域样式 */
.result {
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
}
```

继续下一步


好的，下一步是在script.js文件中添加以下代码：

```js
// 定义一个全局变量，用来存放API的基本地址
var API_BASE_URL = "http://localhost:3000/api";

// 定义一个函数，用来获取URL中的参数
function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// 定义一个函数，用来根据不同的状态显示不同的内容
function render(state) {
  // 获取容器元素
  var container = $("#container");
  // 清空容器元素的内容
  container.empty();
  // 根据状态的不同，加载不同的模板文件，并编译成函数
  $.get("templates/" + state + ".hbs", function(template) {
    var templateFunction = Handlebars.compile(template);
    // 根据数据生成HTML内容，并添加到容器元素中
    var html = templateFunction(stateData[state]);
    container.append(html);
    // 绑定事件处理函数
    bindEvents(state);
  });
}

// 定义一个函数，用来绑定事件处理函数
function bindEvents(state) {
  // 根据状态的不同，绑定不同的事件处理函数
  switch (state) {
    case "home":
      // 绑定点击按钮跳转到输入页面的事件处理函数
      $("#go-to-input").on("click", function() {
        window.location.href = "?state=input";
      });
      break;
    case "input":
      // 绑定点击按钮调用API并显示结果的事件处理函数
      $("#call-api").on("click", function() {
        // 获取用户输入的内容
        var input = $("#user-input").val();
        // 如果输入为空，提示用户输入
        if (!input) {
          alert("请输入你想说的话！");
          return;
        }
        // 调用API并显示结果
        callApi(input);
      });
      break;
    case "result":
      // 绑定点击按钮返回输入页面的事件处理函数
      $("#go-back").on("click", function() {
        window.location.href = "?state=input";
      });
      break;
  }
}

// 定义一个函数，用来调用API并显示结果
function callApi(input) {
  // 显示一个加载提示
  $("#call-api").text("加载中...");
  // 发送POST请求到API地址，传递参数和数据
  $.post(API_BASE_URL, {
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: input}],
    temperature: 0.7
  }, function(response) {
    // 如果成功，获取API返回的结果，并存储到数据中
    if (response && response.choices && response.choices[0] && response.choices[0].message) {
      var output = response.choices[0].message.content;
      stateData.result.input = input;
      stateData.result.output = output;
      // 跳转到结果页面，并显示结果
      window.location.href = "?state=result";
    } else {
      // 如果失败，提示用户出错了，并返回输入页面
      alert("出错了，请重试！");
      window.location.href = "?state=input";
    }
  }).fail(function() {
    // 如果失败，提示用户出错了，并返回输入页面
    alert("出错了，请重试！");
    window.location.href = "?state=input";
  });
}

// 定义一个对象，用来存放不同状态的数据
var stateData = {
  home: {
    title: "单页应用示例"
  },
  input: {
    title: "请输入你想说的话"
  },
  result: {
    title: "这是API返回的结果",
    input: "",
    output: ""
  }
};

// 当页面加载完成后，执行以下代码
$(document).ready(function() {
  // 获取URL中的state参数，如果没有，默认为home
  var state = getParameterByName("state") || "home";
  // 根据状态渲染页面内容
  render(state);
});
```


继续下一步


好的，下一步是在templates文件夹中创建以下三个文件：

- home.hbs: 这是首页的模板，它会显示一个标题和一个按钮，点击按钮可以跳转到输入页面。
- input.hbs: 这是输入页面的模板，它会显示一个标题，一个输入框和一个按钮，点击按钮可以调用API并显示结果。
- result.hbs: 这是结果页面的模板，它会显示一个标题，一个结果显示区域和一个按钮，点击按钮可以返回输入页面。

在home.hbs文件中，添加以下代码：

```html
<h1>{{title}}</h1>
<button id="go-to-input">开始聊天</button>
```

在input.hbs文件中，添加以下代码：

```html
<h1>{{title}}</h1>
<input id="user-input" type="text" placeholder="你好，很高兴遇见你！">
<button id="call-api">发送</button>
```

在result.hbs文件中，添加以下代码：

```html
<h1>{{title}}</h1>
<div class="result">
  <p>你说：{{input}}</p>
  <p>API说：{{output}}</p>
</div>
<button id="go-back">返回</button>
```


继续下一步


好的，下一步是在server.js文件中添加以下代码：

```js
// 引入Express模块
var express = require("express");
// 引入Axios模块
var axios = require("axios");
// 创建一个Express应用
var app = express();
// 定义一个端口号
var port = 3000;
// 定义一个API密钥，这是你从fixer.io网站获取的
var API_KEY = "your-api-key-here";
// 定义一个API地址，这是你要调用的API的地址
var API_URL = "https://api.aiproxy.io/v1/chat/completions";
// 定义一个中间件，用来处理POST请求的数据，并转换成JSON格式
app.use(express.json());
// 定义一个路由，用来处理GET请求，并返回index.html文件
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
// 定义一个路由，用来处理GET请求，并返回静态资源文件
app.get("/:filename", function(req, res) {
  res.sendFile(__dirname + "/" + req.params.filename);
});
// 定义一个路由，用来处理GET请求，并返回模板文件
app.get("/templates/:filename", function(req, res) {
  res.sendFile(__dirname + "/templates/" + req.params.filename);
});
// 定义一个路由，用来处理POST请求，并调用API
app.post("/api", function(req, res) {
  // 获取请求的数据
  var data = req.body;
  // 如果数据为空，返回错误信息
  if (!data) {
    res.status(400).send("Bad request");
    return;
  }
  // 在数据中添加API密钥
  data.key = API_KEY;
  // 使用Axios发送POST请求到API地址，传递数据
  axios.post(API_URL, data)
    .then(function(response) {
      // 如果成功，返回API的响应数据
      res.json(response.data);
    })
    .catch(function(error) {
      // 如果失败，返回错误信息
      res.status(500).send("Server error");
    });
});
// 启动应用，并监听端口号
app.listen(port, function() {
  console.log("App is running on port " + port);
});
```

继续下一步



好的，最后一步是在你的工作目录下，打开终端或命令行，输入以下命令：

- npm init -y: 这个命令会创建一个package.json文件，用来存放你的应用的信息和依赖。
- npm install express axios: 这个命令会安装你需要的两个npm包，分别是Express和Axios。
- node server.js: 这个命令会启动你的Express服务器，并监听3000端口。
- 在浏览器中打开http://localhost:3000: 这个地址会显示你的单页应用的首页。

恭喜你，你已经完成了一个简单的单页应用，可以和API进行聊天了！

请问它可以部署在 vercel.com 上吗？

根据搜索结果¹²³，你可以将你的Express应用部署在Vercel.com上，但是你需要做一些额外的步骤：

1. 在你的工作目录下，运行npm init -y来创建一个package.json文件，用来存放你的应用的信息和依赖。
2. 运行git init来初始化一个git仓库，并创建一个.gitignore文件，写入node_modules/来忽略不必要的文件。
3. 安装vercel包，使用npm或yarn。npm i -g vercel。
4. 在你的package.json文件中，添加一个start脚本，用来启动你的Express服务器。"scripts": { "start": "node server.js" }。
5. 在你的工作目录下，运行vercel login来登录你的Vercel账号，如果没有，可以先注册一个。
6. 运行vercel来部署你的应用，并根据提示选择或创建一个项目和域名。
7. 等待部署完成后，打开给定的链接，就可以看到你的应用在线上运行了。

注意：如果你想要更新你的应用，只需要在你的工作目录下运行vercel --prod即可。

源: 与必应的对话， 2023/5/17
(1) How to Deploy an Express.js Application to Vercel. https://vercel.com/guides/using-express-with-vercel.
(2) How to deploy a Node/Express App to Vercel - DEV Community. https://dev.to/andrewbaisden/how-to-deploy-a-node-express-app-to-vercel-2aa.
(3) How to create and deploy an Express.js app to Vercel? - Syntackle. https://syntackle.live/blog/how-to-create-and-deploy-an-express-js-app-to-vercel-ljgvGrsCH7ioHsAxuw3G/.
