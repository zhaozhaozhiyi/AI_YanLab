# Gitee Pages 使用指南

> 国内访问速度最快的静态网站托管服务

---

## 📖 什么是 Gitee Pages？

Gitee Pages 是 Gitee（码云）提供的**免费静态网站托管服务**，类似于 GitHub Pages，但针对国内用户进行了优化。

### 核心优势

- 🚀 **国内高速访问**：服务器位于国内，访问速度远超 GitHub Pages
- 💰 **完全免费**：提供 1GB 存储空间，支持无限流量访问
- 🔒 **HTTPS 支持**：免费提供 SSL 证书，确保网站安全
- 🌐 **自定义域名**：支持绑定个人域名
- 📦 **简单部署**：通过 Git 推送代码即可完成部署

### 适用场景

- ✅ 个人博客、作品集网站
- ✅ 开源项目文档、演示页面
- ✅ 静态网站、单页应用（SPA）
- ✅ HTML/CSS/JavaScript 项目展示
- ❌ 不支持后端服务（PHP、Python、Node.js 等）
- ❌ 不支持数据库

---

## 🎯 快速开始

### 前置要求

1. **注册 Gitee 账号**
   - 访问 https://gitee.com/ 注册账号
   - **完成实名认证**（Pages 服务必需）
   
2. **准备静态网站文件**
   - HTML、CSS、JavaScript 文件
   - 确保有 `index.html` 作为入口文件

