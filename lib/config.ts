export const CONFIG = {
  // Rate limits (requests per minute)
  rateLimits: {
    enabled: true, // Flag to enable/disable rate limiting
    search: 10,
    contentFetch: 20,
    reportGeneration: 5,
    agentOptimizations: 10,
  },

  // Search settings
  search: {
    resultsPerPage: 10,
    maxSelectableResults: 3,
    provider: 'google' as 'google' | 'bing' | 'exa', // Default search provider
    safeSearch: {
      google: 'active' as 'active' | 'off',
      bing: 'moderate' as 'moderate' | 'strict' | 'off',
    },
    market: 'en-US',
  },

  // AI Platform settings
  platforms: {
    google: {
      enabled: true,
      models: {
        'gemini-flash': {
          enabled: true,
          label: 'Gemini Flash',
        },
        'gemini-flash-thinking': {
          enabled: true,
          label: 'Gemini Flash Thinking',
        },
        'gemini-exp': {
          enabled: false,
          label: 'Gemini Exp',
        },
      },
    },
    ollama: {
      enabled: true,
      models: {
        'deepseek-r1:1.5b': {
          enabled: true,
          label: 'DeepSeek R1 1.5B',
        },
      },
    },
    openai: {
      enabled: true,
      models: {
        'gpt-4o': {
          enabled: true,
          label: 'GPT-4o',
        },
        'o1-mini': {
          enabled: true,
          label: 'o1-mini',
        },
        'o1-preview': {
          enabled: true,
          label: 'o1-preview',
        },
      },
    },
    anthropic: {
      enabled: true,
      models: {
        'claude-3-7-sonnet-latest': {
          enabled: true,
          label: 'Claude 3.7 Sonnet',
        },
        'claude-3-5-haiku-latest': {
          enabled: true,
          label: 'Claude 3.5 Haiku',
        },
      },
    },
    deepseek: {
      enabled: true,
      models: {
        chat: {
          enabled: true,
          label: 'Chat',
        },
        reasoner: {
          enabled: true,
          label: 'Reasoner',
        },
      },
    },
    openrouter: {
      enabled: true,
      models: {
        'openrouter/auto': {
          enabled: true,
          label: 'Auto',
        },
      },
    },
  },
} as const
