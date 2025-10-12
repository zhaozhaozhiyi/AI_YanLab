/**
 * 路径配置工具
 * 自动检测部署环境并配置正确的路径
 */

// 检测部署环境
function detectEnvironment() {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  
  // GitHub Pages 环境检测
  if (hostname.includes('github.io')) {
    // 从路径中提取仓库名
    const pathParts = pathname.split('/').filter(p => p);
    if (pathParts.length > 0) {
      return {
        type: 'github-pages',
        basePath: '/' + pathParts[0], // 例如: /AI_YanLab
        repository: pathParts[0]
      };
    }
  }
  
  // 本地开发环境
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('192.168.') || hostname.includes('10.')) {
    return {
      type: 'local',
      basePath: '',
      repository: null
    };
  }
  
  // 其他环境（如自定义域名）
  return {
    type: 'custom',
    basePath: '',
    repository: null
  };
}

// 获取当前环境配置
const ENV = detectEnvironment();

// 路径配置对象
const PathConfig = {
  // 获取基础路径
  getBasePath() {
    return ENV.basePath;
  },
  
  // 获取资源路径（用于脚本、样式等）
  getAssetPath(relativePath) {
    if (!relativePath) return '';
    
    // 确保路径以 / 开头
    if (!relativePath.startsWith('/')) {
      relativePath = '/' + relativePath;
    }
    
    return ENV.basePath + relativePath;
  },
  
  // 获取页面路径（用于导航）
  getPagePath(relativePath) {
    if (!relativePath) return '';
    
    // 如果已经是绝对路径，直接返回
    if (relativePath.startsWith('/')) {
      return ENV.basePath + relativePath;
    }
    
    // 相对路径，需要根据当前页面位置计算
    const currentPath = window.location.pathname;
    const currentParts = currentPath.split('/').filter(p => p);
    
    // 去掉文件名，只保留目录部分
    const currentDirs = currentParts.slice(0, -1);
    const currentDepth = currentDirs.length;
    
    // 构建相对路径：根据深度添加 ../
    let relativePathWithDepth = '';
    if (currentDepth === 0) {
      relativePathWithDepth = './';
    } else {
      relativePathWithDepth = '../'.repeat(currentDepth);
    }
    
    return relativePathWithDepth + relativePath;
  },
  
  // 动态加载脚本
  loadScript(src, callback) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = this.getAssetPath(src);
      script.onload = () => {
        if (callback) callback();
        resolve();
      };
      script.onerror = (error) => {
        console.error(`Failed to load script: ${script.src}`, error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  },
  
  // 动态加载样式
  loadStyle(href, callback) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = this.getAssetPath(href);
      link.onload = () => {
        if (callback) callback();
        resolve();
      };
      link.onerror = (error) => {
        console.error(`Failed to load stylesheet: ${link.href}`, error);
        reject(error);
      };
      document.head.appendChild(link);
    });
  },
  
  // 批量加载共享脚本
  loadSharedScripts() {
    const scripts = [
      '/shared/storage.js',
      '/shared/utils.js',
      '/shared/constants.js',
      '/shared/router.js'
    ];
    
    return Promise.all(
      scripts.map(script => this.loadScript(script))
    );
  },
  
  // 获取环境信息（用于调试）
  getEnvironmentInfo() {
    return {
      ...ENV,
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      fullUrl: window.location.href
    };
  }
};

// 在控制台输出环境信息（开发时使用）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('🔧 Path Config Environment:', PathConfig.getEnvironmentInfo());
}

// 全局暴露
window.PathConfig = PathConfig;
