---
date: '2023-03-13T23:05:50+08:00'
excerpt: 这篇文章介绍了摘要生成工具的功能和用途。它解释了该工具的任务是根据给定的文本生成简洁而全面的摘要，而不是进行续写。它还提到了如何避免换行并限制摘要长度在150个字以内。文章强调了该工具只介绍文章内容，而不会提供建议或指出文章缺少什么。
title: 说说
updated: '2023-12-24T01:03:48.456+08:00'
---
<head>
  <!-- ... -->
  <script src="https://cdn.jsdelivr.net/gh/Uyoahz26/daodao@main/dist/qexo-dao.min.js"></script>
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
      baseURL: "https://admin.mlou.xyz/",
    }).then(function (){
      console.log("qexoDaodao加载完成");
    })
  </script>
</body>
