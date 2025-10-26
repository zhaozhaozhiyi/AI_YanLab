@echo off
chcp 65001 >nul
:: 逆龄小颜 - Windows双击启动脚本
:: 双击此文件即可启动前后台系统

cd /d "%~dp0"

cls
echo.
echo ╔════════════════════════════════════════════════╗
echo ║                                                ║
echo ║            🌟 逆龄小颜 Demo 🌟              ║
echo ║                                                ║
echo ║          您的专属AI颜值顾问平台原型            ║
echo ║                                                ║
echo ╚════════════════════════════════════════════════╝
echo.

:: 检查端口
echo 🔍 检查3000端口...
netstat -ano | findstr ":3000.*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  端口3000已被占用，正在释放...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000.*LISTENING"') do (
        taskkill /F /PID %%a >nul 2>&1
    )
    timeout /t 1 /nobreak >nul
    echo ✓ 端口已释放
)

echo.
echo 🚀 正在启动服务器...
echo.

:: 启动服务器
start /B npx --yes serve -l 3000 >nul 2>&1

:: 等待服务器启动
timeout /t 3 /nobreak >nul

:: 检查服务器是否启动
netstat -ano | findstr ":3000.*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo ═════════════════════════════════════════════
    echo   ✓ 服务器启动成功！
    echo ═════════════════════════════════════════════
    echo.
    echo   📱 前台系统：
    echo      http://localhost:3000/web/
    echo.
    echo   💼 后台系统：
    echo      http://localhost:3000/admin/login.html
    echo.
    echo ═════════════════════════════════════════════
    echo.
    
    :: 打开浏览器
    echo 🌐 正在打开浏览器...
    timeout /t 1 /nobreak >nul
    
    :: 打开前台
    start "" "http://localhost:3000/web/"
    timeout /t 1 /nobreak >nul
    
    :: 打开后台
    start "" "http://localhost:3000/admin/login.html"
    
    echo.
    echo ✓ 浏览器已打开
    echo.
    echo 💡 提示：
    echo    • 服务器正在后台运行
    echo    • 关闭此窗口不会停止服务器
    echo    • 要停止服务器，请关闭所有 node.exe 进程
    echo.
    echo 🎉 启动完成！祝您使用愉快！
    echo.
    
) else (
    echo ❌ 服务器启动失败！
    echo.
    echo 💡 请尝试以下解决方案：
    echo    1. 确保已安装 Node.js
    echo    2. 打开 CMD 运行: npm start
    echo    3. 或使用 Python: python -m http.server 3000
    echo.
)

:: 保持窗口打开
pause


