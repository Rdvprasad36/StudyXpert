import { generateWithModel } from './models'

export interface ModelConfig {
  name: string
  platform: string
  fallback?: string[]
  requiresKey?: boolean
  maxTokens?: number
}

export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  'google__gemini-pro': {
    name: 'Gemini Pro',
    platform: 'google',
    fallback: ['google__gemini-flash', 'ollama__llama2'],
    requiresKey: false,
  },
  'google__gemini-flash': {
    name: 'Gemini Flash',
    platform: 'google',
    fallback: ['ollama__llama2'],
    requiresKey: false,
  },
  'google__gemini-flash-thinking': {
    name: 'Gemini Flash Thinking',
    platform: 'google',
    fallback: ['google__gemini-flash', 'ollama__llama2'],
    requiresKey: false,
  },
  'openai__gpt-4': {
    name: 'GPT-4',
    platform: 'openai',
    fallback: ['openai__gpt-3.5-turbo', 'google__gemini-pro', 'ollama__llama2'],
    requiresKey: true,
  },
  'openai__gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    platform: 'openai',
    fallback: ['google__gemini-pro', 'ollama__llama2'],
    requiresKey: true,
  },
  'openai__o1-mini': {
    name: 'o1-mini',
    platform: 'openai',
    fallback: ['openai__gpt-4', 'google__gemini-pro'],
    requiresKey: true,
  },
  'openai__o1-preview': {
    name: 'o1-preview',
    platform: 'openai',
    fallback: ['openai__gpt-4', 'google__gemini-pro'],
    requiresKey: true,
  },
  'anthropic__claude-3-sonnet': {
    name: 'Claude 3 Sonnet',
    platform: 'anthropic',
    fallback: ['google__gemini-pro', 'ollama__llama2'],
    requiresKey: true,
  },
  'deepseek__deepseek-chat': {
    name: 'DeepSeek Chat',
    platform: 'deepseek',
    fallback: ['google__gemini-pro', 'ollama__llama2'],
    requiresKey: true,
  },
  'deepseek__deepseek-reasoner': {
    name: 'DeepSeek Reasoner',
    platform: 'deepseek',
    fallback: ['deepseek__deepseek-chat', 'google__gemini-pro'],
    requiresKey: true,
  },
  'ollama__llama2': {
    name: 'Llama 2 (Local)',
    platform: 'ollama',
    requiresKey: false,
    maxTokens: 2000,
  },
  'ollama__mistral': {
    name: 'Mistral (Local)',
    platform: 'ollama',
    requiresKey: false,
    maxTokens: 2000,
  },
  'openrouter__auto': {
    name: 'OpenRouter Auto',
    platform: 'openrouter',
    fallback: ['google__gemini-pro', 'ollama__llama2'],
    requiresKey: true,
  },
}

export class ModelManager {
  private static instance: ModelManager
  private modelHealth: Map<string, boolean> = new Map()
  private lastUsed: Map<string, number> = new Map()

  static getInstance(): ModelManager {
    if (!ModelManager.instance) {
      ModelManager.instance = new ModelManager()
    }
    return ModelManager.instance
  }

  async generateWithFallback(
    systemPrompt: string,
    preferredModel: string,
    maxRetries: number = 3
  ): Promise<{ content: string; modelUsed: string; error?: string }> {
    const modelsToTry = this.getModelChain(preferredModel)
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      for (const model of modelsToTry) {
        try {
          // Skip if model requires API key and none is configured
          if (MODEL_CONFIGS[model]?.requiresKey && !this.hasApiKey(model)) {
            console.warn(`Skipping ${model} - no API key configured`)
            continue
          }

          console.log(`Attempting to use model: ${model}`)
          const content = await generateWithModel(systemPrompt, model)
          
          // Mark model as healthy
          this.modelHealth.set(model, true)
          this.lastUsed.set(model, Date.now())
          
          return { content, modelUsed: model }
          
        } catch (error) {
          console.error(`Error with model ${model}:`, error)
          this.modelHealth.set(model, false)
          
          // If this is the last model in chain, return error
          if (model === modelsToTry[modelsToTry.length - 1]) {
            return {
              content: '',
              modelUsed: '',
              error: this.getErrorMessage(error, model)
            }
          }
        }
      }
      
      // Wait before retry
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
      }
    }
    
    return {
      content: '',
      modelUsed: '',
      error: 'All models failed after maximum retries'
    }
  }

  private getModelChain(preferredModel: string): string[] {
    const chain = [preferredModel]
    let current = preferredModel
    
    while (MODEL_CONFIGS[current]?.fallback?.length) {
      const fallback = MODEL_CONFIGS[current].fallback![0]
      if (!chain.includes(fallback)) {
        chain.push(fallback)
        current = fallback
      } else {
        break // Prevent infinite loops
      }
    }
    
    return chain
  }

  private hasApiKey(model: string): boolean {
    const config = MODEL_CONFIGS[model]
    if (!config?.requiresKey) return true
    
    switch (config.platform) {
      case 'openai':
        return !!process.env.OPENAI_API_KEY
      case 'anthropic':
        return !!process.env.ANTHROPIC_API_KEY
      case 'deepseek':
        return !!process.env.DEEPSEEK_API_KEY
      case 'openrouter':
        return !!process.env.OPENROUTER_API_KEY
      default:
        return false
    }
  }

  private getErrorMessage(error: any, model: string): string {
    if (error?.status === 429) {
      return `Rate limit exceeded for ${model}. Please check your API quota.`
    } else if (error?.status === 402) {
      return `Insufficient credits for ${model}. Please add funds to your account.`
    } else if (error?.status === 404) {
      return `Model ${model} not found or not accessible.`
    } else if (error?.code === 'insufficient_quota') {
      return `API quota exceeded for ${model}. Please upgrade your plan.`
    } else {
      return `Error with ${model}: ${error?.message || 'Unknown error'}`
    }
  }

  getAvailableModels(): string[] {
    return Object.keys(MODEL_CONFIGS).filter(model => {
      const config = MODEL_CONFIGS[model]
      return !config.requiresKey || this.hasApiKey(model)
    })
  }

  getModelStatus(): Record<string, { available: boolean; lastError?: string }> {
    const status: Record<string, { available: boolean; lastError?: string }> = {}
    
    Object.keys(MODEL_CONFIGS).forEach(model => {
      const config = MODEL_CONFIGS[model]
      const hasKey = !config.requiresKey || this.hasApiKey(model)
      const isHealthy = this.modelHealth.get(model) !== false
      
      status[model] = {
        available: hasKey && isHealthy,
        lastError: !hasKey ? 'API key not configured' : 
                   !isHealthy ? 'Recent API error' : undefined
      }
    })
    
    return status
  }
}
