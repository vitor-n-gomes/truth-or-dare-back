import { QuestionRepository } from 'App/Repositories/QuestionRepository'
import { QuestionContract, UpdateQuestionContract } from './Interfaces/QuestionContract'

export class UpdateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(data: UpdateQuestionContract): Promise<QuestionContract> {
    const question = await this.questionRepository.update(data)

    return question
  }
}
