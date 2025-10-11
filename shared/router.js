/**
 * 路由工具
 * 处理页面跳转和URL参数
 */
const Router = {
  
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
   * @param {string} url - 目标URL
   * @param {Object} params - URL参数对象
   */
  navigate(url, params = {}) {
    const query = new URLSearchParams(params).toString();
    const fullUrl = query ? `${url}?${query}` : url;
    window.location.href = fullUrl;
  },
  
  /**
   * 替换当前页面（不产生历史记录）
   */
  replace(url, params = {}) {
    const query = new URLSearchParams(params).toString();
    const fullUrl = query ? `${url}?${query}` : url;
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

