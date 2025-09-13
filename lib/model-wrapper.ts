import { ModelManager } from './model-manager'

export class ModelWrapper {
  private static instance: ModelWrapper
  private modelManager = ModelManager.getInstance()

  static getInstance(): ModelWrapper {
    if (!ModelWrapper.instance) {
      ModelWrapper.instance = new ModelWrapper()
    }
    return ModelWrapper.instance
  }

  async generateReport(
    systemPrompt: string,
    platformModel: string
  ): Promise<{ content: string; modelUsed: string; error?: string }> {
    return this.modelManager.generateWithFallback(systemPrompt, platformModel)
  }

  getAvailableModels(): string[] {
    return this.modelManager.getAvailableModels()
  }

  getModelStatus(): Record<string, { available: boolean; lastError?: string }> {
    return this.modelManager.getModelStatus()
  }
}
