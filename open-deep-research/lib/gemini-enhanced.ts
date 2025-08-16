import { 
  geminiFlashThinkingModel, 
  geminiModel, 
  geminiFlashModel 
} from './gemini'
import { generateWithModel } from './models'

export class GeminiError extends Error {
  constructor(
    message: string,
    public code: string,
    public retryable: boolean = false
  ) {
    super(message)
    this.name = 'GeminiError'
  }
}

export interface GeminiOptions {
  retries?: number
  delay?: number
  timeout?: number
  fallbackEnabled?: boolean
}

export async function generateWithGeminiEnhanced(
  systemPrompt: string,
  model: string,
  options: GeminiOptions = {}
): Promise<string> {
  const {
    retries = 3,
    delay = 1000,
    timeout = 30000,
    fallbackEnabled = true
  } = options

  let lastError: Error | null = null
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new GeminiError('Request timeout', 'TIMEOUT', true)), timeout)
      })

      // Create the actual API call
      const apiCall = async () => {
        let result
        if (model === 'gemini-flash-thinking') {
          result = await geminiFlashThinkingModel.generateContent(systemPrompt)
        } else if (model === 'gemini-exp') {
          result = await geminiModel.generateContent(systemPrompt)
        } else {
          result = await geminiFlashModel.generateContent(systemPrompt)
        }
        
        const text = result.response.text()
        if (!text) {
          throw new GeminiError('No response content from Gemini', 'NO_CONTENT', false)
        }
        return text
      }

      // Race between timeout and API call
      return await Promise.race([apiCall(), timeoutPromise])
      
    } catch (error) {
      lastError = error as Error
      
      // Handle specific error types
      if (error instanceof GeminiError) {
        if (!error.retryable || attempt === retries) {
          throw error
        }
      } else if (error instanceof Error) {
        // Network errors
        if (error.message.includes('fetch failed') || 
            error.message.includes('network') || 
            error.message.includes('ECONNREFUSED')) {
          
          console.warn(`Gemini API network error (attempt ${attempt + 1}/${retries + 1}):`, error.message)
          
          if (attempt < retries) {
            const backoffDelay = delay * Math.pow(2, attempt) + Math.random() * 1000
            await new Promise(resolve => setTimeout(resolve, backoffDelay))
            continue
          }
        } else {
          // Non-retryable error
          throw new GeminiError(error.message, 'API_ERROR', false)
        }
      }
    }
  }
  
  throw new GeminiError(
    `Gemini API failed after ${retries + 1} attempts: ${lastError?.message || 'Unknown error'}`,
    'MAX_RETRIES',
    false
  )
}

// Fallback model mapping
export const FALLBACK_MODELS: Record<string, string[]> = {
  'google__gemini-flash': [
    'openai__gpt-4o-mini',
    'anthropic__claude-3-haiku',
    'deepseek__deepseek-chat'
  ],
  'google__gemini-pro': [
    'openai__gpt-4o',
    'anthropic__claude-3-sonnet',
    'deepseek__deepseek-chat'
  ],
  'google__gemini-flash-thinking': [
    'openai__gpt-4o',
    'anthropic__claude-3-sonnet',
    'deepseek__deepseek-reasoner'
  ],
  'google__gemini-exp': [
    'openai__gpt-4o',
    'anthropic__claude-3-sonnet',
    'deepseek__deepseek-chat'
  ]
}

export async function generateWithFallback(
  systemPrompt: string,
  platformModel: string,
  options: GeminiOptions = {}
): Promise<{ content: string; modelUsed: string }> {
  const [platform] = platformModel.split('__')
  
  if (platform === 'google') {
    try {
      const content = await generateWithGeminiEnhanced(systemPrompt, platformModel.split('__')[1], options)
      return { content, modelUsed: platformModel }
    } catch (error) {
      if (options.fallbackEnabled !== false && FALLBACK_MODELS[platformModel]) {
        console.warn(`Gemini failed, trying fallback models:`, error)
        
        for (const fallbackModel of FALLBACK_MODELS[platformModel]) {
          try {
            const content = await generateWithModel(systemPrompt, fallbackModel)
            return { content, modelUsed: fallbackModel }
          } catch (fallbackError) {
            console.warn(`Fallback model ${fallbackModel} also failed:`, fallbackError)
            continue
          }
        }
      }
      throw error
    }
  }
  
  // For non-Google models, use regular generation
  const content = await generateWithModel(systemPrompt, platformModel)
  return { content, modelUsed: platformModel }
}
