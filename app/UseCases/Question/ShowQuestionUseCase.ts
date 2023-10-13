import { QuestionRepository } from "App/Repositories/QuestionRepository"
import { QuestionContract } from "./Interfaces/QuestionContract"

export class ShowQuestionUseCase {

    constructor(private questionRepository: QuestionRepository) {}
  
    async execute(id: string): Promise<QuestionContract | null> {

      const result = await this.questionRepository.show(id)

      return result;
      
    }
  }
  
