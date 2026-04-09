import { workspaceContent } from '../../generated/workspace-content.generated'
import s from './StatusBar.module.css'

interface StatusBarProps {
  selectedCount: number
  moduleCount: number
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function StatusBar({ selectedCount, moduleCount, theme, onToggleTheme }: StatusBarProps) {
  const brand = workspaceContent.brand
  const isSelected = selectedCount > 0
  const label = isSelected ? `${selectedCount} 已选中` : 'IDLE'
  return (
    <footer className={s.bar}>
      <span className={s.brand}>
        <strong className={s.wordmark}>{brand.wordmark}</strong>
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
      <button className={s.themeBtn} onClick={onToggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <span className={s.teamTag}>ArchUI</span>
    </footer>
  )
}
