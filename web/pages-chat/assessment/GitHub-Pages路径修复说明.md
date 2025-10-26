# GitHub Pages 路径修复说明

## 问题描述

在 GitHub Pages 环境中点击"开始拍照"按钮时，出现错误：
```
Uncaught TypeError: Storage.get is not a function
```

## 根本原因

GitHub Pages 部署的项目 URL 结构为：`https://username.github.io/repository-name/`

使用绝对路径（如 `/shared/storage.js`）会导致浏览器尝试从 `https://username.github.io/shared/storage.js` 加载，而实际文件位于 `https://username.github.io/repository-name/shared/storage.js`。

## 解决方案

### 1. 使用相对路径加载共享脚本

将绝对路径改为相对路径：

```html
<!-- 修改前 -->
<script src="/shared/storage.js"></script>
<script src="/shared/utils.js"></script>
<script src="/shared/router.js"></script>

<!-- 修改后 -->
<script src="../../../shared/storage.js"></script>
<script src="../../../shared/utils.js"></script>
<script src="../../../shared/router.js"></script>
```

### 2. 添加内联 PathHelper

在 `<head>` 中添加 PathHelper，用于动态处理路径：

```html
<script>
  // 内联路径配置 - 支持本地和 GitHub Pages 环境
  window.PathHelper = {
    getBasePath() {
      const hostname = window.location.hostname;
      const pathname = window.location.pathname;
      if (hostname.includes('github.io')) {
        const pathParts = pathname.split('/').filter(p => p);
        if (pathParts.length > 0 && pathParts[0] !== 'web' && pathParts[0] !== 'admin') {
          return '/' + pathParts[0];
        }
      }
      if (hostname.includes('gitee.io')) {
        const pathParts = pathname.split('/').filter(p => p);
        if (pathParts.length > 0 && pathParts[0] !== 'web' && pathParts[0] !== 'admin') {
          return '/' + pathParts[0];
        }
      }
      return '';
    },
    getPath(path) {
      if (!path) return '';
      if (!path.startsWith('/')) path = '/' + path;
      let currentPath = window.location.pathname;
      const basePath = this.getBasePath();
      if (basePath && currentPath.startsWith(basePath)) {
        currentPath = currentPath.substring(basePath.length);
      }
      const currentParts = currentPath.split('/').filter(p => p);
      const currentDirs = currentParts.slice(0, -1);
      const currentDepth = currentDirs.length;
      const targetPath = path.substring(1);
      let relativePath = currentDepth === 0 ? './' : '../'.repeat(currentDepth);
      return relativePath + targetPath;
    }
  };
  
  // 立即设置 base.css 路径（避免页面闪烁）
  document.write('<link rel="stylesheet" href="' + PathHelper.getPath('/web/assets/css/base.css') + '">');
</script>
```

### 3. 添加调试信息

在关键函数中添加调试检查：

```javascript
function startCamera() {
  // 调试：检查 Storage 是否加载
  if (typeof Storage === 'undefined') {
    console.error('❌ Storage 未加载！检查 storage.js 路径:', '../../../shared/storage.js');
    alert('页面资源加载失败，请刷新页面重试');
    return;
  }
  
  console.log('✅ Storage 已加载，开始检查登录状态...');
  const currentUser = Storage.get('currentUser');
  // ...
}
```

## 测试方法

### 本地测试

1. 启动本地服务器：
   ```bash
   npm start
   # 或者
   ./启动.command
   ```

2. 访问测试页面：
   ```
   http://localhost:3000/web/pages/assessment/test-script-load.html
   ```

3. 检查所有状态是否显示 ✅

### GitHub Pages 测试

1. 推送代码到 GitHub

2. 启用 GitHub Pages（设置 -> Pages -> Source: main branch）

3. 访问你的 GitHub Pages URL：
   ```
   https://your-username.github.io/your-repo-name/web/pages/assessment/guide.html
   ```

4. 打开浏览器控制台，查看调试信息：
   ```
   📄 拍照引导页已加载
   🔍 检查依赖加载状态:
     - Storage: ✅
     - Router: ✅
     - PathHelper: ✅
   ```

5. 点击"开始拍照"按钮，应该能正常弹出登录提示

## 已修改文件

- ✅ `web/pages/assessment/guide.html` - 主要修复
- ✅ `web/pages/assessment/test-script-load.html` - 新增测试页面

## 需要应用相同修复的其他页面

如果其他页面也使用绝对路径加载共享脚本，建议应用相同的修复：

1. `web/pages/assessment/index.html`
2. `web/pages/assessment/camera.html`
3. `web/pages/assessment/report.html`
4. `web/pages/auth/login.html`
5. 其他使用 `/shared/*.js` 的页面

## 通用修复模板

对于位于 `web/pages/xxx/` 的页面：

```html
<!-- 1. 在 <head> 中添加 PathHelper -->
<script>
  window.PathHelper = { /* 复制上面的完整代码 */ };
  document.write('<link rel="stylesheet" href="' + PathHelper.getPath('/web/assets/css/base.css') + '">');
</script>

<!-- 2. 使用相对路径加载共享脚本 -->
<script src="../../../shared/storage.js"></script>
<script src="../../../shared/utils.js"></script>
<script src="../../../shared/router.js"></script>

<!-- 3. 添加加载检查 -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 检查依赖加载状态:');
    console.log('  - Storage:', typeof Storage !== 'undefined' ? '✅' : '❌');
    console.log('  - Router:', typeof Router !== 'undefined' ? '✅' : '❌');
    console.log('  - PathHelper:', typeof PathHelper !== 'undefined' ? '✅' : '❌');
  });
</script>
```

## 注意事项

1. **相对路径层级**：确保相对路径的 `../` 数量正确
   - `web/pages/assessment/xxx.html` → `../../../shared/`
   - `web/pages/auth/xxx.html` → `../../../shared/`
   - `web/index.html` → `../shared/`

2. **Router.navigate** 仍可使用绝对路径，因为 Router 内部会自动转换

3. **CSS 和图片路径** 也建议使用 PathHelper 处理

4. **确保加载顺序**：storage.js → utils.js → router.js

## 调试技巧

### 浏览器控制台命令

```javascript
// 检查脚本是否加载
console.log('Storage:', typeof Storage);
console.log('Router:', typeof Router);
console.log('PathHelper:', typeof PathHelper);

// 测试路径转换
PathHelper.getPath('/web/assets/css/base.css');

// 测试 Storage
Storage.set('test', {value: 123});
Storage.get('test');

// 查看环境信息
Router.getEnvironmentInfo();
```

### 常见问题排查

| 问题 | 可能原因 | 解决方法 |
|------|---------|---------|
| Storage is not defined | storage.js 未加载 | 检查相对路径是否正确 |
| 404 错误 | 路径不正确 | 使用浏览器开发者工具查看 Network 面板 |
| 页面无样式 | CSS 路径错误 | 检查 PathHelper 是否正确配置 |
| 点击按钮无反应 | JavaScript 错误 | 查看 Console 面板错误信息 |

## 参考资料

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [相对路径 vs 绝对路径](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)
- 项目文档：`docs/路径兼容性方案说明.md`

