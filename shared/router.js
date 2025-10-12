/**
 * 路由工具
 * 处理页面跳转和URL参数
 * 支持本地和 GitHub Pages 环境
 */
const Router = {
  
  /**
   * 检测部署环境并返回 base path
   * @returns {string} base path (例如: '/AI_YanLab' 或 '')
   */
  getBasePath() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // GitHub Pages 环境检测
    if (hostname.includes('github.io')) {
      const pathParts = pathname.split('/').filter(p => p);
      if (pathParts.length > 0 && pathParts[0] !== 'web' && pathParts[0] !== 'admin') {
        return '/' + pathParts[0]; // 例如: /AI_YanLab
      }
    }
    
    // Gitee Pages 环境检测
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
   * 获取资源的绝对路径（带 base path）
   * @param {string} path - 相对于项目根目录的路径（如 '/web/assets/css/base.css'）
   * @returns {string} 完整路径
   */
  getAbsolutePath(path) {
    if (!path) return '';
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    return this.getBasePath() + path;
  },
  
  /**
   * 将绝对路径转换为相对于当前页面的路径
   * @param {string} absolutePath - 绝对路径（如 '/web/index.html'）
   * @returns {string} 相对路径
   */
  toRelativePath(absolutePath) {
    // 如果已经是相对路径，直接返回
    if (!absolutePath.startsWith('/')) {
      return absolutePath;
    }
    
    // 获取当前页面的路径（去掉域名和参数）
    let currentPath = window.location.pathname;
    
    // 去掉 GitHub Pages 的 base path
    const basePath = this.getBasePath();
    if (basePath && currentPath.startsWith(basePath)) {
      currentPath = currentPath.substring(basePath.length);
    }
    
    // 计算当前页面的目录深度
    // 例如：/web/pages/auth/login.html -> ['web', 'pages', 'auth', 'login.html']
    const currentParts = currentPath.split('/').filter(p => p);
    
    // 去掉文件名，只保留目录部分
    // ['web', 'pages', 'auth', 'login.html'] -> ['web', 'pages', 'auth']
    const currentDirs = currentParts.slice(0, -1);
    const currentDepth = currentDirs.length;
    
    // 目标路径（去掉开头的 /）
    // '/web/index.html' -> 'web/index.html'
    const targetPath = absolutePath.substring(1);
    
    // 构建相对路径：根据深度添加 ../
    // 深度为 0（根目录）-> './'
    // 深度为 1 -> '../'
    // 深度为 2 -> '../../'
    // 深度为 3 -> '../../../'
    let relativePath = '';
    if (currentDepth === 0) {
      relativePath = './';
    } else {
      relativePath = '../'.repeat(currentDepth);
    }
    
    return relativePath + targetPath;
  },
  
  /**
   * 获取静态资源路径（用于 img、css、js 等）
   * @param {string} assetPath - 资源相对路径（如 'assets/images/logo.png'）
   * @param {string} module - 模块名（'web' 或 'admin'）
   * @returns {string} 转换后的资源路径
   */
  getAssetPath(assetPath, module = 'web') {
    // 构建绝对路径
    const absolutePath = `/${module}/${assetPath}`;
    // 转换为相对路径
    return this.toRelativePath(absolutePath);
  },
  
  /**
   * 获取URL参数
   * @param {string} name - 参数名
   * @returns {string|null} 参数值
   */
  getQuery(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  },
  
  /**
   * 获取所有URL参数
   * @returns {Object} 所有参数对象
   */
  getAllQuery() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },
  
  /**
   * 跳转页面（带参数）
   * @param {string} url - 目标URL（支持绝对路径和相对路径）
   * @param {Object} params - URL参数对象
   */
  navigate(url, params = {}) {
    // 自动转换绝对路径为相对路径
    const relativePath = this.toRelativePath(url);
    const query = new URLSearchParams(params).toString();
    let fullUrl = query ? `${relativePath}?${query}` : relativePath;
    
    // URL标准化：确保目录访问以斜杠结尾
    if (fullUrl === '/web' || fullUrl === '/web/index.html') {
      fullUrl = '/web/';
    }
    
    window.location.href = fullUrl;
  },
  
  /**
   * 替换当前页面（不产生历史记录）
   * @param {string} url - 目标URL（支持绝对路径和相对路径）
   * @param {Object} params - URL参数对象
   */
  replace(url, params = {}) {
    // 自动转换绝对路径为相对路径
    const relativePath = this.toRelativePath(url);
    const query = new URLSearchParams(params).toString();
    let fullUrl = query ? `${relativePath}?${query}` : relativePath;
    
    // URL标准化：确保目录访问以斜杠结尾
    if (fullUrl === '/web' || fullUrl === '/web/index.html') {
      fullUrl = '/web/';
    }
    
    window.location.replace(fullUrl);
  },
  
  /**
   * 返回上一页
   */
  back() {
    window.history.back();
  },
  
  /**
   * 刷新当前页面
   */
  reload() {
    window.location.reload();
  },
  
  /**
   * 检查是否登录（前台）
   */
  checkLogin() {
    const user = Storage.get('currentUser');
    if (!user) {
      this.navigate('/web/pages/auth/login.html');
      return false;
    }
    return true;
  },
  
  /**
   * 检查是否登录（后台）
   */
  checkAdminLogin() {
    const admin = Storage.get('currentAdmin');
    if (!admin) {
      this.navigate('/admin/login.html');
      return false;
    }
    return true;
  },
  
  /**
   * 退出登录（前台）
   */
  logout() {
    Storage.remove('currentUser');
    this.navigate('/web/index.html');
  },
  
  /**
   * 退出登录（后台）
   */
  adminLogout() {
    Storage.remove('currentAdmin');
    this.navigate('/admin/login.html');
  },
  
  /**
   * 获取环境信息（用于调试）
   */
  getEnvironmentInfo() {
    return {
      basePath: this.getBasePath(),
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      fullUrl: window.location.href,
      isGitHubPages: window.location.hostname.includes('github.io'),
      isGiteePages: window.location.hostname.includes('gitee.io'),
      isLocal: window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('192.168.') ||
               window.location.hostname.includes('10.')
    };
  }
};

// 在控制台输出环境信息（开发时使用）
if (typeof window !== 'undefined' && window.location) {
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    console.log('🚀 Router Environment:', Router.getEnvironmentInfo());
  }
}

