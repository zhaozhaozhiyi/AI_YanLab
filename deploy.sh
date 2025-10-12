#!/bin/bash

# AI颜值管家 - Gitee Pages 快速部署脚本
# 使用方法: ./deploy.sh "提交说明"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          🚀 Gitee Pages 快速部署 🚀           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

# 获取提交信息
COMMIT_MSG="${1:-更新网站内容}"

# 1. 检查是否有修改
echo -e "${YELLOW}📋 检查文件修改...${NC}"
if [[ -z $(git status -s) ]]; then
    echo -e "${GREEN}✓ 没有需要提交的更改${NC}"
else
    echo -e "${BLUE}有以下文件被修改：${NC}"
    git status -s
    echo ""
fi

# 2. 添加所有修改
echo -e "${YELLOW}📦 添加文件到暂存区...${NC}"
git add .
echo -e "${GREEN}✓ 完成${NC}"
echo ""

# 3. 提交
echo -e "${YELLOW}💾 提交更改...${NC}"
if git commit -m "$COMMIT_MSG"; then
    echo -e "${GREEN}✓ 提交成功: $COMMIT_MSG${NC}"
else
    echo -e "${YELLOW}ℹ️  没有新的更改需要提交${NC}"
fi
echo ""

# 4. 推送到 Gitee
echo -e "${YELLOW}🚀 推送到 Gitee...${NC}"
if git push gitee main 2>&1; then
    echo -e "${GREEN}✓ 推送成功！${NC}"
else
    echo -e "${RED}❌ 推送失败！${NC}"
    echo ""
    echo -e "${YELLOW}💡 可能的原因：${NC}"
    echo "   1. 未配置gitee远程仓库"
    echo "   2. 认证失败（需要输入用户名密码或配置SSH）"
    echo "   3. 分支名不是main（试试master）"
    echo ""
    echo -e "${YELLOW}💡 解决方法：${NC}"
    echo "   • 查看远程仓库：git remote -v"
    echo "   • 添加远程仓库：git remote add gitee https://gitee.com/YOUR_USERNAME/YOUR_REPO.git"
    echo "   • 查看详细文档：docs/Gitee-Pages部署指南.md"
    echo ""
    exit 1
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ 代码已推送到 Gitee！${NC}"
echo -e "${GREEN}════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}⚠️  重要提醒：${NC}"
echo -e "${RED}   Gitee Pages 不会自动更新！${NC}"
echo ""
echo -e "${YELLOW}📝 接下来的操作：${NC}"
echo "   1. 访问 Gitee 仓库页面"
echo "   2. 点击 [服务] → [Gitee Pages]"
echo "   3. 点击 [更新] 按钮"
echo "   4. 等待部署完成（约1-2分钟）"
echo ""
echo -e "${BLUE}🌐 预计访问地址：${NC}"
echo "   https://YOUR_USERNAME.gitee.io/YOUR_REPO/"
echo ""

# 提示是否打开Gitee仓库页面
read -p "是否打开Gitee仓库页面？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # 尝试获取Gitee仓库URL
    GITEE_URL=$(git remote get-url gitee 2>/dev/null | sed 's/\.git$//')
    if [[ -n "$GITEE_URL" ]]; then
        echo -e "${BLUE}🌐 正在打开浏览器...${NC}"
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open "$GITEE_URL"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open "$GITEE_URL"
        fi
    else
        echo -e "${YELLOW}⚠️  无法获取Gitee仓库地址${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 部署脚本执行完成！${NC}"
echo ""

