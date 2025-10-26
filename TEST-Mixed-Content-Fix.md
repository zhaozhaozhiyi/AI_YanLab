# Mixed Content 修复测试指南

## ✅ 修复已完成

代码已推送到 GitHub，Netlify 将自动部署。

### 修改内容
- ✅ 添加环境检测逻辑（HTTPS vs HTTP）
- ✅ 创建 Netlify Function 代理 (`netlify/functions/api-proxy.js`)
- ✅ 配置 Netlify (`netlify.toml`)
- ✅ 添加完整文档

## 🔄 部署状态

### 1. 检查 Netlify 部署
1. 登录 [Netlify 控制台](https://app.netlify.com)
2. 进入你的项目
3. 查看 "Deploys" 标签
4. 确认最新部署状态为 "Published"

### 2. 部署时间
- 通常需要 2-5 分钟
- 查看部署日志确认没有错误

## 🧪 测试步骤

### 测试 1: 检查 Mixed Content 错误

1. 打开浏览器开发者工具（F12）
2. 访问部署后的网站：`https://agereverseslim.netlify.app/web/index.html`
3. 查看 Console 标签
4. **期望结果：** 不应再有 Mixed Content 错误

### 测试 2: 测试聊天功能

1. 在聊天页面发送一条消息
2. 观察是否有 AI 回复
3. **期望结果：** 能够正常收到 AI 回复

### 测试 3: 检查 Network 请求

1. 打开 Network 标签
2. 发送一条消息
3. 查找请求到 `/.netlify/functions/api-proxy/v1/chat-messages`
4. **期望结果：** 请求成功（200 状态码）

## 📊 验证清单

在部署完成后，请验证以下项目：

- [ ] Netlify 部署成功（状态：Published）
- [ ] 无 Mixed Content 错误
- [ ] 聊天功能正常工作
- [ ] API 请求使用代理（通过 Function 调用）
- [ ] 响应时间正常（可能略慢于直接调用）

## 🐛 故障排查

### 如果仍有 Mixed Content 错误

**可能原因：** Netlify 还在使用旧版本

**解决方案：**
1. 清除浏览器缓存（Ctrl+Shift+R 或 Cmd+Shift+R）
2. 硬刷新页面
3. 等待几分钟后重试
4. 检查 Netlify 是否部署成功

### 如果 Function 返回 404

**可能原因：** Function 未正确部署

**解决方案：**
1. 检查 Netlify 部署日志
2. 确认 `netlify/functions/api-proxy.js` 存在
3. 查看 Netlify 的 Functions 列表
4. 尝试手动触发部署

### 如果聊天无响应

**可能原因：** API 服务器或代理有问题

**检查：**
```bash
# 测试 API 服务器
curl http://aie.wenge.com:30051/v1/parameters -H "Authorization: Bearer app-7GvRPyu0pd3wzK7YDWF6byue"

# 检查 Netlify Function 日志
# 在 Netlify 控制台查看 Function 执行日志
```

## 📝 测试命令

### 本地测试（可选）

如果需要本地测试 Function：

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 启动本地开发服务器
netlify dev

# 访问 http://localhost:8888
```

## 🔍 日志查看

### Netlify Function 日志
1. 登录 Netlify 控制台
2. 进入项目
3. 点击 "Functions" 标签
4. 查看 `api-proxy` 的执行日志

### 浏览器控制台日志
- 打开开发者工具
- 查看 Console 和 Network 标签
- 检查是否有错误信息

## ✅ 成功标志

当看到以下情况时，说明修复成功：

1. ✅ 浏览器控制台无 Mixed Content 错误
2. ✅ 发送消息后收到 AI 回复
3. ✅ Network 显示请求到 `/.netlify/functions/api-proxy`
4. ✅ 请求状态为 200 OK

## 📞 需要帮助？

如果遇到问题：
1. 查看 Netlify 部署日志
2. 检查浏览器控制台错误
3. 查看 Netlify Function 日志
4. 参考文档：`docs/Netlify部署Mixed-Content解决方案.md`

## 🎯 预期结果

修复后，网站应该：
- ✅ 在 HTTPS 环境下正常工作
- ✅ 无 Mixed Content 错误
- ✅ 聊天功能可用
- ✅ API 请求通过代理安全转发

注意：由于使用了代理，响应速度可能会略慢于直接调用，这是正常现象。

