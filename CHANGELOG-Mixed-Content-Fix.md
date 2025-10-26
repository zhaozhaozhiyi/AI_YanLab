# Mixed Content 修复变更日志

## 问题
部署到 Netlify (HTTPS) 后出现 Mixed Content 错误，无法从 HTTPS 页面调用 HTTP API。

## 解决方案
使用 Netlify Functions 作为代理服务器，在服务端转发请求到 HTTP API。

## 修改的文件

### 1. `web/index.html` (前端代码)
**修改内容：**
- `callAIAPIStreaming()` - 流式 API 调用
- `callAIAPI()` - 阻塞模式 API 调用

**变更逻辑：**
```javascript
// 动态检测 HTTPS 环境
const isHTTPS = window.location.protocol === 'https:';
const API_BASE = isHTTPS 
  ? '/.netlify/functions/api-proxy/v1'  // 使用代理
  : 'http://aie.wenge.com:30051/v1';     // 直接调用
```

### 2. `netlify/functions/api-proxy.js` (新建)
**功能：**
- 接收客户端请求（HTTPS）
- 转发到 API 服务器（HTTP）
- 添加认证头和 CORS 头
- 处理 OPTIONS 预检请求

### 3. `netlify.toml` (新建)
**配置：**
```toml
[build]
  publish = "."
```

### 4. `docs/deployment-notes.md` (新建)
部署注意事项和技术说明

### 5. `docs/Netlify部署Mixed-Content解决方案.md` (新建)
详细的解决方案文档

## 工作原理

### 本地开发（HTTP）
```
浏览器 → http://localhost → http://aie.wenge.com:30051/v1
✅ 正常工作
```

### 部署环境（HTTPS）
```
浏览器 → https://netlify.app → /.netlify/functions/api-proxy/v1
                                          ↓
                                    api-proxy.js (Function)
                                          ↓
                                http://aie.wenge.com:30051/v1
✅ 解决 Mixed Content 问题
```

## 部署步骤

### 1. 提交代码
```bash
git add .
git commit -m "Fix Mixed Content error with Netlify Functions proxy"
git push
```

### 2. Netlify 自动部署
- 如果已配置自动部署，代码推送后会自动触发
- 检查 Netlify 控制台的部署日志

### 3. 测试
访问部署后的网站，测试聊天功能是否正常工作。

## 已知限制

### 1. 流式响应限制
- Netlify Functions 不支持真正的服务器推送流式响应
- 当前代码会自动降级到阻塞模式
- ⚠️ 响应速度可能略慢

### 2. API 密钥暴露
- 当前 API 密钥硬编码在 Function 中
- 仅用于开发/测试
- 生产环境建议：
  - 使用 Netlify 环境变量
  - 或部署独立的后端服务

## 测试检查清单

- [ ] 本地开发测试（HTTP 环境）
- [ ] 部署后测试（HTTPS 环境）
- [ ] 检查浏览器控制台无 Mixed Content 错误
- [ ] 测试聊天功能正常工作
- [ ] 测试 API 响应正常

## 回滚方案

如果出现问题，可以回滚到之前的版本：

```bash
git revert HEAD
git push
```

或修改 `web/index.html` 强制使用直接调用（仅限测试）：

```javascript
const API_BASE = 'http://aie.wenge.com:30051/v1';
```

## 后续优化建议

1. **为 API 服务器配置 HTTPS**
   - 最佳解决方案
   - 需要服务器管理员配合

2. **使用环境变量管理 API 密钥**
   - 在 Netlify 控制台设置
   - 修改 api-proxy.js 读取环境变量

3. **监控和日志**
   - 在 Netlify 控制台查看 Function 日志
   - 添加更详细的错误处理

4. **性能优化**
   - 考虑添加缓存
   - 优化响应时间

## 更新日期
2024-10-26

## 相关文件
- `web/index.html` - 前端代码
- `netlify/functions/api-proxy.js` - 代理函数
- `netlify.toml` - Netlify 配置
- `docs/Netlify部署Mixed-Content解决方案.md` - 详细文档

