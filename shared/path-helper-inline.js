/**
 * 内联路径配置工具
 * 可以直接复制到 HTML 页面的 <script> 标签中使用
 * 支持本地和 GitHub Pages 环境
 */

// 全局路径配置对象
window.PathHelper = {
  /**
   * 检测部署环境并返回 base path
   */
  getBasePath() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // GitHub Pages 环境
    if (hostname.includes('github.io')) {
      const pathParts = pathname.split('/').filter(p => p);
      if (pathParts.length > 0 && pathParts[0] !== 'web' && pathParts[0] !== 'admin') {
        return '/' + pathParts[0];
      }
    }
    
    // Gitee Pages 环境
    if (hostname.includes('gitee.io')) {
      const pathParts = pathname.split('/').filter(p => p);
      if (pathParts.length > 0 && pathParts[0] !== 'web' && pathParts[0] !== 'admin') {
        return '/' + pathParts[0];
      }
    }
    
    // 本地环境
    return '';
  },
  
  /**
   * 获取资源的相对路径（用于 href、src 等）
   * @param {string} path - 相对于项目根目录的路径
   * @returns {string} 相对于当前页面的路径
   */
  getPath(path) {
    if (!path) return '';
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    // 获取当前页面路径
    let currentPath = window.location.pathname;
    
    // 去掉 base path
    const basePath = this.getBasePath();
    if (basePath && currentPath.startsWith(basePath)) {
      currentPath = currentPath.substring(basePath.length);
    }
    
    // 计算当前页面的目录深度
    const currentParts = currentPath.split('/').filter(p => p);
    const currentDirs = currentParts.slice(0, -1);
    const currentDepth = currentDirs.length;
    
    // 目标路径
    const targetPath = path.substring(1);
    
    // 构建相对路径
    let relativePath = '';
    if (currentDepth === 0) {
      relativePath = './';
    } else {
      relativePath = '../'.repeat(currentDepth);
    }
    
    return relativePath + targetPath;
  },
  
  /**
   * 页面跳转（自动处理路径）
   * @param {string} path - 相对于项目根目录的路径
   * @param {Object} params - URL 参数
   */
  navigate(path, params = {}) {
    const relativePath = this.getPath(path);
    const query = new URLSearchParams(params).toString();
    window.location.href = query ? `${relativePath}?${query}` : relativePath;
  },
  
  /**
   * 获取环境信息
   */
  getInfo() {
    return {
      basePath: this.getBasePath(),
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      isGitHubPages: window.location.hostname.includes('github.io'),
      isGiteePages: window.location.hostname.includes('gitee.io'),
      isLocal: ['localhost', '127.0.0.1'].includes(window.location.hostname) ||
               window.location.hostname.includes('192.168.') ||
               window.location.hostname.includes('10.')
    };
  }
};

// 在本地环境输出调试信息
if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
  console.log('🔧 PathHelper:', window.PathHelper.getInfo());
}

