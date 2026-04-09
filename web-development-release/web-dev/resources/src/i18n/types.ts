export interface HighlightItem {
  icon: string
  title: string
  desc: string
}

export interface LandingTranslations {
  landing: {
    subtitle: string
    tagline: string
    card: {
      kicker: string
      title: string
      body: string
    }
    actions: {
      connectServer: string
      openFolder: string
      showServerUrl: string
      hideServerUrl: string
      serverUrlPlaceholder: string
    }
    highlights: readonly [HighlightItem, HighlightItem, HighlightItem]
    cli: {
      kicker: string
      title: string
      body: string
      heroCommand: string
      install: {
        label: string
        command: string
      }
      copied: string
    }
    brand: {
      tagline: string
    }
    logoAlt: string
  }
}
