/**
 * 通用工具函数库
 */
const Utils = {
  
  /**
   * 格式化日期
   * @param {string|Date} date - 日期
   * @param {string} format - 格式（default: 'YYYY-MM-DD HH:mm:ss'）
   * @returns {string} 格式化后的日期字符串
   */
  formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    const second = String(d.getSeconds()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hour)
      .replace('mm', minute)
      .replace('ss', second);
  },
  
  /**
   * 获取相对时间（如：刚刚、5分钟前）
   */
  getRelativeTime(date) {
    const now = Date.now();
    const diff = now - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return this.formatDate(date, 'YYYY-MM-DD');
  },
  
  /**
   * 防抖函数
   */
  debounce(func, wait = 300) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
  
  /**
   * 节流函数
   */
  throttle(func, wait = 300) {
    let previous = 0;
    return function (...args) {
      const now = Date.now();
      if (now - previous > wait) {
        func.apply(this, args);
        previous = now;
      }
    };
  },
  
  /**
   * 生成唯一ID
   */
  generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  },
  
  /**
   * 模拟异步请求
   * @param {any} data - 返回的数据
   * @param {number} delay - 延迟时间（毫秒）
   */
  mockRequest(data, delay = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          message: 'success',
          data: data,
        });
      }, delay);
    });
  },
  
  /**
   * 显示Toast提示
   */
  showToast(message, type = 'info', duration = 2000) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = `fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300`;
    
    // 根据类型设置样式
    const styles = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-blue-500 text-white',
    };
    toast.className += ' ' + (styles[type] || styles.info);
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 自动消失
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  
  /**
   * 显示确认对话框
   */
  showConfirm(message, onConfirm, onCancel) {
    if (confirm(message)) {
      onConfirm && onConfirm();
    } else {
      onCancel && onCancel();
    }
  },
  
  /**
   * 格式化数字（添加千分位）
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  
  /**
   * 手机号脱敏
   */
  maskPhone(phone) {
    if (!phone || phone.length < 11) return phone;
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  },
  
  /**
   * 复制到剪贴板
   */
  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('复制成功', 'success');
      });
    } else {
      // 兼容方案
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast('复制成功', 'success');
    }
  },
  
  /**
   * 图片文件转base64
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
  
  /**
   * 下载JSON数据
   */
  downloadJSON(data, filename = 'data.json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },
};

