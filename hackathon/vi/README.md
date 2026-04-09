---
name: VI
description: "视觉识别系统 — 统一定义黑客松项目全套材料的品牌色彩、字体、图形语言与视觉调性"
---

## 概述

VI（Visual Identity）模块是整个 Hackathon 展示体系的设计根基。所有子模块（PPT、易拉宝、宣传册、图片生成）的视觉决策均以本模块为单一来源，保证跨材料的品牌一致性。

## 品牌色彩

### 主色（暖棕大地系）
| 名称 | 色值 | 用途 |
|---|---|---|
| Brand Honey | `#C26100` | 标题、强调、按钮、品牌主色 |
| Brand Honey Strong | `#9B4D00` | 深色强调、悬停状态 |
| Brand Lake | `#2F7886` | 辅助色、链接、焦点环 |
| Brand Lake Strong | `#235B67` | 辅助色深色 |

### 表面色
| 名称 | 色值 | 用途 |
|---|---|---|
| Surface Page | `#F5EDE4` | 页面背景 |
| Surface Canvas | `#F0E3D2` | 画布背景 |
| Surface Panel | `#FFF8F0` | 面板、卡片背景 |
| Surface Elevated | `#FFFDF8` | 高亮面板背景 |
| Surface Raised | `#FAF1E5` | 悬浮元素背景 |

### 文字色
| 名称 | 色值 | 用途 |
|---|---|---|
| Text Primary | `#2C1B0C` | 主标题、项目名 |
| Text Secondary | `#5E4832` | 正文、说明文字 |
| Text Tertiary | `#8A725C` | 次要信息、注释、标签 |
| Text Inverse | `#FFF5E9` | 深色背景上的文字 |

### 节点画布辅助色（用于模块类型区分）
| 名称 | 色值 | 对应模块 |
|---|---|---|
| Edge depends-on | `#2F7886` | 依赖关系连线 |
| Edge implements | `#C26100` | 实现关系连线 |
| Edge extends | `#8D6242` | 扩展关系连线 |
| Edge references | `#5C8A7A` | 引用关系连线 |
| Edge related-to | `#7C7368` | 关联关系连线 |
| Status Clean | `#4B7A5E` | 正常状态 |
| Status Modified | `#C77A1F` | 已修改状态 |
| Status Error | `#BF4B46` | 错误状态 |

## 字体规范

### 品牌字体（Wordmark）
- **Syne**（800）：Logo 专用字体，用于 ArchUI 标识

### 标题字体
- **Sora**（400–800）：英文标题、导航
- **Noto Sans SC**（700/900）：中文标题

### 正文字体
- **Lexend**（300–700）：英文正文、UI 标签
- **Noto Sans SC**（400/500）：中文正文

### 代码字体
- **JetBrains Mono**（400/600）：模块名、UUID、代码片段、文件路径

### 字号阶梯
| 层级 | 字号 | 行高 | 场景 |
|---|---|---|---|
| Display | 68px / 48–64pt | 1.1 | 易拉宝项目名、PPT 封面大标题 |
| Heading 1 | 26–28px / 32–40pt | 1.2 | PPT 页面标题、易拉宝亮点标题 |
| Heading 2 | 20–22px / 24–28pt | 1.3 | 宣传册分区标题、易拉宝副标题 |
| Body | 16–19px / 14–16pt | 1.6–1.8 | 正文 |
| Caption | 13–14px / 10–12pt | 1.4 | 注释、来源标注、技术标签 |

### Google Fonts 引用
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Lexend:wght@300;400;500;600;700&family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet">
```

## 图形语言

### 视觉调性关键词
> 暖棕大地系、模块化、清晰结构、温暖专业、节点连线、开发者友好

### 图形元素
- **几何形状**：圆角矩形（radius 10–16px），主要形状为卡片和节点
- **线条风格**：2–2.5px 橙色虚线（stroke-dasharray: 8 4），贝塞尔曲线连线
- **纹理/背景**：暖米色底 `#F5EDE4` + 极淡棕色网格（opacity 0.12）
- **分割线**：棕色渐变（transparent → #C26100 → transparent）
- **阴影**：暖棕投影（drop-shadow 0 18px 40px rgba(85, 55, 24, .12)）
- **插图风格**：SVG 矢量节点图，扁平化，代码编辑器风格

### 图片构图原则
- 主体居中或遵循黄金比例
- 留白不少于画面面积的 30%
- 白底为主，避免深色背景（除节点画布内部）
- 节点画布使用白色节点 + 彩色头部条的风格

## Logo 使用规范

### 素材文件（resources/ 目录）

| 文件 | 说明 |
|---|---|
| `archui-logo-transparent.png` | 完整 Logo（珊瑚树图标 + ArchUI 文字），透明背景 |
| `coral-icon.png` | 珊瑚树图标单独版，透明背景 |

### 使用规则

- 完整 Logo：用于 banner、硬卡、PPT 封面等需要品牌标识的场景
- 单独图标：用于产品 UI 内的小尺寸场景（favicon、导航栏）
- 最小尺寸：40px 高度（屏幕）/ 10mm 高度（印刷）
- 安全距离：Logo 高度的 50%
- 禁止变形、旋转、更改颜色
- 深色背景使用白色版，浅色背景使用彩色版

## Gemini 图片生成风格提示词（基础）

```
Modern tech illustration, warm amber (#C26100) accent color on warm cream (#F5EDE4) background,
teal (#2F7886) secondary accent, minimal geometric node-graph style, generous white space,
rounded rectangles connected by curved dashed lines, earthy professional aesthetic,
flat vector style, structured and inviting, no text overlay
```
