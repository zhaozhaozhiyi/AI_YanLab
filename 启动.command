#!/bin/bash

# 逆龄小颜 - Mac双击启动脚本
# 双击此文件即可启动前后台系统

# 切换到脚本所在目录
cd "$(dirname "$0")"

# 清屏
clear

# 打印欢迎信息
echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║                                                ║"
echo "║            🌟 逆龄小颜 Demo 🌟              ║"
echo "║                                                ║"
echo "║          您的专属AI颜值顾问平台原型            ║"
echo "║                                                ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# 检查端口并启动服务器
echo "🔍 检查3000端口..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  端口3000已被占用，正在释放..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 1
    echo "✓ 端口已释放"
fi

echo ""
echo "🚀 正在启动服务器..."
echo ""

# 启动服务器（后台运行）
npx --yes serve -l 3000 > /dev/null 2>&1 &
SERVER_PID=$!

# 等待服务器启动
sleep 3

# 检查服务器是否启动成功
if ps -p $SERVER_PID > /dev/null 2>&1; then
    echo "═════════════════════════════════════════════"
    echo "  ✓ 服务器启动成功！"
    echo "═════════════════════════════════════════════"
    echo ""
    echo "  📱 前台系统："
    echo "     http://localhost:3000/web/"
    echo ""
    echo "  💼 后台系统："
    echo "     http://localhost:3000/admin/login.html"
    echo ""
    echo "═════════════════════════════════════════════"
    echo ""
    
    # 自动打开浏览器
    echo "🌐 正在打开浏览器..."
    sleep 1
    
    # 打开前台
    open "http://localhost:3000/web/"
    sleep 1
    
    # 打开后台
    open "http://localhost:3000/admin/login.html"
    
    echo ""
    echo "✓ 浏览器已打开"
    echo ""
    echo "💡 提示："
    echo "   • 服务器正在后台运行（PID: $SERVER_PID）"
    echo "   • 关闭此窗口不会停止服务器"
    echo "   • 要停止服务器，请运行: kill $SERVER_PID"
    echo ""
    echo "🎉 启动完成！祝您使用愉快！"
    echo ""
    
    # 保持终端打开
    echo "按任意键关闭此窗口..."
    read -n 1
    
else
    echo "❌ 服务器启动失败！"
    echo ""
    echo "💡 请尝试以下解决方案："
    echo "   1. 确保已安装 Node.js"
    echo "   2. 在终端运行: npm start"
    echo "   3. 或使用 Python: python3 -m http.server 3000"
    echo ""
    read -n 1
fi


