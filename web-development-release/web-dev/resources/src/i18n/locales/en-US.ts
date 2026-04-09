import type { LandingTranslations } from '../types'

export const enUS: LandingTranslations = {
  landing: {
    subtitle: 'AI-Native Generative Knowledge Engine',
    tagline: 'Maintain once, generate everywhere.',
    card: {
      kicker: 'Get Started',
      title: 'Make work knowledge maintainable, reusable, and generative.',
      body: 'Structure knowledge into reusable modules — each independently maintainable, loaded on-demand by AI, generating code directly. Open a project and step into the module graph.',
    },
    actions: {
      connectServer: 'Cloud Preview',
      openFolder: 'Open Local ArchUI Project',
      showServerUrl: 'Show server URL',
      hideServerUrl: 'Hide server URL',
      serverUrlPlaceholder: 'http://localhost:3001',
    },
    highlights: [
      {
        icon: '⚡',
        title: 'One-Click Skills',
        desc: 'Turn knowledge docs into reusable, interconnected Skills modules',
      },
      {
        icon: '📐',
        title: 'Docs as Orchestration',
        desc: 'Orchestrate knowledge modules like code — edit Skills, edit code',
      },
      {
        icon: '🏪',
        title: 'Module Hub',
        desc: 'Publish, discover, swap, compose — npm for Skills modules',
      },
    ],
    brand: {
      tagline: 'Make knowledge sustainably valuable.',
    },
    logoAlt: 'ArchUI coral tree icon',
  },
}
