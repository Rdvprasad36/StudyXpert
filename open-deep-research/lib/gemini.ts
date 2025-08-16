import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const generationJsonConfig = {
  temperature: 1,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
}

const generationPlainTextConfig = {
  temperature: 1,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
]

const DEFAULT_TIMEOUT = 30000 // 30 seconds
const MAX_RETRIES = 2

async function generateContentWithRetry(model: any, prompt: string) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)

      const result = await model.generateContent(prompt, {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      return result
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        throw error
      }
      // Exponential backoff before retrying
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      )
    }
  }
}

export const geminiFlashLiteModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-lite-preview-02-05',
  safetySettings,
  generationConfig: generationJsonConfig,
})

export const geminiFlashModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  safetySettings,
  generationConfig: generationJsonConfig,
})

export const geminiFlashThinkingModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-thinking-exp-01-21',
  safetySettings,
  generationConfig: generationPlainTextConfig,
})

export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-pro-exp-02-05',
  safetySettings,
  generationConfig: generationJsonConfig,
})

export async function generateContentWithGeminiModel(
  model: any,
  prompt: string
) {
  return generateContentWithRetry(model, prompt)
}
