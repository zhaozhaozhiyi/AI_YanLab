# Netlify 部署 Mixed Content 解决方案

## 问题描述

当网站部署到 Netlify（HTTPS 环境）时，浏览器会阻止从 HTTPS 页面发起 HTTP 请求（Mixed Content 安全策略）。

### 错误信息
```
Mixed Content: The page at 'https://...' was loaded over HTTPS, 
but requested an insecure resource 'http://...'
This request has been blocked; the content must be served over HTTPS.
```

## 解决方案

使用 **Netlify Functions** 作为代理服务器，在服务端转发请求到 HTTP API。

### 架构说明

```
浏览器 (HTTPS) 
  ↓
Netlify Function (HTTPS) 
  ↓
API 服务器 (HTTP) ✅ 允许
```

## 实现步骤

### 1. Netlify Function 代理

文件：`netlify/functions/api-proxy.js`

```javascript
// 该函数接收客户端请求（HTTPS），转发到 API 服务器（HTTP）
```

### 2. 前端代码修改

文件：`web/index.html`

```javascript
// 检测环境，HTTPS 环境使用代理，HTTP 环境直接调用
const isHTTPS = window.location.protocol === 'https:';
const API_BASE = isHTTPS 
  ? '/.netlify/functions/api-proxy/v1'  // 使用代理
  : 'http://aie.wenge.com:30051/v1';     // 直接调用
```

### 3. Netlify 配置

文件：`netlify.toml`

```toml
[build]
  publish = "."
```

## 部署步骤

### 方法 1: 通过 Git 部署（推荐）

1. 提交代码到 Git 仓库
```bash
git add .
git commit -m "Add Netlify proxy for Mixed Content fix"
git push
```

2. 在 Netlify 配置仓库连接并部署

### 方法 2: 手动部署

1. 使用 Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

2. 或使用 Netlify 网站界面手动上传

## 测试

### 本地测试

```bash
# 启动 Netlify Dev（需要先安装）
netlify dev

# 访问 http://localhost:8888
```

### 部署后测试

1. 检查控制台是否有 Mixed Content 错误
2. 测试 API 调用是否正常

## 工作原理

### 本地开发环境（HTTP）
- 直接调用 `http://aie.wenge.com:30051/v1`
- 无 Mixed Content 问题

### 部署环境（HTTPS）
- 调用 `/.netlify/functions/api-proxy/v1`
- Netlify Function 在服务端转发请求
- 解决了 Mixed Content 问题

## 注意事项

### 1. 流式响应限制

Netlify Functions 不支持真正的流式响应（SSE），需要：
- 使用阻塞模式（`response_mode: 'blocking'`）
- 或使用替代方案

### 2. API 密钥安全

当前 API 密钥硬编码在代码中：
- ⚠️ 仅供开发/测试使用
- 生产环境应使用环境变量或后端服务

### 3. 替代方案

如果 Netlify Functions 不够用，可以考虑：
1. 使用 API Gateway 服务
2. 配置 nginx 反向代理
3. 为 API 服务器配置 HTTPS

## 环境变量配置（可选）

在 Netlify 控制台设置：

```
API_URL=http://aie.wenge.com:30051
API_KEY=app-7GvRPyu0pd3wzK7YDWF6byue
```

然后修改 `netlify/functions/api-proxy.js`：

```javascript
const API_BASE = process.env.API_URL;
const API_KEY = process.env.API_KEY;
```

## 故障排查

### 问题 1: Netlify Function 无响应
- 检查函数名称是否正确
- 检查 Netlify 控制台的 Function 日志

### 问题 2: API 调用返回 404
- 检查路径是否正确（`/.netlify/functions/api-proxy/v1`）
- 检查 API 服务器是否可访问

### 问题 3: 跨域问题
- 检查 `Access-Control-Allow-Origin` 头
- 检查 OPTIONS 预检请求处理

## 总结

✅ 解决了 Mixed Content 错误  
✅ 保持本地开发体验不变  
✅ 自动环境检测  
⚠️ 流式响应受限（需要阻塞模式）  
⚠️ API 密钥需要安全化  

## 参考链接

- [Netlify Functions 文档](https://docs.netlify.com/functions/overview/)
- [Mixed Content 说明](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
- [CORS 说明](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

