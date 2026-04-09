/**
 * AUTO-GENERATED FILE. DO NOT EDIT.
 * Regenerate with: npm run sync:design-docs
 * Document snapshot curated_at: 2026-04-09T11:00:00+08:00, 2026-04-09T03:10:00+08:00, 2026-04-09T03:10:00+08:00, 2026-04-09T03:10:00+08:00, 2026-04-09T03:10:00+08:00 * Sources:
 * - gui/screens/landing/web-copy.yaml
 * - gui/screens/canvas/web-copy.yaml
 * - gui/components/detail-panel/web-copy.yaml
 * - gui/components/primary-module-card/web-copy.yaml
 * - gui/components/link-renderer/web-semantics.yaml
 * - gui/design-system/visual-orchestration/web-brand.yaml
 */

export const workspaceContent = {
  "brand": {
    "wordmark": "ArchUI",
    "tagline": "Maintain once, generate everywhere.",
    "teamName": "Arch Park",
    "projectDefinitionEn": "AI-Native Generative Knowledge Engine",
    "projectDefinitionZh": "AI 原生生成式知识引擎",
    "projectValue": "让工作知识可维护、可复用、可生成，可持续产生价值。",
    "logoMark": {
      "assetKey": "coral-icon",
      "assetFile": "coral-icon.png",
      "alt": "ArchUI 珊瑚树图标",
      "treatment": "Coral orange single-color",
      "glyphKind": "custom-raster-mark",
      "geometry": {
        "silhouette": "coral-tree",
        "lean": "centered",
        "source": "raster-asset",
        "notes": "Coral tree icon from Hackathon VI — represents modular branching knowledge structure."
      },
      "sizes": {
        "sm": {
          "width": 28,
          "height": 28
        },
        "md": {
          "width": 48,
          "height": 48
        },
        "hero": {
          "width": 80,
          "height": 80
        }
      }
    },
    "logoFull": {
      "assetKey": "archui-logo",
      "assetFile": "archui-logo-transparent.png",
      "alt": "ArchUI 完整 Logo",
      "sizes": {
        "landing": {
          "height": 56
        }
      }
    },
    "highlights": [
      {
        "title": "一键 Skills 化",
        "desc": "将知识文档变成可复用、相关联的 Skills 模块",
        "icon": "⚡"
      },
      {
        "title": "文档即编排",
        "desc": "编排知识模块就是编排代码，改 Skills 即改代码",
        "icon": "📐"
      },
      {
        "title": "模块广场",
        "desc": "发布、发现、替换、组合 — Skills 模块的 npm",
        "icon": "🏪"
      }
    ]
  },
  "landing": {
    "brandWordmark": "ArchUI",
    "subtitle": "AI-Native Generative Knowledge Engine",
    "tagline": "Maintain once, generate everywhere.",
    "themeToggle": {
      "toLight": "Switch to light",
      "toDark": "Switch to dark"
    },
    "card": {
      "kicker": "AI 原生生成式知识引擎",
      "title": "让工作知识可维护、可复用、可生成。",
      "body": "将知识结构化为可复用模块 — 每个模块独立可维护，AI 按需加载，直接生成代码。打开项目，进入模块关系图。"
    },
    "actions": {
      "connectServer": "云预览",
      "openFolder": "打开本地 ArchUI 项目",
      "showServerUrl": "显示服务器地址",
      "hideServerUrl": "隐藏服务器地址",
      "serverUrlPlaceholder": "http://localhost:3001"
    }
  },
  "canvas": {
    "intro": {
      "kicker": "Knowledge Canvas",
      "emptyTitle": "Open a workspace",
      "emptyDescription": "Pick a local ArchUI project to step into the graph."
    },
    "toolbar": {
      "newChild": "＋ 新模块",
      "reload": "刷新",
      "themeToggle": {
        "toDark": "深色模式",
        "toLight": "浅色模式"
      },
      "commandMenu": "⌘K"
    },
    "metrics": {
      "submodules": "子模块",
      "externals": "外部引用",
      "theme": "主题"
    },
    "breadcrumb": {
      "ariaLabel": "Breadcrumb"
    },
    "selectionHint": {
      "title": "点击卡片查看详情",
      "body": "双击模块可钻入子级工作区"
    },
    "loading": "正在加载工作区…",
    "emptyState": {
      "title": "暂无子模块",
      "body": "创建第一个子模块，开始构建你的知识模块树。"
    },
    "placeholder": {
      "unknownModuleName": "未知模块",
      "unknownModuleDescription": "该模块 UUID 在当前项目索引中无法解析。"
    },
    "contextMenu": {
      "openModule": "打开模块",
      "newChildModule": "新建子模块",
      "reloadWorkspace": "刷新工作区",
      "copyModule": "复制模块",
      "pasteModule": "粘贴模块",
      "copiedToClipboard": "已复制到剪贴板",
      "nothingToPaste": "剪贴板中无可粘贴内容",
      "pasteFailed": "粘贴失败",
      "deleteModule": "删除模块",
      "deleteConfirm": "确认删除该模块？此操作不可撤回。",
      "deleteFailed": "删除失败"
    },
    "commands": {
      "newChildModule": "新建子模块",
      "reloadWorkspace": "刷新工作区",
      "reloadHint": "重新加载当前模块",
      "openModuleHint": "打开模块"
    }
  },
  "detailPanel": {
    "ariaLabel": "模块详情",
    "closeLabel": "关闭",
    "closeAriaLabel": "关闭详情面板",
    "kicker": {
      "focused": "当前模块",
      "selection": "已选中",
      "visible": "可见模块"
    },
    "fallback": {
      "description": "该模块暂无描述信息。",
      "missingSubmodule": "子模块已声明但尚未索引。",
      "unknownModuleName": "未知模块",
      "unknownModuleDescription": "该 UUID 在当前项目索引中无法解析。"
    },
    "metrics": {
      "submodules": "子模块",
      "outgoing": "出链",
      "incoming": "入链"
    },
    "sections": {
      "submodules": "子模块",
      "linksTo": "链接到",
      "linkedBy": "被链接"
    },
    "empty": {
      "submodules": "暂无子模块",
      "outgoing": "暂无出链",
      "incoming": "暂无入链"
    }
  },
  "moduleCard": {
    "eyebrow": {
      "primary": "当前模块",
      "child": "子模块"
    },
    "externalEyebrow": {
      "incoming": "入链引用",
      "external": "外部引用"
    },
    "badges": {
      "submodulesSuffix": "子模块",
      "linksSuffix": "链接"
    }
  },
  "linkRenderer": {
    "defaultRelation": "related-to"
  }
} as const
