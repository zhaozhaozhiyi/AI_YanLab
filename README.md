# AI颜值管家 - 页面原型Demo项目

> 基于AI技术的面部抗衰评估和咨询平台 - 纯前端静态原型

---

## 📖 项目说明

本项目是 **AI颜值管家** 的页面原型Demo，采用纯前端静态技术实现，用于验证产品核心功能和用户体验。

### 特点
- ✅ **纯前端静态** - 无需后端服务器
- ✅ **完整功能** - 前台（web/）+ 后台（admin/）+ 大屏（store/）
- ✅ **可交互** - 使用Mock数据模拟真实交互
- ✅ **响应式** - 适配移动端和桌面端
- ✅ **快速部署** - 任意静态服务器即可运行

---

## 🏗️ 项目结构

```
AI颜值管家/
├── web/                    # 前台原型（小程序/H5模拟）
│   ├── index.html         # 首页
│   ├── pages/             # 页面目录（40-50页）
│   ├── assets/            # 静态资源
│   └── components/        # 可复用组件
│
├── admin/                  # 后台管理系统
│   ├── login.html         # 登录页
│   ├── index.html         # 数据看板
│   ├── pages/             # 页面目录（60-80页）
│   ├── assets/            # 静态资源
│   └── components/        # 可复用组件
│
├── store/                  # 到店大屏端
│   ├── index.html         # 欢迎页
│   └── pages/             # 页面目录（8-10页）
│
├── shared/                 # 共享资源
│   ├── utils.js           # 工具函数
│   ├── storage.js         # 存储封装
│   ├── mock.js            # Mock数据
│   └── constants.js       # 常量定义
│
├── docs/                   # 文档目录
│   ├── PRD-AI颜值管家产品需求文档.md  ⭐ 主文档
│   └── README.md          # 文档说明
│
└── README.md               # 本文档
```

---

## 🚀 快速开始

### 1. 查看文档
```bash
cd docs
open PRD-AI颜值管家产品需求文档.md
```

**重点阅读**：
- 第2-3章：了解前后台功能设计
- 第5章：查看完整页面清单
- **第6章：前端技术方案**（开发必读）

### 2. 运行项目

✅ **项目基础结构已搭建完成！**

```bash
# 方式1：使用npx serve（推荐）
npx serve

# 方式2：使用Python
python -m http.server 8000

# 方式3：使用http-server
npx http-server
```

### 3. 访问页面

**前台（C端）**：
- 首页：http://localhost:3000/web/ ✅ 已完成
- 评估模块（5页）：✅ 已完成
  - 拍照引导：http://localhost:3000/web/pages/assessment/guide.html
  - 拍照页：http://localhost:3000/web/pages/assessment/camera.html
  - 照片确认：http://localhost:3000/web/pages/assessment/confirm.html
  - 评估等待：http://localhost:3000/web/pages/assessment/waiting.html
  - 评估报告：http://localhost:3000/web/pages/assessment/report.html
- 登录页：http://localhost:3000/web/pages/auth/login.html ✅ 已完成

**后台（B端）**：
- 登录页：http://localhost:3000/admin/login.html ✅ 已完成
- 数据看板：http://localhost:3000/admin/index.html ✅ 已完成

**大屏端**：
- 待开发...

### 4. 测试账号

**后台管理系统测试账号**：
- 管理员：`admin` / `admin123`
- 运营人员：`operator` / `op123`
- 知识管理员：`knowledge` / `km123`

---

## 💻 技术栈

### 核心技术
- **HTML5/CSS3/JavaScript(ES6+)** - 标准Web技术
- **Tailwind CSS**（CDN）- 响应式UI框架
- **Font Awesome**（CDN）- 图标库
- **Chart.js**（CDN）- 数据可视化
- **Marked.js**（CDN）- Markdown渲染

### 数据存储
- **localStorage** - 浏览器本地存储
- 键名前缀：`aibeauty_`
- 无网络依赖，纯本地运行

---

## 📋 开发计划

### 第一阶段（2周）- 核心功能
- [x] 搭建项目结构 ✅
- [x] 前台核心页面（7页已完成）
  - [x] 首页 ✅
  - [x] 登录页 ✅
  - [x] 拍照评估流程（5页）✅
    - [x] 拍照引导页
    - [x] 拍照页
    - [x] 照片确认页
    - [x] 评估等待页
    - [x] 评估报告页
  - [ ] AI问答核心
- [x] 后台核心页面（2页已完成）
  - [x] 登录页 ✅
  - [x] 数据看板 ✅
  - [ ] 用户管理核心
  - [ ] 知识库管理核心

**已交付**：9页可演示原型（首页 + 评估模块5页 + 后台2页 + 登录页）

### 第二阶段（2周）- 功能完善
- [ ] 前台完整功能（+20页）
  - [ ] 完整预约流程
  - [ ] 个人中心
  - [ ] 社区功能
- [ ] 后台完整功能（+30页）
  - [ ] 内容管理完整
  - [ ] 数据分析完整
  - [ ] 知识库完整

**交付物**：85页完整原型

### 第三阶段（1周）- 优化补充
- [ ] 到店大屏端（8-10页）
- [ ] 营销活动页面
- [ ] 辅助页面
- [ ] 交互细节优化

**交付物**：115-135页全部原型

---

## 📌 重点功能

### 前台核心
1. 面部拍照评估流程
2. AI评估报告展示（3D可视化）
3. AI专家在线问答
4. 在线预约服务
5. 个人中心

### 后台核心
1. 数据运营分析看板
2. 用户管理与CRM
3. 内容管理系统(CMS)
4. ⭐ **知识库维护系统**（AI核心）
5. 权限管理与系统配置

---

## 🎯 设计目标

- **前台**：简洁美观、易用、转化率高
- **后台**：功能丰富、数据清晰、运营高效
- **大屏**：视觉震撼、科技感强、体验出色

---

## 📞 联系方式

如有项目相关问题，请查看 `docs/PRD-AI颜值管家产品需求文档.md` 主文档。

---

**当前状态**：📝 需求设计完成，待开始前端开发  
**最后更新**：2024年12月  
**项目类型**：纯前端静态原型Demo

