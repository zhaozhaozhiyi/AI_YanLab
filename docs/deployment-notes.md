# 部署注意事项

## HTTPS 要求

### 问题
当网站部署到 HTTPS 环境（如 Netlify）时，所有 API 调用也必须使用 HTTPS 协议。

### 原因
浏览器的 "Mixed Content" 安全策略不允许 HTTPS 页面加载 HTTP 资源（包括 API 请求）。

### 当前配置
- API 端点：`https://aie.wenge.com:30051/v1`
- 必须在 API 服务器上配置 HTTPS 支持

## 如果 API 服务器不支持 HTTPS

### 选项 1: 使用反向代理
配置 Nginx 或其他反向代理来处理 HTTPS：

```nginx
server {
    listen 443 ssl;
    server_name your-api-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://aie.wenge.com:30051;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 选项 2: 使用 CORS 代理服务
如果无法配置反向代理，可以使用公共 CORS 代理（仅用于开发/测试）：

```javascript
const API_BASE = 'https://cors-anywhere.herokuapp.com/https://aie.wenge.com:30051/v1';
```

**注意**: 公共代理不应用于生产环境。

### 选项 3: 配置 Netlify 重定向
在 Netlify 的 `_redirects` 文件中配置：

```
# _redirects
/api/*  https://aie.wenge.com:30051/:splat  200
```

## 测试
1. 确认 API 服务器支持 HTTPS
2. 测试 API 端点可访问：`curl https://aie.wenge.com:30051/v1/parameters`
3. 部署后检查浏览器控制台是否有 Mixed Content 错误

## 更新日期
2024-12-19

