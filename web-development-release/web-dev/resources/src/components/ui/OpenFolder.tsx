import { useState } from 'react'
import { openDirectory } from '../../filesystem/fsa'
import serverAdapter from '../../filesystem/serverAdapter'
import { workspaceContent } from '../../generated/workspace-content.generated'
import { useCanvasStore } from '../../store/canvas'
import s from './OpenFolder.module.css'

export function OpenFolder() {
  const landingContent = workspaceContent.landing
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
        <svg className={s.logoMark} viewBox="0 0 332 332" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M249.418 197.418C278.137 197.418 301.418 220.699 301.418 249.418C301.418 278.137 278.137 301.418 249.418 301.418C228.871 301.418 211.109 289.501 202.663 272.202C200.17 272.932 197.618 273.651 195.017 274.348C192.412 275.046 189.839 275.7 187.312 276.315C187.395 277.519 187.438 278.734 187.438 279.959C187.438 308.678 164.157 331.959 135.438 331.959C106.72 331.959 83.4387 308.678 83.4385 279.959C83.4385 251.24 106.72 227.959 135.438 227.959C155.985 227.959 173.747 239.875 182.192 257.174C184.686 256.444 187.238 255.726 189.84 255.029C192.444 254.331 195.017 253.676 197.544 253.061C197.461 251.857 197.418 250.642 197.418 249.418C197.418 220.699 220.699 197.418 249.418 197.418ZM82.541 30.541C111.26 30.5412 134.541 53.8223 134.541 82.541C134.541 111.26 111.26 134.541 82.541 134.541C81.3162 134.541 80.1011 134.497 78.8975 134.414C78.2817 136.941 77.6276 139.515 76.9297 142.119C76.2327 144.72 75.5136 147.272 74.7842 149.766C92.0829 158.211 104 175.974 104 196.521C104 225.239 80.7186 248.521 52 248.521C23.2814 248.521 0.000329901 225.239 0 196.521C0 167.802 23.2812 144.521 52 144.521C53.2246 144.521 54.4392 144.563 55.6426 144.646C56.2583 142.119 56.9135 139.547 57.6113 136.942C58.3084 134.341 59.0264 131.789 59.7559 129.295C42.4576 120.849 30.5412 103.087 30.541 82.541C30.541 53.8222 53.8222 30.541 82.541 30.541ZM196.52 0C225.238 0 248.52 23.2812 248.52 52C248.52 62.7785 245.239 72.7905 239.624 81.0938C241.504 82.8899 243.404 84.7426 245.31 86.6484C247.215 88.554 249.067 90.4533 250.863 92.333C259.166 86.7176 269.18 83.4386 279.958 83.4385C308.677 83.4385 331.958 106.72 331.958 135.438C331.958 164.157 308.677 187.438 279.958 187.438C251.239 187.438 227.958 164.157 227.958 135.438C227.958 124.66 231.237 114.647 236.853 106.344C234.973 104.548 233.073 102.696 231.168 100.79C229.262 98.8842 227.409 96.9845 225.613 95.1045C217.31 100.72 207.298 104 196.52 104C167.801 104 144.52 80.7187 144.52 52C144.52 23.2813 167.801 0.000197941 196.52 0Z" fill="var(--brand-honey)"/>
        </svg>
        <div className={s.logo}>{landingContent.brandWordmark}</div>
        <div className={s.subtitle}>{landingContent.subtitle}</div>
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
    </div>
  )
}
