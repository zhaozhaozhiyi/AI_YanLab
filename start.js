#!/usr/bin/env node

/**
 * 逆龄小颜 - 一键启动脚本
 * 自动启动开发服务器并打开浏览器
 */

const { spawn, exec } = require('child_process');
const os = require('os');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// 打印带颜色的消息
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 打印标题
function printBanner() {
  console.log('');
  log('╔════════════════════════════════════════════════╗', 'cyan');
  log('║                                                ║', 'cyan');
  log('║            🌟 逆龄小颜 Demo 🌟              ║', 'cyan');
  log('║                                                ║', 'cyan');
  log('║          您的专属AI颜值顾问平台原型            ║', 'cyan');
  log('║                                                ║', 'cyan');
  log('╚════════════════════════════════════════════════╝', 'cyan');
  console.log('');
}

// 检查端口是否被占用
function checkPort(port) {
  return new Promise((resolve) => {
    const cmd = os.platform() === 'win32' 
      ? `netstat -ano | findstr :${port}`
      : `lsof -ti:${port}`;
    
    exec(cmd, (error, stdout) => {
      resolve(stdout ? false : true); // 有输出表示端口被占用
    });
  });
}

// 杀死占用端口的进程
function killPort(port) {
  return new Promise((resolve) => {
    const cmd = os.platform() === 'win32'
      ? `for /f "tokens=5" %a in ('netstat -ano ^| findstr :${port}') do taskkill /F /PID %a`
      : `lsof -ti:${port} | xargs kill -9 2>/dev/null || true`;
    
    exec(cmd, () => {
      setTimeout(() => resolve(), 1000);
    });
  });
}

// 打开浏览器
function openBrowser(url) {
  const cmd = os.platform() === 'darwin' 
    ? 'open' 
    : os.platform() === 'win32' 
    ? 'start' 
    : 'xdg-open';
  
  setTimeout(() => {
    exec(`${cmd} ${url}`, (error) => {
      if (error) {
        log(`⚠️  无法自动打开浏览器，请手动访问: ${url}`, 'yellow');
      }
    });
  }, 2000);
}

// 启动服务器
async function startServer() {
  printBanner();
  
  const port = 3000;
  const url = `http://localhost:${port}/web/`;
  
  // 检查端口
  log('🔍 检查端口状态...', 'blue');
  const isPortFree = await checkPort(port);
  
  if (!isPortFree) {
    log(`⚠️  端口 ${port} 已被占用`, 'yellow');
    log('正在尝试释放端口...', 'yellow');
    await killPort(port);
    log('✓ 端口已释放', 'green');
  }
  
  console.log('');
  log('🚀 启动开发服务器...', 'blue');
  console.log('');
  
  // 启动 npx serve
  const server = spawn('npx', ['--yes', 'serve', '-l', port.toString()], {
    stdio: 'inherit',
    shell: true
  });
  
  // 打印访问信息
  setTimeout(() => {
    console.log('');
    log('═════════════════════════════════════════════', 'green');
    log('  ✓ 服务器启动成功！', 'green');
    log('═════════════════════════════════════════════', 'green');
    console.log('');
    log(`  🌐 本地访问：${url}`, 'cyan');
    console.log('');
    log('  📚 快速导航：', 'yellow');
    log(`     • 前台首页: ${url}`, 'reset');
    log(`     • 评估模块: ${url}pages/assessment/guide.html`, 'reset');
    log(`     • 评估报告: ${url}pages/assessment/report.html`, 'reset');
    log(`     • 测试页面: ${url}pages/assessment/test.html`, 'reset');
    log(`     • 后台登录: http://localhost:${port}/admin/login.html`, 'reset');
    console.log('');
    log('  ⌨️  快捷键：', 'yellow');
    log('     • Ctrl + C  停止服务器', 'reset');
    console.log('');
    log('═════════════════════════════════════════════', 'green');
    console.log('');
    
    // 自动打开浏览器
    openBrowser(url);
  }, 1500);
  
  // 处理退出
  process.on('SIGINT', () => {
    console.log('');
    log('👋 正在停止服务器...', 'yellow');
    server.kill();
    setTimeout(() => {
      log('✓ 服务器已停止', 'green');
      process.exit(0);
    }, 500);
  });
  
  server.on('error', (error) => {
    console.log('');
    log('❌ 启动失败！', 'red');
    console.error(error);
    console.log('');
    log('💡 尝试以下解决方案：', 'yellow');
    log('   1. 运行: npm install -g serve', 'reset');
    log('   2. 或直接运行: npx serve -l 3000', 'reset');
    log('   3. 或使用Python: python3 -m http.server 3000', 'reset');
    process.exit(1);
  });
}

// 主函数
async function main() {
  try {
    await startServer();
  } catch (error) {
    log('❌ 发生错误:', 'red');
    console.error(error);
    process.exit(1);
  }
}

// 运行
main();


