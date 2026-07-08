# mlou

## 第三方前端依赖升级与 SRI 校验流程

当前项目对友链/说说页面的前端依赖采用仓库内落地文件（`source/js/vendor/`、`source/css/vendor/`），并在页面入口使用 SRI 校验。

### 升级流程

1. 将新版本依赖文件覆盖到以下目录：
   - `source/js/vendor/`
   - `source/css/vendor/`
2. 重新生成 SRI（sha384）摘要：

```bash
openssl dgst -sha384 -binary source/js/vendor/<file>.js | openssl base64 -A
openssl dgst -sha384 -binary source/css/vendor/<file>.css | openssl base64 -A
```

3. 将生成后的摘要写入页面入口文件中的 `integrity="sha384-..."`：
   - `source/links/index.md`
   - `source/essays/index.md`
4. 确认所有 `<script>` 与 `<link rel="stylesheet">` 均设置 `crossorigin="anonymous"`。
5. 本地构建并手动验收页面，确认资源能正常加载。

### 注意事项

- 修改 vendor 文件后必须同步更新 SRI，否则浏览器会因校验失败而拒绝加载资源。
- 禁止使用未固定版本的 CDN 浮动 URL（例如省略 `@x.y.z` 的形式）。
