// ============================================================
// Clash101.com — Clash 中文全知识库（CPA下载站）
// ============================================================
export const siteConfig = {
  // ── 基础信息 ──
  name: 'Clash101',
  title: 'Clash 教程指南 — 从零入门到精通',
  description: 'Clash Verge Rev 中文教程与下载安装指南，涵盖 Windows/Mac/Linux/Android 全平台。从零入门到进阶配置，TUN模式、规则分流、订阅管理一站式掌握。',
  keywords: 'Clash,Clash Verge,Clash下载,Clash教程,Clash配置,Clash安卓,科学上网,代理客户端,TUN模式,规则分流',
  url: 'https://clash101.com',
  language: 'zh-CN',
  author: 'Clash101教程',
  email: 'contact@clash101.com',

  // ── CPA 下载链接 ──
  cpaDownloadUrl: 'https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge.zip',
  cpaDownloadText: '立即下载 Clash Verge Rev',

  // ── 更新浮窗 ──
  newsFloat: {
    date: '更新日期：2026-08-02',
    label: 'Clash Verge Rev 最新更新',
    items: [
      '1. v2.5.3 版本发布，修复 TUN 模式稳定性',
      '2. 新增节点延迟自动测速功能',
      '3. 订阅管理器性能优化',
    ],
  },

  // ── Logo 区 ──
  logo: {
    text: 'Clash101',
    img: 'TG.svg',
    imgWidth: 200,
    imgHeight: 25,
  },

  // ── Hero 下载区（3个平台CTA）──
  downloadButtons: [
    { img: 'window_img.png', btnSvg: 'down.svg',    onClick: "window.open('https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge-win.zip')" },
    { img: 'android_img.png', btnSvg: 'down-android.svg', onClick: "window.open('https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge-android.zip')" },
    { img: 'iphone_img.png',  btnSvg: 'down-iphone.svg',  onClick: "window.open('https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge-mac.zip')" },
  ],

  // ── Features 区（9 个）──
  features: [
    { gif: 'img1.gif', title: '开源免费', desc: '基于开源协议，完全免费使用，社区驱动持续更新。' },
    { gif: 'img2.gif', title: '规则分流', desc: '智能识别国内外流量，国内直连、国外代理，互不干扰。' },
    { gif: 'img3.gif', title: '多平台', desc: '支持 Windows、macOS、Linux、Android 全平台客户端。' },
    { gif: 'img4.gif', title: 'TUN 模式', desc: '虚拟网卡层接管所有流量，实现真正的全局代理。' },
    { gif: 'img5.gif', title: '订阅管理', desc: '一键导入机场订阅，自动更新节点列表，省心省力。' },
    { gif: 'img6.gif', title: '高速稳定', desc: '支持多种代理协议，延迟低、带宽稳、长期运行不卡顿。' },
    { gif: 'img7.gif', title: '隐私保护', desc: 'DNS 防泄漏、流量加密，保护上网隐私不被追踪。' },
    { gif: 'img8.gif', title: '扩展脚本', desc: '支持全局扩展配置和脚本，高级用户可自定义代理逻辑。' },
    { gif: 'img9.gif', title: '中文界面', desc: '内置简体中文，无需额外汉化，上手零门槛。' },
  ],

  // ── 内容分类 ──
  categories: [
    { id: 'download', name: '下载安装' },
    { id: 'guide',    name: '入门教程' },
    { id: 'config',   name: '配置进阶' },
    { id: 'fix',      name: '故障排查' },
  ],

  // ── 分类标签映射 ──
  catLabels: {
    download: '下载安装',
    guide: '入门教程',
    config: '配置进阶',
    fix: '故障排查',
  } as Record<string, string>,

  // ── 分类标签调色板 ──
  catTagPalette: [
    { bg: '#e0f2fe', color: '#0369a1' },
    { bg: '#ecfdf5', color: '#065f46' },
    { bg: '#fef3c7', color: '#92400e' },
    { bg: '#f3e8ff', color: '#7c3aed' },
    { bg: '#fce7f3', color: '#be185d' },
    { bg: '#e0f2fe', color: '#0891b2' },
  ],

  // ── 配色方案（Clash 蓝紫渐变）──
  colors: {
    primary: '#6366f1',
    primaryHover: '#818cf8',
    bg: '#ffffff',
    bgCard: '#f5f7fa',
    textPrimary: '#1e293b',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    featTitle: '#6366f1',
    btnBorder: '#ffffff',
    border: '#e8ecf1',
  },

  // ── 字体 ──
  fonts: {
    heading: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
    body: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
  },

  // ── 页脚 ──
  footer: {
    notice: '本站为独立教程站点。所有下载链接指向官方源，不托管安装包文件。',
  },

  // ── 结构化数据 ──
  structuredData: {
    organization: 'Clash101教程',
    homepageType: 'WebSite' as 'WebSite' | 'Organization',
  },
};
