# Gitee Pages 部署指南

> 将 AI颜值管家 项目部署到 Gitee Pages，实现国内高速访问

---

## 📋 前置准备

### 1. 注册 Gitee 账号
- 访问 https://gitee.com/
- 注册并登录账号
- 完成实名认证（Pages服务需要）

### 2. 检查项目状态
```bash
cd "/Users/zhaoxiaogang/AI颜值管家"
git status
```

---

## 🚀 部署步骤

### 步骤1：创建/关联 Gitee 仓库

#### 方式A：已有 Gitee 仓库（推荐）
如果你已经创建了 Gitee 仓库，跳过此步骤。

检查远程仓库：
```bash
git remote -v
```

如果看到 `gitee` 相关的远程仓库，说明已配置好。

#### 方式B：新建 Gitee 仓库
1. 登录 Gitee
2. 点击右上角 "+" → "新建仓库"
3. 填写仓库信息：
   - 仓库名称：`ai-beauty-manager`（或其他名称）
   - 开源：选择 "公开" 或 "私有"（私有仓库需付费才能使用Pages）
   - 其他默认即可
4. 点击"创建"

5. 关联本地仓库：
```bash
# 如果已有gitee远程仓库，先删除
git remote remove gitee

# 添加新的gitee远程仓库（替换YOUR_USERNAME和YOUR_REPO）
git remote add gitee https://gitee.com/YOUR_USERNAME/YOUR_REPO.git
```

---

### 步骤2：提交并推送代码

```bash
# 1. 查看当前修改
git status

# 2. 添加所有文件到暂存区
git add .

# 3. 提交（如果有未提交的更改）
git commit -m "准备部署到Gitee Pages"

# 4. 推送到Gitee（首次推送加 -u 参数）
git push -u gitee main

# 如果是master分支
# git push -u gitee master
```

**常见问题**：
- 如果推送失败，可能需要配置Git凭据
- Mac用户可以使用：`git config --global credential.helper osxkeychain`
- 或使用SSH密钥（推荐）

---

### 步骤3：开启 Gitee Pages 服务

1. **进入仓库页面**
   - 访问你的Gitee仓库页面

2. **开启 Pages 服务**
   - 点击顶部菜单 "服务" → "Gitee Pages"
   - 如果没有看到，可能需要先完成实名认证

3. **配置部署**
   - **部署分支**：选择 `main`（或 `master`）
   - **部署目录**：留空（使用根目录）
   - **HTTPS**: 建议勾选（免费SSL证书）
   
4. **点击"启动"按钮**
   - 等待部署完成（通常1-2分钟）

5. **获取访问地址**
   - 部署成功后会显示访问地址
   - 格式：`https://YOUR_USERNAME.gitee.io/YOUR_REPO/`

---

### 步骤4：访问你的网站

部署成功后，你会获得以下访问地址：

```
# 主页（会自动跳转到前台）
https://YOUR_USERNAME.gitee.io/YOUR_REPO/

# 前台首页
https://YOUR_USERNAME.gitee.io/YOUR_REPO/web/

# 后台登录
https://YOUR_USERNAME.gitee.io/YOUR_REPO/admin/login.html

# 评估模块
https://YOUR_USERNAME.gitee.io/YOUR_REPO/web/pages/assessment/guide.html
```

---

## 🔄 更新网站内容

每次修改代码后，需要重新部署：

```bash
# 1. 提交更改
git add .
git commit -m "更新说明"

# 2. 推送到Gitee
git push gitee main

# 3. 手动更新Pages（重要！）
```

⚠️ **注意**：Gitee Pages 不会自动更新！

**手动更新步骤**：
1. 进入 Gitee 仓库页面
2. 点击 "服务" → "Gitee Pages"
3. 点击 "更新" 按钮
4. 等待重新部署完成

---

## ⚙️ 高级配置

### 绑定自定义域名

如果你有自己的域名（如 `www.yourdomain.com`）：

1. **在域名服务商添加CNAME记录**
   ```
   类型: CNAME
   主机记录: www（或 @）
   记录值: YOUR_USERNAME.gitee.io
   ```

2. **在Gitee Pages配置自定义域名**
   - 进入 Gitee Pages 页面
   - 找到"自定义域名"选项
   - 输入你的域名
   - 保存并等待生效（通常几分钟到24小时）

### HTTPS 证书

Gitee Pages 提供免费的 HTTPS 证书：
- 使用 `.gitee.io` 域名：自动启用HTTPS
- 自定义域名：需要在Pages设置中开启

---

## 🐛 常见问题

### Q1: 页面404错误

**原因**：Pages未正确部署或路径错误

