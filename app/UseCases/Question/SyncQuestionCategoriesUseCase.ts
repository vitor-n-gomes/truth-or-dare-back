import { QuestionRepository } from 'App/Repositories/QuestionRepository'
import { SyncQuestionWithCategoriesContract } from './Interfaces/QuestionContract'

export class SyncQuestionCategoriesUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(data: SyncQuestionWithCategoriesContract): Promise<{ message: string | null }> {
    const result = await this.questionRepository.sync(data)

    return result
  }
}
