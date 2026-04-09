---
name: 基础信息
description: "基础信息模块 — 统一维护黑客松项目的队名、项目名称与一句话项目介绍，作为所有展示材料的唯一来源"
---

## 概述

基础信息模块定义黑客松项目最小且必须一致的对外身份信息。所有展示材料中出现的队名、项目名称与一句话项目介绍，均应以本模块为唯一来源。

## 信息项

| 字段 | 说明 | 典型使用场景 |
|---|---|---|
| `队名` | 参赛团队的统一名称 | PPT 封面、宣传册封底、视频结尾、现场介绍 |
| `项目名称` | 项目的正式名称 | PPT 标题、易拉宝主标题、宣传册封面 |
| `产品定义` | 一句话说明产品品类 | 封面副标题、海报定位行 |
| `价值主张` | 面向用户的核心价值 | 所有材料的核心文案 |
| `Tagline` | 装饰性英文标语 | 海报、PPT 封面 |

## 当前信息

```yaml
team_name: Arch Park
project_name: ArchUI
project_definition_en: AI-Native Generative Knowledge Engine
project_definition_zh: AI 原生生成式知识引擎
project_value: 让工作知识可维护、可复用、可生成，可持续产生价值。
project_tagline: "Maintain once, generate everywhere."
```

## 统一问题表述

```yaml
problem: 项目知识层越来越复杂，难以维护。知识散落在代码和文档中，越积越乱，AI 也读不动。
solution: ArchUI 将知识结构化为可复用模块 — 每个模块独立可维护，AI 按需加载，直接生成代码。
```

## 三大亮点

```yaml
highlight_1:
  title: 一键 Skills 化
  desc: 将知识文档变成可复用、相关联的 Skills 模块
  example: "archui init → 扫描文档 → 生成 Skills 模块树"

highlight_2:
  title: 文档即编排
  desc: 编排知识模块就是编排代码，改 Skills 即改代码
  example: "edit SPEC.md → AI auto-generates code"

highlight_3:
  title: 模块广场
  desc: 发布、发现、替换、组合 — Skills 模块的 npm
  example: "publish → discover → replace → generate"
```

## Logo

- 图标：珊瑚树（coral-icon.png）
- 文字：Syne 字体 800 weight "ArchUI"
- 组合方式：图标 + 文字横排

## 使用规则

- 所有展示材料中的队名、项目名称、一句话项目介绍必须引用本模块定义，不得在各模块内分别改写
- 信息变更后，优先检查 `ppt`、`banner`、`brochure`、`video` 中的封面、标题区与结尾页是否同步
