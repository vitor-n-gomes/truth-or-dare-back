import { QuestionRepository } from 'App/Repositories/QuestionRepository'
import { QuestionContract, CreateQuestionContract } from './Interfaces/QuestionContract'

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(data: CreateQuestionContract): Promise<QuestionContract> {
    const question = await this.questionRepository.create(data)

    return question
  }
}
