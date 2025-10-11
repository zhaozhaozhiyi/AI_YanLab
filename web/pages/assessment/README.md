# AI评估模块

## 📋 模块概述

AI评估模块是AI颜值管家的核心功能之一，提供完整的面部评估流程，从拍照引导到生成专业评估报告。

## 🎯 功能特点

- **智能拍照引导**: 提供详细的拍照说明和角度示意
- **实时相机预览**: 支持前后摄像头切换，实时预览拍摄效果
- **多角度拍摄**: 正面、左侧45°、右侧45°三个角度全方位分析
- **照片质量检查**: 确认照片清晰度和完整性
- **AI智能分析**: 模拟真实的AI分析过程，提供进度反馈
- **专业评估报告**: 多维度评分、问题分析、改善建议

## 📁 文件结构

```
/web/pages/assessment/
├── guide.html      # 拍照引导页 - 评估流程入口
├── camera.html     # 拍照页 - 调用摄像头拍摄
├── confirm.html    # 照片确认页 - 预览和确认照片
├── waiting.html    # 评估等待页 - AI分析进度展示
├── report.html     # 评估报告页 - 完整评估结果
└── README.md       # 本文档
```

## 🔄 流程说明

### 1. 拍照引导页 (guide.html)

**功能**:
- 展示拍照角度说明（正面、左侧45°、右侧45°）
- 提供拍照小贴士（光线、表情、遮挡等）
- 说明评估优势（AI分析、专家报告、隐私保护）
- 检查用户登录状态

**跳转**:
- 点击"开始拍照" → 跳转到 `camera.html`
- 未登录用户 → 引导到登录页

### 2. 拍照页 (camera.html)

**功能**:
- 调用设备摄像头（前置/后置可切换）
- 显示面部引导框（椭圆形）
- 显示当前拍摄角度和进度
- 拍摄三个角度的照片
- 提供实时提示信息

**数据存储**:
- 拍摄的照片保存到 `localStorage` 的 `capturedPhotos` 键
- 每张照片包含：角度标识、图片数据、时间戳

**跳转**:
- 完成三张拍摄 → 自动跳转到 `confirm.html`
- 点击返回 → 返回到 `guide.html`

### 3. 照片确认页 (confirm.html)

**功能**:
- 展示已拍摄的三张照片
- 支持点击放大查看
- 可以重拍单张或全部照片
- 照片质量检查提示
- 提交评估请求

**数据处理**:
- 读取 `capturedPhotos` 数据
- 生成评估ID
- 保存评估数据到 `currentAssessment`

**跳转**:
- 点击"提交评估" → 跳转到 `waiting.html`
- 点击"重拍单张" → 返回到 `camera.html`（保留其他照片）
- 点击"重新拍摄" → 返回到 `guide.html`（清除所有照片）

### 4. 评估等待页 (waiting.html)

**功能**:
- 展示AI分析动画效果
- 显示分析进度（0-100%）
- 展示分析步骤：
  1. 上传照片（25%）
  2. 特征识别（50%）
  3. 智能分析（75%）
  4. 生成报告（100%）
- 模拟真实的评估时间（约45秒）

**数据生成**:
- 生成模拟评估报告数据
- 包含：总体评分、各维度评分、问题分析、改善建议
- 保存报告到 `currentReport` 和 `report_[reportId]`
- 添加到评估历史 `assessmentHistory`

**跳转**:
- 评估完成 → 自动跳转到 `report.html`
- 防止用户中途返回

### 5. 评估报告页 (report.html)

**功能**:
- 展示综合评分（0-100分）
- AI预测年龄 vs 实际年龄对比
- 各维度评分（皮肤状态、面部轮廓、年龄状态）
- 面部问题详细分析
- 优势特征展示
- 个性化改善建议
- 操作按钮：咨询专家、预约治疗、分享报告

**数据展示**:
- 读取 `currentReport` 数据
- 如果没有数据，自动生成演示数据
- 使用 Chart.js 绘制评分圆环图
- 动态渲染各个模块内容

**特殊功能**:
- ✨ **支持直接访问**：可以直接打开查看演示效果
- 🧪 **自动生成测试数据**：无需完成评估流程即可预览
- 💡 **演示数据标识**：顶部显示"演示数据"标识
- 📢 **引导提示**：底部提供"开始真实评估"按钮

**跳转**:
- 咨询专家 → `/web/pages/chat/detail.html`
- 预约治疗 → `/web/pages/booking/experts.html`
- 返回首页 → `/web/index.html`
- 开始真实评估 → `./guide.html`

