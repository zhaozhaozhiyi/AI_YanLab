/**
 * 常量定义
 * 包含品牌色、配置项等
 */
const Constants = {
  
  /**
   * 品牌色配置（与Tailwind配置保持一致）
   */
  COLORS: {
    primary: '#FF6B9D',      // 主色（粉红）
    secondary: '#6B66FF',    // 辅助色（紫色）
    success: '#10B981',      // 成功（绿色）
    warning: '#F59E0B',      // 警告（橙色）
    error: '#EF4444',        // 错误（红色）
    info: '#3B82F6',         // 信息（蓝色）
  },
  
  /**
   * 产品信息
   */
  APP: {
    name: 'AI颜值管家',
    slogan: '您的专属AI颜值顾问',
    version: '1.0.0',
    support: '7x24小时在线服务',
  },
  
  /**
   * 评估问题类型
   */
  ISSUE_TYPES: [
    { value: 'spots', label: '色斑', icon: 'fa-circle-dot' },
    { value: 'wrinkles', label: '皱纹', icon: 'fa-slash' },
    { value: 'sagging', label: '松弛', icon: 'fa-arrow-down' },
    { value: 'dullness', label: '暗沉', icon: 'fa-moon' },
    { value: 'pores', label: '毛孔', icon: 'fa-braille' },
  ],
  
  /**
   * 问题严重程度
   */
  ISSUE_LEVELS: {
    low: { label: '轻微', color: 'text-green-500', bgColor: 'bg-green-50' },
    medium: { label: '中等', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    high: { label: '严重', color: 'text-red-500', bgColor: 'bg-red-50' },
  },
  
  /**
   * 用户VIP等级
   */
  VIP_LEVELS: {
    normal: { label: '普通会员', color: 'text-gray-500', icon: 'fa-user' },
    vip: { label: 'VIP会员', color: 'text-yellow-500', icon: 'fa-crown' },
    svip: { label: 'SVIP会员', color: 'text-purple-500', icon: 'fa-gem' },
  },
  
  /**
   * 预约状态
   */
  BOOKING_STATUS: {
    pending: { label: '待确认', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    confirmed: { label: '已确认', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    completed: { label: '已完成', color: 'text-green-500', bgColor: 'bg-green-50' },
    cancelled: { label: '已取消', color: 'text-gray-500', bgColor: 'bg-gray-50' },
  },
  
  /**
   * 知识库状态
   */
  KNOWLEDGE_STATUS: {
    draft: { label: '草稿', color: 'text-gray-500' },
    pending: { label: '待审核', color: 'text-yellow-500' },
    approved: { label: '已通过', color: 'text-green-500' },
    rejected: { label: '已驳回', color: 'text-red-500' },
    published: { label: '已发布', color: 'text-blue-500' },
  },
  
  /**
   * 用户角色
   */
  USER_ROLES: {
    admin: { label: '系统管理员', permissions: ['all'] },
    operator: { label: '运营人员', permissions: ['content', 'marketing', 'users'] },
    analyst: { label: '数据分析师', permissions: ['analytics'] },
    service: { label: '客服主管', permissions: ['users', 'crm'] },
    knowledge: { label: '知识管理员', permissions: ['knowledge'] },
    expert: { label: '医疗专家', permissions: ['knowledge_review', 'cases'] },
  },
  
  /**
   * 拍照角度
   */
  PHOTO_ANGLES: [
    { value: 'front', label: '正面', icon: 'fa-user', tip: '请正视镜头，保持面部居中' },
    { value: 'left', label: '左侧45度', icon: 'fa-user-slash', tip: '请向左转45度' },
    { value: 'right', label: '右侧45度', icon: 'fa-user', tip: '请向右转45度' },
  ],
  
  /**
   * 底部导航栏
   */
  TAB_BAR: [
    { name: '首页', icon: 'fa-home', url: '/web/index.html' },
    { name: '评估', icon: 'fa-camera', url: '/web/pages/assessment/guide.html' },
    { name: '社区', icon: 'fa-comments', url: '/web/pages/community/index.html' },
    { name: '我的', icon: 'fa-user', url: '/web/pages/profile/index.html' },
  ],
};

