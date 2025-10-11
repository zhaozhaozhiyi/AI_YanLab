/**
 * localStorage 封装工具
 * 统一数据存储管理
 */
const Storage = {
  prefix: 'aibeauty_',
  
  /**
   * 存储数据
   * @param {string} key - 键名
   * @param {any} value - 值（会自动JSON序列化）
   */
  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },
  
  /**
   * 获取数据
   * @param {string} key - 键名
   * @returns {any} 解析后的数据，失败返回null
   */
  get(key) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },
  
  /**
   * 删除数据
   * @param {string} key - 键名
   */
  remove(key) {
    localStorage.removeItem(this.prefix + key);
  },
  
  /**
   * 清空所有数据
   */
  clear() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  },
  
  /**
   * 获取所有键名
   * @returns {string[]} 所有键名数组
   */
  keys() {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.replace(this.prefix, ''));
  }
};