**解决方法**：
1. 检查仓库是否设为"公开"（私有仓库需付费）
2. 确认已点击"启动"按钮
3. 检查部署分支是否正确（main 或 master）
4. 等待1-2分钟让部署完成

### Q2: 页面样式丢失

**原因**：资源路径问题

**解决方法**：
我们的项目已使用相对路径，不应该有此问题。如有问题，检查：
```javascript
// shared/path-config.js 已配置路径
```

### Q3: 推送代码时要求输入密码

**解决方法A - 使用SSH密钥（推荐）**：
```bash
# 1. 生成SSH密钥（如果没有）
ssh-keygen -t rsa -C "your_email@example.com"

# 2. 查看公钥
cat ~/.ssh/id_rsa.pub

# 3. 复制公钥内容，添加到Gitee
# Gitee → 设置 → SSH公钥 → 添加公钥

# 4. 修改远程仓库地址为SSH格式
git remote set-url gitee git@gitee.com:YOUR_USERNAME/YOUR_REPO.git
```

**解决方法B - 保存密码（简单但不够安全）**：
```bash
# Mac
git config --global credential.helper osxkeychain

# Linux
git config --global credential.helper store
```

### Q4: 需要实名认证

Gitee Pages 服务需要完成实名认证：
1. Gitee → 设置 → 实名认证
2. 按照提示完成认证（通常几分钟内完成）

### Q5: 更新代码后网站没变化

⚠️ **Gitee Pages 不会自动更新！**

每次推送代码后，需要：
1. 进入仓库的 Gitee Pages 页面
2. 点击"更新"按钮
3. 等待重新部署

### Q6: 页面显示"该网站暂时无法访问"

**可能原因**：
1. 部署仍在进行中 → 等待1-2分钟
2. 实名认证未完成 → 完成认证
3. 仓库设为私有但未付费 → 改为公开或购买付费服务

---

## 📊 Gitee Pages vs 其他平台对比

| 特性 | Gitee Pages | GitHub Pages | Vercel | Netlify |
|------|-------------|--------------|--------|---------|
| 国内访问速度 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| 免费额度 | 1GB存储 | 1GB存储 | 100GB流量 | 100GB流量 |
| 自动部署 | ❌ 需手动 | ✅ 自动 | ✅ 自动 | ✅ 自动 |
| HTTPS | ✅ 免费 | ✅ 免费 | ✅ 免费 | ✅ 免费 |
| 自定义域名 | ✅ 支持 | ✅ 支持 | ✅ 支持 | ✅ 支持 |
| 实名认证 | ✅ 需要 | ❌ 不需要 | ❌ 不需要 | ❌ 不需要 |

**选择建议**：
- 🇨🇳 **国内用户/目标用户在国内** → Gitee Pages
- 🌍 **国际用户/开源项目** → GitHub Pages
- ⚡ **需要自动部署** → Vercel / Netlify

---

## 🎯 快速命令速查表

```bash
# 检查远程仓库
git remote -v

# 添加Gitee远程仓库
git remote add gitee https://gitee.com/YOUR_USERNAME/YOUR_REPO.git

# 提交并推送
git add .
git commit -m "更新内容"
git push gitee main

# 查看分支
git branch -a

# 切换到main分支（如果不在）
git checkout main
```

---

## 📞 获取帮助

### Gitee官方文档
- Pages服务文档：https://gitee.com/help/articles/4136
- Git使用帮助：https://gitee.com/help/categories/43

### 遇到问题时
1. 查看本文档的"常见问题"部分
2. 查看 Gitee Pages 部署日志
3. 检查浏览器控制台（F12）错误信息
4. 参考 Gitee 官方文档

---

## ✅ 部署检查清单

部署前确认：
- [ ] Gitee账号已注册并完成实名认证
- [ ] 创建了公开仓库（或购买了私有仓库的Pages服务）
- [ ] 本地代码已提交：`git status` 显示无未提交更改
- [ ] 已推送到Gitee：`git push gitee main`
- [ ] 已在Gitee仓库开启Pages服务
- [ ] 点击了"启动"或"更新"按钮
- [ ] 等待1-2分钟让部署完成

部署后验证：
- [ ] 访问 Pages 地址，主页正常显示
- [ ] 前台页面正常访问：`/web/`
- [ ] 后台页面正常访问：`/admin/login.html`
- [ ] 图片和样式正常加载
- [ ] 评估模块功能正常

---

## 🎉 祝贺！

如果一切顺利，你的 AI颜值管家 项目现在已经可以通过 Gitee Pages 在线访问了！

**记住你的访问地址**：
```
https://YOUR_USERNAME.gitee.io/YOUR_REPO/
```

分享给朋友，让他们体验吧！ 🚀

---

**最后更新**：2025年10月
**项目**：AI颜值管家
**文档版本**：v1.0