3. **安装 Git**（如果还没有）
   - Mac: `brew install git`
   - Windows: 下载 [Git for Windows](https://git-scm.com/download/win)

---

## 🚀 部署流程

### 第一步：创建 Gitee 仓库

1. 登录 Gitee，点击右上角 **"+"** → **"新建仓库"**

2. 填写仓库信息：
   - **仓库名称**：如 `my-website`
   - **开源**：必须选择 **"公开"**（私有仓库需付费）
   - **初始化仓库**：可选，建议勾选"添加 README"
   
3. 点击 **"创建"**

### 第二步：上传网站文件

#### 方式 A：通过 Git 命令行（推荐）

```bash
# 1. 进入你的网站项目目录
cd /path/to/your/website

# 2. 初始化 Git 仓库（如果还没有）
git init

# 3. 添加 Gitee 远程仓库
git remote add origin https://gitee.com/YOUR_USERNAME/YOUR_REPO.git

# 4. 添加文件到暂存区
git add .

# 5. 提交文件
git commit -m "Initial commit"

# 6. 推送到 Gitee
git push -u origin master
# 或者 main 分支: git push -u origin main
```

#### 方式 B：直接上传文件

- 在 Gitee 仓库页面，点击 **"上传文件"**
- 拖拽或选择文件上传
- 填写提交说明，点击 **"提交"**

### 第三步：开启 Pages 服务

1. 进入你的 Gitee 仓库页面

2. 点击顶部菜单 **"服务"** → **"Gitee Pages"**

3. 配置部署选项：
   - **部署分支**：选择 `master` 或 `main`
   - **部署目录**：通常留空（使用根目录）
   - **强制使用 HTTPS**：建议勾选
   
4. 点击 **"启动"** 按钮，等待部署完成（1-2 分钟）

5. 部署成功后，会显示访问地址：
   ```
   https://YOUR_USERNAME.gitee.io/YOUR_REPO/
   ```

### 第四步：访问你的网站

在浏览器中打开生成的地址，你的网站就上线了！🎉

**URL 结构说明**：
```
https://YOUR_USERNAME.gitee.io/YOUR_REPO/
       └─────┬─────┘           └───┬───┘
           用户名              仓库名
```

示例：
- 用户名：`zhangsan`
- 仓库名：`blog`
- 访问地址：`https://zhangsan.gitee.io/blog/`

---

## 🔄 更新网站内容

### 重要提醒

⚠️ **Gitee Pages 不支持自动部署**！每次推送代码后，需要手动点击"更新"按钮。

### 更新步骤

```bash
# 1. 修改本地文件后，提交更改
git add .
git commit -m "更新网站内容"

# 2. 推送到 Gitee
git push origin master
# 或者: git push origin main
```

3. **手动触发部署**（关键步骤）：
   - 登录 Gitee，进入仓库页面
   - 点击 **"服务"** → **"Gitee Pages"**
   - 点击 **"更新"** 按钮
   - 等待重新部署（通常 1-2 分钟）

4. 刷新浏览器查看更新

### 更新频率限制

- 免费用户：每天可更新 **10 次**
- 企业版用户：无限制

---

## ⚙️ 高级功能

### 1. 自定义域名绑定

如果你拥有自己的域名（如 `www.mysite.com`），可以绑定到 Gitee Pages：

**步骤 A：配置 DNS 解析**

在你的域名服务商（如阿里云、腾讯云）添加 CNAME 记录：

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|-------|
| CNAME | www | YOUR_USERNAME.gitee.io |

或使用根域名（@）：
| 记录类型 | 主机记录 | 记录值 |
|---------|---------|-------|
| A | @ | Gitee Pages IP 地址 |

**步骤 B：在 Gitee Pages 配置域名**

1. 进入仓库的 Gitee Pages 页面
2. 找到 **"自定义域名"** 选项
3. 输入你的域名（如 `www.mysite.com`）
4. 保存设置
5. 等待生效（通常 10 分钟 ~ 24 小时）

**步骤 C：启用 HTTPS**

- 自定义域名绑定成功后，在 Pages 设置中勾选 **"强制使用 HTTPS"**
- Gitee 会自动申请免费 SSL 证书

### 2. 指定部署目录

如果你的网站文件不在仓库根目录，可以指定部署目录：

```
项目结构：
my-repo/
├── src/           # 源代码
├── docs/          # 文档
└── dist/          # 构建后的静态文件 ← 部署这个目录
    └── index.html
```

在 Gitee Pages 配置中：
- **部署目录**：填写 `dist`

### 3. 使用子目录部署

适用于在一个仓库中部署多个站点：

```
my-repo/
├── site-a/
│   └── index.html  → https://xxx.gitee.io/my-repo/site-a/
└── site-b/
    └── index.html  → https://xxx.gitee.io/my-repo/site-b/
```

访问时需要加上子目录路径。

### 4. HTTPS 证书

Gitee Pages 提供免费的 HTTPS 支持：

- **默认域名** (`xxx.gitee.io`)：自动启用 HTTPS
- **自定义域名**：绑定后自动申请 Let's Encrypt 证书
- **强制 HTTPS**：在设置中勾选，自动重定向 HTTP 到 HTTPS

---

## 🐛 常见问题与解决方案

### Q1: 访问网站显示 404 错误

**可能原因**：
- 仓库未设置为"公开"
- 未点击"启动"按钮
- 部署分支选择错误
- 部署尚未完成

**解决方法**：
1. 确认仓库权限为 **"公开"**（私有仓库需要付费）
2. 进入 Pages 页面，确认已点击 **"启动"** 按钮
3. 检查部署分支是否正确（`master` 或 `main`）
4. 等待 1-2 分钟让部署完成
5. 确保仓库根目录有 `index.html` 文件

### Q2: 页面样式丢失或资源加载失败

**原因**：静态资源路径配置错误

**解决方法**：

使用相对路径而非绝对路径：

```html
<!-- ❌ 错误：使用绝对路径 -->
<link rel="stylesheet" href="/css/style.css">
<script src="/js/app.js"></script>

<!-- ✅ 正确：使用相对路径 -->
<link rel="stylesheet" href="./css/style.css">
<script src="./js/app.js"></script>

<!-- ✅ 或使用完整相对路径 -->
<link rel="stylesheet" href="../css/style.css">
```

如果项目较复杂，可以在 HTML 中添加 `<base>` 标签：

```html
<head>
  <base href="/YOUR_REPO/">
  <!-- 其他标签 -->
</head>
```

### Q3: 推送代码时要求输入用户名密码

**解决方案 A：使用 SSH 密钥（推荐）**

```bash
# 1. 生成 SSH 密钥（如果还没有）
ssh-keygen -t rsa -C "your_email@example.com"
# 一路回车使用默认配置

# 2. 查看并复制公钥
cat ~/.ssh/id_rsa.pub
# Windows: type %USERPROFILE%\.ssh\id_rsa.pub

# 3. 添加公钥到 Gitee
# 登录 Gitee → 设置 → SSH公钥 → 添加公钥 → 粘贴内容

# 4. 测试连接
ssh -T git@gitee.com

# 5. 修改远程仓库为 SSH 地址
git remote set-url origin git@gitee.com:YOUR_USERNAME/YOUR_REPO.git
```

**解决方案 B：保存 HTTPS 凭据**

```bash
# Mac 系统
git config --global credential.helper osxkeychain

# Windows 系统
git config --global credential.helper wincred

# Linux 系统
git config --global credential.helper store
```

### Q4: 提示需要完成实名认证

Gitee Pages 服务要求必须完成实名认证：

1. 登录 Gitee → 右上角头像 → **设置**
2. 左侧菜单 → **实名认证**
3. 按照提示提交信息（身份证或企业资料）
4. 等待审核（通常 5-30 分钟）

### Q5: 推送代码后网站没有更新

⚠️ **Gitee Pages 不支持自动部署！**

必须手动触发更新：
1. 推送代码到 Gitee
2. 登录 Gitee 仓库页面
3. 点击 **"服务"** → **"Gitee Pages"**
4. 点击 **"更新"** 按钮
5. 等待重新部署完成

### Q6: 显示"该网站暂时无法访问"

**可能原因及解决方法**：

| 原因 | 解决方法 |
|-----|---------|
| 部署进行中 | 等待 1-2 分钟 |
| 实名认证未完成 | 完成实名认证 |
| 仓库为私有 | 改为公开或升级到付费版 |
| Pages 服务未启动 | 进入 Pages 页面点击"启动" |

### Q7: Git 推送失败，提示权限问题

```bash
# 检查远程仓库地址是否正确
git remote -v

# 如果地址错误，重新设置
git remote set-url origin https://gitee.com/YOUR_USERNAME/YOUR_REPO.git

# 确认当前 Git 用户配置
git config user.name
git config user.email

# 如果未配置，设置用户信息
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

### Q8: 每天更新次数用完了

免费用户每天只能更新 10 次，如果超限：

- **等待第二天**：更新次数每天 0 点重置
- **升级到企业版**：获得无限更新次数
- **使用其他平台**：考虑 Vercel、Netlify（支持自动部署）

---

## 📊 静态网站托管平台对比

| 特性 | Gitee Pages | GitHub Pages | Vercel | Netlify |
|------|-------------|--------------|--------|---------|
| **国内访问速度** | ⭐⭐⭐⭐⭐ 极快 | ⭐⭐ 较慢 | ⭐⭐⭐ 中等 | ⭐⭐⭐ 中等 |
| **免费额度** | 1GB 存储 | 1GB 存储 | 100GB 流量/月 | 100GB 流量/月 |
| **自动部署** | ❌ 需手动更新 | ✅ 推送即部署 | ✅ 推送即部署 | ✅ 推送即部署 |
| **构建功能** | ❌ 仅静态 | ✅ Jekyll | ✅ 支持所有框架 | ✅ 支持所有框架 |
| **HTTPS** | ✅ 免费 | ✅ 免费 | ✅ 免费 | ✅ 免费 |
| **自定义域名** | ✅ 支持 | ✅ 支持 | ✅ 支持 | ✅ 支持 |
| **实名认证** | ✅ 必须 | ❌ 不需要 | ❌ 不需要 | ❌ 不需要 |
| **更新频率** | 10次/天（免费） | 无限制 | 无限制 | 无限制 |

### 选择建议

| 使用场景 | 推荐平台 | 原因 |
|---------|---------|------|
| 🇨🇳 面向国内用户 | **Gitee Pages** | 国内访问速度最快 |
| 🌍 国际开源项目 | **GitHub Pages** | 社区活跃，自动部署 |
| ⚡ Vue/React 等 SPA | **Vercel** | 自动构建，性能优化 |
| 🎨 需要频繁更新 | **Netlify** | 自动部署，预览功能 |

---

## 💡 最佳实践

### 1. 项目结构建议

```
my-website/
├── index.html          # 必需：网站入口
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   └── logo.png
├── README.md           # 可选：项目说明
└── .gitignore          # 可选：忽略文件配置
```

### 2. 推荐的 .gitignore 配置

```gitignore
# 操作系统文件
.DS_Store
Thumbs.db

# 编辑器文件
.vscode/
.idea/
*.swp

# 依赖和构建文件（如果有）
node_modules/
dist/
*.log
```

### 3. 性能优化建议

- ✅ 压缩图片（使用 TinyPNG 等工具）
- ✅ 压缩 CSS/JS 文件
- ✅ 使用 CDN 加载常用库（如 jQuery、Bootstrap）
- ✅ 启用浏览器缓存
- ✅ 减少 HTTP 请求数量

### 4. SEO 优化

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="网站描述">
  <meta name="keywords" content="关键词1, 关键词2">
  <title>网站标题</title>
  
  <!-- Open Graph 标签（分享到社交媒体时显示） -->
  <meta property="og:title" content="网站标题">
  <meta property="og:description" content="网站描述">
  <meta property="og:image" content="https://your-site.com/image.jpg">
</head>
```

---

## 🎯 Git 命令速查表

### 基础操作

```bash
# 初始化仓库
git init

# 查看状态
git status

# 添加文件
git add .                    # 添加所有文件
git add index.html          # 添加单个文件

# 提交更改
git commit -m "提交说明"

# 查看提交历史
git log --oneline
```

### 远程仓库操作

```bash
# 添加远程仓库
git remote add origin https://gitee.com/USERNAME/REPO.git

# 查看远程仓库
git remote -v

# 修改远程仓库地址
git remote set-url origin NEW_URL

# 推送到远程仓库
git push origin master       # 推送到 master 分支
git push -u origin master    # 首次推送（设置上游）

# 拉取远程更新
git pull origin master
```

### 分支操作

```bash
# 查看分支
git branch                   # 查看本地分支
git branch -a                # 查看所有分支

# 切换分支
git checkout master
git checkout main

# 创建并切换分支
git checkout -b new-branch
```

---

## 📚 学习资源

### 官方文档
- **Gitee Pages 文档**：https://gitee.com/help/articles/4136
- **Git 教程**：https://git-scm.com/book/zh/v2
- **Markdown 语法**：https://markdown.com.cn/

### 推荐工具
- **代码编辑器**：VS Code, Sublime Text
- **Git 客户端**：GitHub Desktop, SourceTree
- **图片压缩**：TinyPNG, Squoosh
- **在线调试**：CodePen, JSFiddle

---

## ✅ 部署检查清单

### 部署前

- [ ] Gitee 账号已注册
- [ ] 已完成实名认证
- [ ] 创建了公开仓库
- [ ] 仓库中有 `index.html` 文件
- [ ] 本地代码已提交：`git status` 无未提交更改
- [ ] 已推送到 Gitee：`git push origin master`

### 部署时

- [ ] 进入仓库的 "服务" → "Gitee Pages"
- [ ] 选择正确的部署分支
- [ ] 点击 "启动" 按钮
- [ ] 等待 1-2 分钟部署完成

### 部署后

- [ ] 访问 Pages 地址，网站正常显示
- [ ] 所有页面链接都能正常跳转
- [ ] 图片、CSS、JS 等资源正常加载
- [ ] 在手机端测试（响应式设计）
- [ ] 测试 HTTPS 访问

---

## 🎉 恭喜！

如果你已经完成了所有步骤，你的网站现在已经成功部署到 Gitee Pages！

**你的网站地址**：
```
https://YOUR_USERNAME.gitee.io/YOUR_REPO/
```

### 下一步你可以：

- 📱 分享网站链接给朋友
- 🎨 继续完善网站内容和设计
- 🔗 绑定自定义域名
- 📊 添加访问统计（如百度统计、Google Analytics）
- 🚀 探索其他部署平台（Vercel、Netlify）

---

## 💬 反馈与支持

遇到问题或有建议？

- 查看 [常见问题](#常见问题与解决方案) 部分
- 访问 [Gitee 官方文档](https://gitee.com/help)
- 在 Gitee 社区提问

---

**最后更新**：2025年10月  
**文档版本**：v2.0  
**适用于**：所有静态网站项目

