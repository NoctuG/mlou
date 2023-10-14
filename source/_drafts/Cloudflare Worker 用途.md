---
abbrlink: cf-worker
categories:
- - 技术
date: '2023-10-14T22:53:56.578881+08:00'
tags:
- Cloudflare
title: Cloudflare Worker 用途
updated: '2023-10-14T22:54:10.764+08:00'
---
```javascript

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'GET') {
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  } else if (request.method === 'POST') {
    const formData = await request.formData();
    const file = formData.get('file');
    const apiOption = formData.get('apiOption') || 'api-tgph-official';

    const apiUrl = getApiUrl(apiOption);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const imageUrl = 'https://telegra.ph' + data[0].src;

      return new Response(JSON.stringify({ imageUrl }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response('Error uploading image', { status: 500 });
    }
  }
}

function getApiUrl(apiOption) {
  const apiUrls = {
    'api-tgph-official': 'https://telegra.ph/upload',
    'api-tgph-cachefly': 'https://telegraph.cachefly.net/upload',
    'api-tgph-other': 'https://telegra.ph/upload',
  };

  return apiUrls[apiOption] || apiUrls['api-tgph-official'];
}

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>TGPH Image Hosting</title>
  <meta charset="UTF-8">
  <!-- 
  // 仅供学习CloudFlare Worker开发使用，违规使用后果自负
  // License @GPLv3
  -->
  <style>
    footer {
      font-size: 12px;
    }
    hr {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <h1>TGPH Image Hosting</h1>
  <hr>
  <form id="uploadForm">
    <input type="file" name="file" id="fileInput" required />
    <select name="apiOption" id="apiOption">
      <option value="api-tgph-official">TGPH-Official</option>
      <option value="api-tgph-cachefly">TGPH-Cachefly</option>
    </select>
    <button type="submit">Upload</button>
  </form>
  <input type="checkbox" id="subOption" onclick="toggleSubUrls()" />
  <label for="subOption">Enable TGPH-SUB</label>
  <hr>
  <div id="result"></div>
  <button id="copyButton">Copy</button>
  <script>
    let imageUrl = '';
    document.getElementById('uploadForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', document.getElementById('fileInput').files[0]);
      formData.append('apiOption', document.getElementById('apiOption').value);
      try {
        const response = await fetch('/', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        imageUrl = data.imageUrl;
        toggleSubUrls();
      } catch (error) {
        console.error(error);
      }
    });

    function toggleSubUrls() {
      const result = document.getElementById('result');
      const subOption = document.getElementById('subOption');

      if (subOption.checked) {
        const urls = generateSubUrls(imageUrl);
        const resultHTML = urls.map((url, index) => {
          return `
            <div>URL: <a href="${url}" target="_blank">${url}</a>
            <button class="copy-button" data-url="${url}" id="copyButton${index}">Copy</button>
            </div>`;
        }).join('');
        result.innerHTML = resultHTML;
      } else {
        result.innerHTML = `URL: <a href="${imageUrl}" target="_blank">${imageUrl}</a> <button id="copyButton">Copy</button>`;
      }

      // 添加事件监听器
      result.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', () => {
          const urlToCopy = button.getAttribute('data-url');
          navigator.clipboard.writeText(urlToCopy);
        });
      });

      document.getElementById('copyButton')?.addEventListener('click', () => {
        navigator.clipboard.writeText(imageUrl);
      });
    }

    function generateSubUrls(imageUrl) {
      const subDomains = [
        'telegraph.cachefly.net',
        'i0.wp.com/telegra.ph',
        'i1.wp.com/telegra.ph',
        'i2.wp.com/telegra.ph',
        'i3.wp.com/telegra.ph',
        'im.gurl.eu.org',
        'image.196629.xyz',
        'img1.131213.xyz',
        'missuo.ru',
      ];

      return subDomains.map(domain => imageUrl.replace('https://telegra.ph', `https://${domain}`));
    }
  </script>
</body>
<hr>
<footer>
  <p>建议上传5M以内的JPG/PNG/JPEG/GIF图像、MP4视频</p>
  <p>文件格式兼容：jpg/jpeg/png/gif/m4v/mp4/jfif/pjpeg</p>
  <p>注意不兼容webp/mkv等格式和非图像视频格式的文件、大于5MB的文件</p>
  <p>该源码开源，仅供学习JS使用，违规使用后果自负</p>

```
