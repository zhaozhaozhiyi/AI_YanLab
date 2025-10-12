/**
 * 路由工具
 * 处理页面跳转和URL参数
 */
const Router = {
  
  /**
   * 将绝对路径转换为相对路径
   * @param {string} absolutePath - 绝对路径（如 '/web/index.html'）
   * @returns {string} 相对路径
   */
  toRelativePath(absolutePath) {
    // 如果已经是相对路径，直接返回
    if (!absolutePath.startsWith('/')) {
      return absolutePath;
    }
    
    // 获取当前页面的路径（去掉域名和参数）
    const currentPath = window.location.pathname;
    
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
    const fullUrl = query ? `${relativePath}?${query}` : relativePath;
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
    const fullUrl = query ? `${relativePath}?${query}` : relativePath;
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
};

