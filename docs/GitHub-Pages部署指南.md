# GitHub Pages 部署指南

## 📖 什么是 GitHub Pages

### 简介

GitHub Pages 是 GitHub 提供的一项**免费静态网站托管服务**，允许您直接从 GitHub 仓库发布网站内容。它专为静态网站设计，非常适合托管项目文档、个人博客、作品展示和前端应用。

### 核心特性

- **🆓 完全免费**：无需支付任何托管费用
- **🌐 全球 CDN**：GitHub 的全球内容分发网络，访问速度快
- **🔒 HTTPS 支持**：自动提供 SSL 证书，确保网站安全
- **🚀 自动部署**：代码推送后自动更新网站
- **🎯 易于使用**：无需服务器配置，几步即可上线
- **📦 版本控制**：网站内容完全由 Git 管理
- **🔗 自定义域名**：支持绑定您自己的域名

### 适用场景

✅ **适合部署的内容：**
- 静态 HTML/CSS/JavaScript 网站
- React、Vue、Angular 等前端框架构建的单页应用
- 项目文档和 API 文档
- 个人博客（如 Jekyll、Hugo 等静态博客）
- 在线简历和作品集
- 开源项目演示页面

❌ **不适合的场景：**
- 需要服务器端处理的动态网站（如 PHP、Python、Java 后端）
- 需要数据库的应用
- 需要文件上传功能的网站
- 实时数据处理应用

### GitHub Pages 的三种类型

1. **用户/组织站点**
   - 仓库名必须是：`username.github.io`
   - 访问地址：`https://username.github.io`
   - 每个账户只能有一个

2. **项目站点**
   - 任意仓库名
   - 访问地址：`https://username.github.io/repository-name`
   - 可以创建无限个

3. **自定义域名站点**
   - 配置 CNAME 后使用自己的域名
   - 访问地址：`https://your-domain.com`

## 🚀 GitHub Pages 的优势

### 1. 零成本部署
- 无需购买服务器或虚拟主机
- 无需支付流量费用
- 适合个人项目和中小型网站

### 2. 简单快速
- 不需要复杂的服务器配置
- 不需要 FTP 上传
- Git 推送即可完成部署

### 3. 高可用性
- GitHub 提供稳定的服务保障
- 全球 CDN 加速
- 自动负载均衡

### 4. 与 GitHub 深度集成
- 代码和网站在同一个仓库
- 支持 GitHub Actions 自动化
- 可以利用 Pull Request 进行网站更新审查

## 📋 快速开始

### 方法一：使用分支部署（最简单）

这是最传统也是最简单的部署方式，适合初学者。

1. **准备网站文件**
   - 确保您的仓库包含 `index.html` 文件
   - 所有静态资源（CSS、JS、图片等）都在仓库中

2. **启用 GitHub Pages**
   - 进入您的 GitHub 仓库
   - 点击 **Settings**（设置）标签
   - 在左侧菜单中找到 **Pages**
   - 在 **Source**（来源）部分：
     - **Branch**：选择 `main` 分支（或其他分支）
     - **Folder**：选择 `/ (root)` 或 `/docs` 文件夹
   - 点击 **Save**（保存）

3. **等待部署**
   - GitHub 会自动开始构建和部署
   - 通常需要 1-3 分钟
   - 页面顶部会显示您的网站地址

4. **访问网站**
   - 部署成功后，访问：`https://username.github.io/repository-name/`
   - 将 `username` 替换为您的 GitHub 用户名
   - 将 `repository-name` 替换为您的仓库名

### 方法二：使用 GitHub Actions（推荐）

这种方式更灵活，支持构建流程和自动化部署。

1. **创建工作流文件**

在仓库根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

2. **配置仓库设置**
   - 进入 **Settings** → **Pages**
   - **Source** 选择 **GitHub Actions**
   - 进入 **Settings** → **Actions** → **General**
   - **Workflow permissions** 选择 **Read and write permissions**

3. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

4. **查看部署状态**
   - 进入仓库的 **Actions** 标签
   - 查看工作流运行状态
   - 等待部署完成

### 方法三：使用 Jekyll（适合博客）

GitHub Pages 原生支持 Jekyll 静态博客生成器。

1. **创建 Jekyll 网站**
   ```bash
   gem install bundler jekyll
   jekyll new my-blog
   cd my-blog
   ```

2. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repository.git
   git push -u origin main
   ```

3. **启用 GitHub Pages**
   - 在仓库设置中启用 Pages
   - 选择 main 分支
   - GitHub 会自动识别 Jekyll 并构建

## 🌐 访问您的网站

### 默认访问地址

部署成功后，您的网站地址取决于仓库类型：

1. **用户/组织站点**
   - 仓库名：`username.github.io`
   - 访问地址：`https://username.github.io`

2. **项目站点**
   - 仓库名：任意名称（如 `my-project`）
   - 访问地址：`https://username.github.io/my-project/`

### 查看部署状态

1. 进入仓库的 **Settings** → **Pages**
2. 页面顶部会显示：
   - ✅ **Your site is live at** `https://...` （部署成功）
   - ⏳ **Your site is ready to be published** （准备中）
   - ❌ 错误信息（部署失败）

## 📁 目录结构建议

### 基础网站结构

```
your-repository/
├── index.html              # 网站首页（必需）
├── about.html              # 其他页面
├── contact.html
├── assets/                 # 静态资源
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── logo.png
└── README.md               # 项目说明
```

### 使用 docs 文件夹

如果不想将网站文件放在根目录：

```
your-repository/
├── docs/                   # 网站文件
│   ├── index.html
│   ├── assets/
│   └── ...
├── src/                    # 源代码
└── README.md
```

然后在 GitHub Pages 设置中选择 `/docs` 文件夹。

### 前端框架项目结构

对于 React、Vue 等框架：

```
your-repository/
├── dist/                   # 构建输出（部署这个）
├── src/                    # 源代码
├── public/
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml      # 自动构建并部署
```

## 🔧 高级配置

### 配置自定义域名

如果您有自己的域名，可以将其绑定到 GitHub Pages。

#### 步骤 1：添加 CNAME 文件

在仓库根目录创建 `CNAME` 文件（无扩展名）：

```
www.yourdomain.com
```

或者不带 www：

```
yourdomain.com
```

#### 步骤 2：配置 DNS

在您的域名服务商处添加 DNS 记录：

**如果使用顶级域名（example.com）：**
```
类型: A
名称: @
值: 185.199.108.153
值: 185.199.109.153
值: 185.199.110.153
值: 185.199.111.153
```

**如果使用子域名（www.example.com）：**
```
类型: CNAME
名称: www
值: username.github.io
```

#### 步骤 3：在 GitHub 启用自定义域名

1. 进入 **Settings** → **Pages**
2. 在 **Custom domain** 输入您的域名
3. 点击 **Save**
4. 等待 DNS 检查通过（可能需要几分钟到 24 小时）
5. 勾选 **Enforce HTTPS**（强烈推荐）

### 禁用 Jekyll 处理

如果您的网站不使用 Jekyll，或者有以下划线开头的文件/文件夹：

在仓库根目录创建 `.nojekyll` 文件（空文件即可）：

```bash
touch .nojekyll
git add .nojekyll
git commit -m "Disable Jekyll processing"
git push
```

### 配置 404 页面

创建自定义的 404 错误页面：

在根目录创建 `404.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面未找到 - 404</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        h1 { color: #333; }
        a { color: #0366d6; }
    </style>
</head>
<body>
    <h1>404 - 页面未找到</h1>
    <p>抱歉，您访问的页面不存在。</p>
    <a href="/">返回首页</a>
</body>
</html>
```

### 配置网站图标 (Favicon)

在根目录添加 `favicon.ico` 文件，或在 HTML 中引用：

```html
<link rel="icon" type="image/png" href="/assets/favicon.png">
```

### 配置 robots.txt

控制搜索引擎爬虫行为，在根目录创建 `robots.txt`：

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

如果不想被搜索引擎索引：

```
User-agent: *
Disallow: /
```

## 🐛 常见问题与解决方案

### Q1: 网站显示 404 错误

**问题描述：** 访问网站时显示 404 Not Found

**可能原因和解决方案：**

1. **缺少 index.html 文件**
   - 确保仓库根目录（或选定的文件夹）有 `index.html`
   - 文件名必须是小写的 `index.html`

2. **路径大小写问题**
   - GitHub Pages 对文件名大小写敏感
   - 确保链接中的大小写与实际文件名完全一致
   - 例如：`About.html` 和 `about.html` 是不同的文件

