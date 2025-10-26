@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM 逆龄小颜 - Gitee Pages 快速部署脚本 (Windows版)
REM 使用方法: deploy.bat 或 deploy.bat "提交说明"

echo.
echo ╔════════════════════════════════════════════════╗
echo ║          🚀 Gitee Pages 快速部署 🚀           ║
echo ╚════════════════════════════════════════════════╝
echo.

REM 获取提交信息
set "COMMIT_MSG=%~1"
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=更新网站内容"

REM 1. 检查是否有修改
echo 📋 检查文件修改...
git status -s >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 当前目录不是Git仓库
    pause
    exit /b 1
)

for /f %%i in ('git status -s') do set HAS_CHANGES=1
if not defined HAS_CHANGES (
    echo ✓ 没有需要提交的更改
) else (
    echo 有以下文件被修改：
    git status -s
    echo.
)

REM 2. 添加所有修改
echo 📦 添加文件到暂存区...
git add .
if errorlevel 1 (
    echo ❌ 添加文件失败
    pause
    exit /b 1
)
echo ✓ 完成
echo.

REM 3. 提交
echo 💾 提交更改...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo ℹ️  没有新的更改需要提交
) else (
    echo ✓ 提交成功: %COMMIT_MSG%
)
echo.

REM 4. 推送到 Gitee
echo 🚀 推送到 Gitee...
git push gitee main
if errorlevel 1 (
    echo ❌ 推送失败！
    echo.
    echo 💡 可能的原因：
    echo    1. 未配置gitee远程仓库
    echo    2. 认证失败（需要输入用户名密码或配置SSH）
    echo    3. 分支名不是main（试试master）
    echo.
    echo 💡 解决方法：
    echo    • 查看远程仓库：git remote -v
    echo    • 添加远程仓库：git remote add gitee https://gitee.com/YOUR_USERNAME/YOUR_REPO.git
    echo    • 查看详细文档：docs\Gitee-Pages部署指南.md
    echo.
    pause
    exit /b 1
)

echo ✓ 推送成功！
echo.

echo ════════════════════════════════════════════
echo ✅ 代码已推送到 Gitee！
echo ════════════════════════════════════════════
echo.
echo ⚠️  重要提醒：
echo    Gitee Pages 不会自动更新！
echo.
echo 📝 接下来的操作：
echo    1. 访问 Gitee 仓库页面
echo    2. 点击 [服务] → [Gitee Pages]
echo    3. 点击 [更新] 按钮
echo    4. 等待部署完成（约1-2分钟）
echo.
echo 🌐 预计访问地址：
echo    https://YOUR_USERNAME.gitee.io/YOUR_REPO/
echo.

REM 提示是否打开Gitee仓库页面
set /p OPEN_BROWSER="是否打开Gitee仓库页面？(Y/N): "
if /i "%OPEN_BROWSER%"=="Y" (
    for /f "delims=" %%i in ('git remote get-url gitee 2^>nul') do set GITEE_URL=%%i
    if defined GITEE_URL (
        set GITEE_URL=!GITEE_URL:.git=!
        echo 🌐 正在打开浏览器...
        start !GITEE_URL!
    ) else (
        echo ⚠️  无法获取Gitee仓库地址
    )
)

echo.
echo 🎉 部署脚本执行完成！
echo.
pause

