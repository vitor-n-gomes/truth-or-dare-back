import { QuestionRepository } from 'App/Repositories/QuestionRepository'
import { QuestionContract } from './Interfaces/QuestionContract'

export class ListQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(): Promise<QuestionContract[] | null> {
    const result = await this.questionRepository.list()

    return result
  }
}
