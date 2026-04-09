import type { LandingTranslations } from '../types'

export const zhCN: LandingTranslations = {
  landing: {
    subtitle: 'AI 原生生成式知识引擎',
    tagline: '一次维护，全局生成。',
    card: {
      kicker: '开始使用',
      title: '让工作知识可维护、可复用、可生成。',
      body: '将知识结构化为可复用模块 — 每个模块独立可维护，AI 按需加载，直接生成代码。打开项目，进入模块关系图。',
    },
    actions: {
      connectServer: '云预览',
      openFolder: '打开本地 ArchUI 项目',
      showServerUrl: '显示服务器地址',
      hideServerUrl: '隐藏服务器地址',
      serverUrlPlaceholder: 'http://localhost:3001',
    },
    highlights: [
      {
        icon: '⚡',
        title: '一键 Skills 化',
        desc: '将知识文档变成可复用、相关联的 Skills 模块',
      },
      {
        icon: '📐',
        title: '文档即编排',
        desc: '编排知识模块就是编排代码，改 Skills 即改代码',
      },
      {
        icon: '🏪',
        title: '模块广场',
        desc: '发布、发现、替换、组合 — Skills 模块的 npm',
      },
    ],
    brand: {
      tagline: '让知识持续产生价值。',
    },
    logoAlt: 'ArchUI 珊瑚树图标',
  },
}
