import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { LandingTranslations } from './types'
import { zhCN } from './locales/zh-CN'
import { enUS } from './locales/en-US'

export type Locale = 'zh-CN' | 'en-US'
export type { LandingTranslations }

const STORAGE_KEY = 'archui-locale'

const translations: Record<Locale, LandingTranslations> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-CN'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'zh-CN' || stored === 'en-US') return stored
  const browserLang = navigator.language
  return browserLang.startsWith('zh') ? 'zh-CN' : 'en-US'
}

interface I18nContextValue {
  locale: Locale
  t: LandingTranslations
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState(prev => {
      const next = prev === 'zh-CN' ? 'en-US' : 'zh-CN'
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const value: I18nContextValue = {
    locale,
    t: translations[locale],
    setLocale,
    toggleLocale,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
