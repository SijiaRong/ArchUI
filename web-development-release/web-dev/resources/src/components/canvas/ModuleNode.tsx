import type { CSSProperties } from 'react'
import { Handle, Position } from '@xyflow/react'
import type { NodeProps } from '@xyflow/react'
import { workspaceContent } from '../../generated/workspace-content.generated'
import type { ProjectIndexEntry } from '../../types'
import s from './ModuleNode.module.css'

/** A link with resolved target module name (resolved from sibling at build time) */
export interface ResolvedLink {
  uuid: string
  relation?: string
  description?: string
  targetName?: string  // name of the target module if it is a sibling in the canvas
}

export interface ModuleNodeData {
  entry: ProjectIndexEntry
  variant: 'primary' | 'child'
  submoduleCount: number
  linkCount: number
  accentIndex: number
}

type DocType = 'SPEC' | 'HARNESS' | 'MEMORY' | 'SKILL' | 'README'

const DOC_TYPE_LABELS: Record<DocType, string> = {
  SPEC: 'SPEC',
  HARNESS: 'HARNESS',
  MEMORY: 'MEMORY',
  SKILL: 'SKILL',
  README: 'MODULE',
}

function inferDocType(path: string, name: string): DocType {
  const lower = (path + '/' + name).toLowerCase()
  if (lower.includes('-harness') || lower.includes('harness')) return 'HARNESS'
  if (lower.includes('-memory') || lower.includes('memory-node')) return 'MEMORY'
  if (lower.includes('skill')) return 'SKILL'
  if (lower.includes('spec') || lower.includes('-development') || lower.includes('-release')) return 'SPEC'
  return 'README'
}

export function ModuleNode({ data, selected }: NodeProps & { data: ModuleNodeData }) {
  const { entry, variant, submoduleCount, linkCount, accentIndex } = data
  const moduleCardContent = workspaceContent.moduleCard
  const docType = inferDocType(entry.path, entry.name)
  const style = {
    ['--node-accent' as string]: `var(--accent-${accentIndex})`,
  } as CSSProperties

  return (
    <div
      className={`${s.node} ${variant === 'primary' ? s.nodePrimary : s.nodeChild} ${selected ? s.nodeSelected : ''}`}
      style={style}
      data-node-variant={variant}
    >
      <Handle type="target" position={Position.Left} className={`${s.handle} ${s.handleLeft}`} />

      <div className={s.chrome}>
        <div className={s.eyebrowRow}>
          <span className={s.eyebrow}>
            {variant === 'primary' ? moduleCardContent.eyebrow.primary : moduleCardContent.eyebrow.child}
          </span>
          <span className={s.docTypeBadge} data-doc-type={docType}>
            {DOC_TYPE_LABELS[docType]}
          </span>
        </div>
        <div className={s.name} title={entry.name}>{entry.name}</div>
        <div className={s.uuid}>{entry.uuid}</div>
      </div>

      {entry.description && (
        <div className={s.desc}>{entry.description}</div>
      )}

      <div className={s.metaRow}>
        <div className={s.badge}>{`${submoduleCount} ${moduleCardContent.badges.submodulesSuffix}`}</div>
        <div className={s.badge}>{`${linkCount} ${moduleCardContent.badges.linksSuffix}`}</div>
      </div>

      <Handle type="source" position={Position.Right} className={`${s.handle} ${s.handleRight}`} />
    </div>
  )
}
