import { useState } from 'react'
import { openDirectory } from '../../filesystem/fsa'
import serverAdapter from '../../filesystem/serverAdapter'
import { brandAssetUrls } from '../../generated/brand-assets.generated'
import { workspaceContent } from '../../generated/workspace-content.generated'
import { useCanvasStore } from '../../store/canvas'
import s from './OpenFolder.module.css'

export function OpenFolder() {
  const brand = workspaceContent.brand
  const landingContent = workspaceContent.landing
  const logoFull = brand.logoFull
  const logoFullUrl = brandAssetUrls[logoFull.assetKey as keyof typeof brandAssetUrls]
  const setAdapter = useCanvasStore(s => s.setAdapter)
  const [serverUrl, setServerUrl] = useState(
    import.meta.env.VITE_SERVER_URL ?? landingContent.actions.serverUrlPlaceholder,
  )
  const [showUrl, setShowUrl] = useState(false)

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
      <div className={s.hero}>
        <img
          className={s.logoFull}
          src={logoFullUrl}
          alt={logoFull.alt}
          height={logoFull.sizes.landing.height}
        />
        <div className={s.subtitle}>{landingContent.subtitle}</div>
        <div className={s.tagline}>{landingContent.tagline}</div>
      </div>

      <div className={s.highlights}>
        {brand.highlights.map((h, i) => (
          <div key={i} className={s.highlightCard}>
            <span className={s.highlightIcon}>{h.icon}</span>
            <strong className={s.highlightTitle}>{h.title}</strong>
            <span className={s.highlightDesc}>{h.desc}</span>
          </div>
        ))}
      </div>

      <div className={s.card}>
        <div className={s.cardKicker}>{landingContent.card.kicker}</div>
        <h1>{landingContent.card.title}</h1>
        <p>{landingContent.card.body}</p>

        <div className={s.actionGrid}>
          <button className={s.btnPrimary} onClick={handleServer}>
            {landingContent.actions.connectServer}
          </button>
          <button className={s.btnSecondary} onClick={handleFsa}>
            {landingContent.actions.openFolder}
          </button>
        </div>

        <button className={s.inlineBtn} onClick={() => setShowUrl(v => !v)}>
          {showUrl ? landingContent.actions.hideServerUrl : landingContent.actions.showServerUrl}
        </button>

        {showUrl && (
          <div className={s.urlRow}>
            <input
              className={s.urlInput}
              value={serverUrl}
              onChange={e => setServerUrl(e.target.value)}
              placeholder={landingContent.actions.serverUrlPlaceholder}
            />
          </div>
        )}
      </div>

      <footer className={s.footer}>
        <span className={s.teamName}>{brand.teamName}</span>
        <span className={s.footerDot}>·</span>
        <span className={s.footerTagline}>{brand.tagline}</span>
      </footer>
    </div>
  )
}
