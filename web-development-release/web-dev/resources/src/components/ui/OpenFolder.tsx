import { openDirectory } from '../../filesystem/fsa'
import serverAdapter from '../../filesystem/serverAdapter'
import { brandAssetUrls } from '../../generated/brand-assets.generated'
import { workspaceContent } from '../../generated/workspace-content.generated'
import { useI18n } from '../../i18n'
import { useCanvasStore } from '../../store/canvas'
import s from './OpenFolder.module.css'

interface OpenFolderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function OpenFolder({ theme, onToggleTheme }: OpenFolderProps) {
  const brand = workspaceContent.brand
  const logoMark = brand.logoMark
  const logoMarkUrl = brandAssetUrls[logoMark.assetKey as keyof typeof brandAssetUrls]
  const setAdapter = useCanvasStore(s => s.setAdapter)
  const { locale, toggleLocale, t } = useI18n()
  const lt = t.landing

  async function handleFsa() {
    try {
      const { adapter, root } = await openDirectory()
      await setAdapter(adapter, '/', 'fsa')
      void root
    } catch (e) {
      if ((e as Error).name !== 'AbortError') console.error(e)
    }
  }

  async function handleServer() {
    await setAdapter(serverAdapter, '.', 'server')
  }

  return (
    <div className={s.root}>
      <div className={s.topActions}>
        <button className={s.langBtn} onClick={toggleLocale}>
          {locale === 'zh-CN' ? 'EN' : '中'}
        </button>
        <button className={s.themeBtn} onClick={onToggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <div className={s.hero}>
        <div className={s.logoRow}>
          <img
            className={s.logoMark}
            src={logoMarkUrl}
            alt={lt.logoAlt}
            width={logoMark.sizes.hero.width}
            height={logoMark.sizes.hero.height}
          />
          <span className={s.wordmark}>{brand.wordmark}</span>
        </div>
        <div className={s.subtitle}>{lt.subtitle}</div>
        <div className={s.tagline}>{lt.tagline}</div>
      </div>

      <div className={s.highlights}>
        {lt.highlights.map((h, i) => (
          <div key={i} className={s.highlightCard}>
            <span className={s.highlightIcon}>{h.icon}</span>
            <strong className={s.highlightTitle}>{h.title}</strong>
            <span className={s.highlightDesc}>{h.desc}</span>
          </div>
        ))}
      </div>

      <div className={s.card}>
        <div className={s.cardKicker}>{lt.card.kicker}</div>
        <h1>{lt.card.title}</h1>
        <p>{lt.card.body}</p>

        <div className={s.actionGrid}>
          <button className={s.btnPrimary} onClick={handleServer}>
            {lt.actions.connectServer}
          </button>
          <button className={s.btnSecondary} onClick={handleFsa}>
            {lt.actions.openFolder}
          </button>
        </div>
      </div>

      <footer className={s.footer}>
        <span className={s.teamName}>{brand.teamName}</span>
        <span className={s.footerDot}>·</span>
        <span className={s.footerTagline}>{lt.brand.tagline}</span>
      </footer>
    </div>
  )
}
