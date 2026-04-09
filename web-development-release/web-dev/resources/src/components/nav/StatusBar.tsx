import { workspaceContent } from '../../generated/workspace-content.generated'
import s from './StatusBar.module.css'

interface StatusBarProps {
  selectedCount: number
  moduleCount: number
}

export function StatusBar({ selectedCount, moduleCount }: StatusBarProps) {
  const brand = workspaceContent.brand
  const isSelected = selectedCount > 0
  const label = isSelected ? `${selectedCount} 已选中` : 'IDLE'
  return (
    <footer className={s.bar}>
      <span className={s.brand}>
        <strong className={s.wordmark}>{brand.wordmark}</strong>
        <span className={s.brandDef}>{brand.projectDefinitionEn}</span>
      </span>
      <span className={s.sep} />
      <span className={`${s.badge} ${isSelected ? s.badgeSelected : s.badgeIdle}`}>
        <span className={s.dot} />
        {label}
      </span>
      <span className={s.metric}>{moduleCount} 模块</span>
      <span className={s.sep} />
      <span className={s.hint}>
        点击选中 · 双击钻入 · Esc 返回 · ⌘K 命令面板
      </span>
      <span className={s.teamTag}>{brand.teamName}</span>
    </footer>
  )
}
