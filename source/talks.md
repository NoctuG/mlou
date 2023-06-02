---
date: 2023-03-13 23:05:50
excerpt: ' '
title: 说说
updated: Mon, 13 Mar 2023 15:05:51 GMT
---
<head>
  <!-- ... -->
  <script src="//cdn.jsdelivr.net/gh/Uyoahz26/daodao@main/dist/qexo-dao.min.js"></script>
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="qexoDaoDao"></div>
  <script>
    qexoDaodao?.init({
      el: "#qexoDaoDao",
      avatar: "https://q1.qlogo.cn/g?b=qq&nk=2496091142&s=640",
      name: "UyoAhz",
      limit: 10,
      useLoadingImg: false,
      baseURL: "https://hexo-blog-cms.vercel.app/",
    }).then(function (){
      console.log("qexoDaodao加载完成");
    })
  </script>
</body>
