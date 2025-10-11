/**
 * Mock数据生成器
 * 为静态原型提供模拟数据
 */
const MockData = {
  
  /**
   * 生成用户数据
   */
  generateUser(id) {
    const names = ['张美丽', '李优雅', '王静怡', '刘婉婷', '陈诗涵'];
    return {
      id: id,
      name: names[id % names.length],
      phone: `138****${String(1000 + id).slice(-4)}`,
      avatar: `./assets/images/avatars/avatar-${(id % 5) + 1}.jpg`,
      age: 25 + (id % 15),
      gender: '女',
      vipLevel: id % 3 === 0 ? 'VIP' : '普通',
      createTime: new Date(Date.now() - id * 86400000).toISOString(),
      lastLoginTime: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    };
  },
  
  /**
   * 生成评估报告
   */
  generateReport(userId) {
    const score = Math.floor(Math.random() * 30) + 70; // 70-100分
    return {
      id: Date.now() + Math.random(),
      userId: userId,
      score: score,
      level: score >= 90 ? '优秀' : score >= 80 ? '良好' : score >= 70 ? '一般' : '需改善',
      issues: [
        { type: '色斑', level: 'medium', score: 75, description: '面部有轻微色斑，建议进行激光治疗' },
        { type: '皱纹', level: 'low', score: 85, description: '眼角有细纹，可使用抗衰护肤品' },
        { type: '松弛', level: 'high', score: 65, description: '面部轮廓略有松弛，建议超声刀治疗' },
        { type: '暗沉', level: 'medium', score: 72, description: '肤色略显暗沉，建议美白护理' },
      ],
      suggestions: [
        { title: '近期建议', content: '使用抗衰精华，注意防晒', priority: 'high' },
        { title: '3个月方案', content: '激光祛斑+美白护理', priority: 'medium' },
        { title: '6个月方案', content: '超声刀提拉+抗衰疗程', priority: 'medium' },
      ],
      photos: [
        { angle: '正面', url: './assets/images/cases/face-front.jpg' },
        { angle: '侧面', url: './assets/images/cases/face-side.jpg' },
        { angle: '45度', url: './assets/images/cases/face-45.jpg' },
      ],
      createTime: new Date().toISOString(),
    };
  },
  
  /**
   * 生成AI对话消息
   */
  generateChatMessage(isUser, content) {
    return {
      id: Date.now() + Math.random(),
      isUser: isUser,
      content: content,
      avatar: isUser ? './assets/images/avatars/user.jpg' : './assets/images/ai-expert.jpg',
      name: isUser ? '我' : 'AI颜值管家',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };
  },
  
  /**
   * 生成专家数据
   */
  generateExpert(id) {
    const experts = [
      { name: '王美丽', title: '主任医师', specialty: '面部抗衰', years: 15 },
      { name: '李优雅', title: '副主任医师', specialty: '激光美容', years: 12 },
      { name: '张婉婷', title: '主治医师', specialty: '微整形', years: 8 },
      { name: '刘诗涵', title: '主任医师', specialty: '皮肤管理', years: 18 },
      { name: '陈静怡', title: '副主任医师', specialty: '抗衰管理', years: 10 },
    ];
    const expert = experts[id % experts.length];
    return {
      id: id,
      name: expert.name,
      title: expert.title,
      specialty: expert.specialty,
      years: expert.years,
      avatar: `./assets/images/experts/expert-${(id % 5) + 1}.jpg`,
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      cases: Math.floor(Math.random() * 500) + 500,
      price: Math.floor(Math.random() * 300) + 200,
      intro: `从业${expert.years}年，擅长${expert.specialty}，已为数千位客户提供专业服务。`,
    };
  },
  
  /**
   * 生成文章数据
   */
  generateArticle(id) {
    const titles = [
      '抗衰老的5个黄金时期，你错过了吗？',
      '激光祛斑全攻略：效果、价格、注意事项',
      '超声刀VS热玛吉：哪个更适合你？',
      '面部抗衰的三大误区，90%的人都中招',
      '医美项目如何选择？专家为你详细解答',
    ];
    return {
      id: id,
      title: titles[id % titles.length],
      cover: `./assets/images/articles/cover-${(id % 5) + 1}.jpg`,
      category: ['抗衰知识', '激光美容', '医美科普'][id % 3],
      views: Math.floor(Math.random() * 5000) + 1000,
      likes: Math.floor(Math.random() * 500) + 100,
      author: '专家团队',
      publishTime: new Date(Date.now() - id * 86400000 * 2).toISOString(),
      summary: '专业的抗衰知识分享，帮助您了解最新的医美技术和护肤方法...',
    };
  },
  
  /**
   * 生成知识库条目
   */
  generateKnowledge(id) {
    return {
      id: id,
      title: `抗衰知识条目${id}`,
      category: ['面部评估', '治疗方案', 'SOP流程', 'FAQ'][id % 4],
      content: '这是一条专业的医美知识内容，包含详细的诊疗指导...',
      tags: ['抗衰', '激光', '注射'],
      status: ['已发布', '待审核', '草稿'][id % 3],
      author: '专家团队',
      reviewer: id % 3 === 0 ? '审核专家' : '',
      createTime: new Date(Date.now() - id * 86400000).toISOString(),
      updateTime: new Date().toISOString(),
      usageCount: Math.floor(Math.random() * 100),
    };
  },
  
  /**
   * 初始化示例数据
   */
  initSampleData() {
    // 初始化用户数据
    if (!Storage.get('users')) {
      const users = Array.from({ length: 10 }, (_, i) => this.generateUser(i + 1));
      Storage.set('users', users);
      console.log('✅ 初始化用户数据:', users.length, '条');
    }
    
    // 初始化专家数据
    if (!Storage.get('experts')) {
      const experts = Array.from({ length: 5 }, (_, i) => this.generateExpert(i + 1));
      Storage.set('experts', experts);
      console.log('✅ 初始化专家数据:', experts.length, '条');
    }
    
    // 初始化文章数据
    if (!Storage.get('articles')) {
      const articles = Array.from({ length: 20 }, (_, i) => this.generateArticle(i + 1));
      Storage.set('articles', articles);
      console.log('✅ 初始化文章数据:', articles.length, '条');
    }
    
    // 初始化知识库数据
    if (!Storage.get('knowledge')) {
      const knowledge = Array.from({ length: 30 }, (_, i) => this.generateKnowledge(i + 1));
      Storage.set('knowledge', knowledge);
      console.log('✅ 初始化知识库数据:', knowledge.length, '条');
    }
    
    // 初始化当前登录用户
    if (!Storage.get('currentUser')) {
      Storage.set('currentUser', this.generateUser(1));
      console.log('✅ 设置当前登录用户');
    }
    
    // 初始化管理员账号
    if (!Storage.get('adminUsers')) {
      const adminUsers = [
        { id: 1, username: 'admin', password: 'admin123', name: '系统管理员', role: 'admin' },
        { id: 2, username: 'operator', password: 'op123', name: '运营人员', role: 'operator' },
        { id: 3, username: 'knowledge', password: 'km123', name: '知识管理员', role: 'knowledge' },
      ];
      Storage.set('adminUsers', adminUsers);
      console.log('✅ 初始化管理员账号:', adminUsers.length, '个');
    }
  }
};

// 页面加载时自动初始化
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof Storage !== 'undefined') {
      MockData.initSampleData();
    }
  });
}