3. **Jekyll 忽略了某些文件**
   - 以下划线 `_` 开头的文件夹会被 Jekyll 忽略
   - 解决：在根目录创建 `.nojekyll` 文件

4. **部署还在进行中**
   - 首次部署需要几分钟
   - 检查 Settings → Pages 查看部署状态

### Q2: 部署失败或一直显示 "Ready to be published"

**解决步骤：**

1. **检查仓库设置**
   ```
   Settings → Pages → Source
   确保选择了正确的分支和文件夹
   ```

2. **检查分支是否存在内容**
   ```bash
   git log  # 确保分支有提交记录
   git push origin main  # 重新推送
   ```

3. **如果使用 GitHub Actions**
   - 检查 Actions 权限：Settings → Actions → General
   - 确保 Workflow permissions 设置为 "Read and write permissions"
   - 查看 Actions 标签页的错误日志

4. **强制重新部署**
   ```bash
   git commit --allow-empty -m "Trigger rebuild"
   git push
   ```

### Q3: CSS/JS/图片无法加载

**问题描述：** 页面显示但样式、脚本或图片不显示

**解决方案：**

1. **使用正确的路径**
   - ❌ 错误：`<link href="/css/style.css">`（项目站点）
   - ✅ 正确：`<link href="/repository-name/css/style.css">`
   - ✅ 最佳：`<link href="css/style.css">`（相对路径）

2. **使用相对路径**
   ```html
   <!-- 推荐使用相对路径，适用于所有情况 -->
   <link rel="stylesheet" href="./assets/css/style.css">
   <script src="./assets/js/main.js"></script>
   <img src="./assets/images/logo.png">
   ```

3. **使用 base 标签（适用于单页应用）**
   ```html
   <head>
     <base href="/repository-name/">
   </head>
   ```

4. **检查文件确实存在**
   - 在仓库中查看文件是否已提交
   - 检查文件路径大小写

### Q4: 自定义域名无法访问

**诊断步骤：**

1. **检查 DNS 配置**
   ```bash
   # 使用 dig 命令检查 DNS
   dig yourdomain.com
   
   # 或使用在线工具
   # https://dnschecker.org
   ```

2. **验证 CNAME 文件**
   - 文件名必须是 `CNAME`（全大写，无扩展名）
   - 内容只有一行域名，不要有 `http://` 或尾部斜杠
   - 正确示例：`www.example.com`

3. **等待 DNS 传播**
   - DNS 更改可能需要几分钟到 48 小时
   - 使用 `https://dnschecker.org` 检查全球传播状态

4. **检查 GitHub 设置**
   - Settings → Pages → Custom domain
   - 确保显示绿色对勾 ✅
   - 如果显示警告，按提示操作

### Q5: 网站更新后没有变化

**解决方案：**

1. **清除浏览器缓存**
   - Chrome: Ctrl+Shift+Delete (Windows) 或 Cmd+Shift+Delete (Mac)
   - 或使用无痕模式测试

2. **强制刷新页面**
   - Windows: Ctrl+F5
   - Mac: Cmd+Shift+R

3. **检查文件是否已推送**
   ```bash
   git status  # 确保没有未提交的更改
   git log     # 确认最新提交
   git push    # 推送到 GitHub
   ```

4. **等待部署完成**
   - 查看 Actions 标签确认部署成功
   - 通常需要 1-3 分钟

### Q6: 提示 "Build and deployment" 错误

**常见错误和解决方案：**

1. **权限错误**
   ```
   Error: Resource not accessible by integration
   ```
   解决：Settings → Actions → General → Workflow permissions
   选择 "Read and write permissions"

