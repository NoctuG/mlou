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
      avatar: "https://i.pinimg.com/736x/e1/08/a5/e108a56df4dfff6135af75959142f79f.jpg",
      name: "UyoAhz",
      limit: 10,
      useLoadingImg: false,
      baseURL: "https://hexo-blog-cms.vercel.app/",
    }).then(function (){
      console.log("qexoDaodao加载完成");
    })
  </script>
</body>
