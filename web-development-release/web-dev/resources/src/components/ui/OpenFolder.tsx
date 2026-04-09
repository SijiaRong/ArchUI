import { useState } from 'react'
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
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function handleCopy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 1500)
    })
  }

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

      <div className={s.cliSection}>
        <div className={s.cliHeader}>
          <div className={s.cardKicker}>{lt.cli.kicker}</div>
          <h2 className={s.cliTitle}>{lt.cli.title}</h2>
          <p className={s.cliBody}>{lt.cli.body}</p>
        </div>

        <div className={s.cliCommandRow}>
          <div className={s.cliHeroCommand}>
            <span className={s.cliPrompt}>$</span>
            <code className={s.cliCommand}>{lt.cli.heroCommand}</code>
          </div>
          <button
            className={`${s.copyBtn} ${copiedKey === 'hero' ? s.copyBtnCopied : ''}`}
            onClick={() => handleCopy(lt.cli.heroCommand, 'hero')}
          >
            {copiedKey === 'hero' ? lt.cli.copied : '⎘'}
          </button>
        </div>

        <div className={s.cliInstallRow}>
          <span className={s.cliInstallLabel}>{lt.cli.install.label}</span>
          <div className={s.cliCommandRow}>
            <div className={s.cliInstallCommand}>
              <span className={s.cliPrompt}>$</span>
              <code className={s.cliCommand}>{lt.cli.install.command}</code>
            </div>
            <button
              className={`${s.copyBtn} ${copiedKey === 'install' ? s.copyBtnCopied : ''}`}
              onClick={() => handleCopy(lt.cli.install.command, 'install')}
            >
              {copiedKey === 'install' ? lt.cli.copied : '⎘'}
            </button>
          </div>
        </div>
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

      <footer className={s.footer}>
        <span className={s.teamName}>{brand.teamName}</span>
        <span className={s.footerDot}>·</span>
        <span className={s.footerTagline}>{lt.brand.tagline}</span>
      </footer>
    </div>
  )
}