## 💾 数据结构

### capturedPhotos (拍摄照片)

```javascript
[
  {
    angle: 'front',        // 角度: front/left/right
    data: 'data:image/...',  // Base64图片数据
    timestamp: 1234567890    // 时间戳
  },
  // ... 其他照片
]
```

### currentAssessment (当前评估)

```javascript
{
  id: 'ASSESS_1234567890',
  photos: [...],              // 照片数组
  status: 'processing',       // 状态: processing/completed
  startTime: 1234567890,      // 开始时间
  completedTime: 1234567890,  // 完成时间
  userId: 'USER_123',         // 用户ID
  reportId: 'REPORT_123'      // 报告ID
}
```

### currentReport (评估报告)

```javascript
{
  id: 'REPORT_1234567890',
  assessmentId: 'ASSESS_123',
  userId: 'USER_123',
  createdAt: 1234567890,
  
  // 评分数据
  overallScore: 82,           // 综合评分
  ageScore: 75,               // 年龄评分
  skinScore: 80,              // 皮肤评分
  faceScore: 85,              // 面部评分
  
  // 年龄数据
  estimatedAge: 28,           // AI预测年龄
  actualAge: 32,              // 实际年龄
  
  // 问题分析
  issues: [
    {
      id: 1,
      name: '细纹与皱纹',
      severity: 'medium',     // 严重程度: high/medium/low
      score: 72,
      areas: ['眼周', '额头'],
      description: '...',
      suggestions: ['...']
    }
  ],
  
  // 改善建议
  recommendations: [
    {
      priority: 'high',       // 优先级: high/medium
      title: '抗衰老护理',
      treatments: ['肉毒素', '玻尿酸'],
      estimatedCost: '8000-15000元',
      duration: '3-6个月'
    }
  ],
  
  // 优势特征
  strengths: [
    '面部轮廓清晰',
    '皮肤底子较好',
    // ...
  ]
}
```

## 🎨 设计特点

### 视觉设计
- 渐变色主题：粉色(#ec4899) → 紫色(#8b5cf6) → 蓝色(#6366f1)
- 圆润的卡片设计（border-radius: 16-24px）
- 柔和的阴影效果
- 平滑的过渡动画

### 交互设计
- 清晰的步骤指引
- 实时反馈和提示
- 防误操作确认
- 流畅的页面跳转

### 响应式设计
- 支持移动端和桌面端
- 自适应布局
- 触摸友好的按钮尺寸

## 🔧 技术实现

### 依赖项
- **Tailwind CSS**: 样式框架
- **Font Awesome**: 图标库
- **Chart.js**: 图表绘制（仅report.html）
- **共享模块**:
  - `/shared/router.js` - 路由管理
  - `/shared/utils.js` - 工具函数
  - `/shared/storage.js` - 数据存储

### 核心功能
- **相机调用**: `navigator.mediaDevices.getUserMedia()`
- **照片拍摄**: Canvas API
- **数据存储**: localStorage
- **动画效果**: CSS3动画 + JavaScript

## 📱 使用方法

### 从首页进入
```javascript
// 首页点击"立即免费评估"按钮
<button onclick="goToAssessment()">立即免费评估</button>

// JavaScript函数
function goToAssessment() {
  Router.navigate('./pages/assessment/guide.html');
}
```

### 直接访问
浏览器打开: `/web/pages/assessment/guide.html`

## 🔐 权限要求

- **相机权限**: camera.html需要访问设备摄像头
- **存储权限**: 使用localStorage存储数据

## ⚠️ 注意事项

1. **HTTPS要求**: 相机功能需要在HTTPS环境下使用（或localhost）
2. **浏览器兼容**: 建议使用现代浏览器（Chrome、Safari、Edge等）
3. **数据清理**: 评估完成后会自动清理临时数据
4. **隐私保护**: 照片数据仅存储在本地，不会上传服务器

## 🚀 未来优化方向

- [ ] 添加真实的AI评估API对接
- [ ] 支持视频录制评估
- [ ] 添加历史报告对比功能
- [ ] 支持报告下载（PDF）
- [ ] 添加更多面部特征分析
- [ ] 优化移动端相机体验
- [ ] 添加照片美化功能
- [ ] 支持多语言

## 📞 相关链接

- [产品需求文档](../../../docs/PRD-AI颜值管家产品需求文档.md)
- [快速启动指南](../../../快速启动指南.md)
- [项目README](../../../README.md)