2. **工作流文件错误**
   - 检查 YAML 语法是否正确
   - 使用 [YAML Lint](http://www.yamllint.com/) 验证

3. **依赖安装失败**
   - 检查 `package.json` 中的依赖
   - 在 Actions 日志中查看具体错误

### Q7: 单页应用(SPA)刷新后 404

**问题：** React/Vue 应用中，刷新非首页路由时显示 404

**解决方案：**

创建自定义 404.html，自动重定向到 index.html：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>加载中...</title>
  <script>
    // 存储当前路径
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;URL='/'">
</head>
<body>
</body>
</html>
```

在 index.html 中添加：

```html
<script>
  (function(){
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

### Q8: 文件大小限制

**限制说明：**
- 单个文件不能超过 100 MB
- 仓库建议不超过 1 GB
- 网站总大小建议不超过 1 GB
- 每月带宽限制：100 GB
- 每小时构建次数：10 次

**解决大文件问题：**
1. 压缩图片和视频
2. 使用外部 CDN 托管大文件
3. 使用 Git LFS（但 Pages 不会发布 LFS 文件）
4. 考虑使用其他托管服务

## 🔄 日常维护

### 更新网站内容

**标准流程：**

```bash
# 1. 修改文件
# 编辑您的 HTML、CSS、JS 等文件

# 2. 查看更改
git status
git diff

# 3. 提交更改
git add .
git commit -m "描述您的更改内容"

# 4. 推送到 GitHub
git push origin main

# 5. 等待自动部署（1-3 分钟）
# 访问网站查看更新
```

### 查看部署状态

**方法一：在 Settings 中查看**
1. 进入仓库的 **Settings** → **Pages**
2. 查看顶部的状态信息

**方法二：在 Actions 中查看（使用 Actions 部署时）**
1. 点击 **Actions** 标签
2. 查看最新的工作流运行
3. 点击进入查看详细日志

### 监控网站访问

1. 进入仓库的 **Insights** 标签
2. 点击左侧 **Traffic**
3. 查看：
   - 访问量统计
   - 独立访客数
   - 热门内容
   - 引荐来源

### 回滚到之前的版本

```bash
# 查看提交历史
git log --oneline

# 回滚到指定提交（创建新提交）
git revert <commit-hash>
git push

# 或者重置到指定版本（谨慎使用）
git reset --hard <commit-hash>
git push --force  # 需要强制推送
```

## 💡 实用技巧

### 本地预览网站

在推送到 GitHub 之前，先在本地测试：

**方法一：使用 Python（最简单）**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# 访问 http://localhost:8000
```

**方法二：使用 Node.js**
```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
http-server

# 访问 http://localhost:8080
```

**方法三：使用 VS Code**
- 安装 "Live Server" 插件
- 右键 HTML 文件，选择 "Open with Live Server"

### 加速网站加载

1. **压缩图片**
   - 使用 TinyPNG、ImageOptim 等工具
   - 推荐格式：WebP（现代浏览器支持）

2. **压缩 CSS 和 JavaScript**
   - 使用在线工具：https://www.minifier.org/
   - 或使用构建工具（Webpack、Vite 等）

3. **使用 CDN 加载库**
   ```html
   <!-- 从 CDN 加载，而不是本地文件 -->
   <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
   ```

4. **启用浏览器缓存**
   - GitHub Pages 自动配置合理的缓存策略

### 添加 Google Analytics

在所有页面的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### SEO 优化

**1. 添加 meta 标签**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="网站描述，140字以内">
  <meta name="keywords" content="关键词1, 关键词2, 关键词3">
  <meta name="author" content="作者名">
  
  <!-- Open Graph (社交媒体分享) -->
  <meta property="og:title" content="页面标题">
  <meta property="og:description" content="页面描述">
  <meta property="og:image" content="https://your-site.com/preview.jpg">
  <meta property="og:url" content="https://your-site.com">
  
  <title>页面标题 - 网站名称</title>
</head>
```

**2. 创建 sitemap.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/about.html</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**3. 提交到搜索引擎**
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters

## 🚀 进阶用法

### 部署 React 应用

**使用 Create React App：**

1. **修改 package.json**
   ```json
   {
     "homepage": "https://username.github.io/repository-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

2. **安装 gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **部署**
   ```bash
   npm run deploy
   ```

**使用 GitHub Actions（推荐）：**

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy React App

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './build'
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### 部署 Vue 应用

**vue.config.js 配置：**

```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/repository-name/'
    : '/',
  outputDir: 'dist'
}
```

**GitHub Actions 工作流：**

```yaml
name: Deploy Vue App

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install and Build
        run: |
          npm ci
          npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### 使用环境变量

在 GitHub Actions 中使用环境变量：

```yaml
- name: Build
  env:
    VITE_API_URL: ${{ secrets.API_URL }}
    VITE_APP_KEY: ${{ secrets.APP_KEY }}
  run: npm run build
```

在仓库 Settings → Secrets → Actions 中添加密钥。

## 📚 参考资源

### 官方文档
- [GitHub Pages 官方文档](https://docs.github.com/zh/pages)
- [GitHub Actions 文档](https://docs.github.com/zh/actions)
- [自定义域名配置指南](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site)

### 社区资源
- [Jekyll 官方网站](https://jekyllrb.com/)
- [Hugo 静态网站生成器](https://gohugo.io/)
- [Hexo 博客框架](https://hexo.io/)

### 有用工具
- [YAML Lint](http://www.yamllint.com/) - YAML 语法检查
- [DNS Checker](https://dnschecker.org/) - DNS 传播检查
- [PageSpeed Insights](https://pagespeed.web.dev/) - 网站性能测试
- [Can I Use](https://caniuse.com/) - 浏览器兼容性查询

### 学习教程
- [GitHub Pages 快速入门](https://docs.github.com/zh/pages/quickstart)
- [GitHub Actions 入门教程](https://docs.github.com/zh/actions/quickstart)
- [Git 基础教程](https://git-scm.com/book/zh/v2)

## 🎯 最佳实践

### 1. 代码管理
- ✅ 使用有意义的提交信息（如："修复导航栏响应式问题"）
- ✅ 定期提交，避免一次提交太多更改
- ✅ 使用分支进行功能开发，合并后再部署
- ✅ 添加 `.gitignore` 忽略不必要的文件

```gitignore
# 依赖
node_modules/
package-lock.json

# 构建输出（如果使用源码部署）
dist/
build/

# 系统文件
.DS_Store
Thumbs.db

# IDE 配置
.vscode/
.idea/
```

### 2. 性能优化
- ✅ 压缩图片和静态资源
- ✅ 使用 CDN 加载第三方库
- ✅ 启用浏览器缓存
- ✅ 减少 HTTP 请求次数
- ✅ 使用懒加载技术

### 3. 安全性
- ✅ 不要在代码中硬编码 API 密钥
- ✅ 使用 GitHub Secrets 存储敏感信息
- ✅ 启用 HTTPS（GitHub Pages 默认）
- ✅ 定期更新依赖包，修复安全漏洞

### 4. 用户体验
- ✅ 确保网站响应式设计，支持移动设备
- ✅ 添加 favicon 和 meta 标签
- ✅ 提供自定义 404 页面
- ✅ 优化页面加载速度
- ✅ 添加访问统计和分析

### 5. 维护和监控
- ✅ 定期检查部署状态
- ✅ 监控网站访问数据
- ✅ 保持本地备份
- ✅ 在本地测试后再部署
- ✅ 为重要版本打 Git 标签

```bash
# 创建版本标签
git tag -a v1.0.0 -m "First stable release"
git push origin v1.0.0
```

## ⚠️ 使用限制

### GitHub Pages 的限制

| 项目 | 限制 |
|------|------|
| 仓库大小 | 建议 < 1 GB |
| 发布站点大小 | < 1 GB |
| 单文件大小 | < 100 MB |
| 带宽 | 100 GB/月 |
| 构建次数 | 10 次/小时 |
| 静态文件 | 仅支持静态内容 |

### 不支持的功能
- ❌ 服务器端语言（PHP、Python、Ruby 等）
- ❌ 数据库
- ❌ 服务器端会话
- ❌ 文件上传
- ❌ WebSocket 长连接
- ❌ 自定义服务器配置

### 替代方案

如果需要以上功能，考虑：
- **Netlify**：支持 serverless functions
- **Vercel**：适合前端框架，支持 API routes
- **Cloudflare Pages**：类似 GitHub Pages，功能更强
- **传统主机**：VPS、云服务器等

## 🎉 总结

GitHub Pages 是一个强大且免费的静态网站托管服务，非常适合：
- 📚 项目文档和技术博客
- 🎨 个人作品集和简历
- 🚀 前端应用演示
- 📱 开源项目官网

通过本指南，您已经掌握了：
- ✅ GitHub Pages 的基本概念和特性
- ✅ 三种不同的部署方法
- ✅ 自定义域名和高级配置
- ✅ 常见问题的解决方案
- ✅ 最佳实践和优化技巧

现在，开始部署您的第一个 GitHub Pages 网站吧！ 🚀

---

**💬 需要帮助？**
- [GitHub Community](https://github.com/orgs/community/discussions)
- [Stack Overflow - GitHub Pages 标签](https://stackoverflow.com/questions/tagged/github-pages)

**📝 文档更新时间：** 2024 年 1 月

---

祝您的网站成功上线！如有问题，欢迎参考官方文档或社区资源。
