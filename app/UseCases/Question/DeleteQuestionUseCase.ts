import { QuestionRepository } from "App/Repositories/QuestionRepository"
import { DeleteQuestionContract } from "./Interfaces/QuestionContract"


export class DeleteQuestionUseCase {

    constructor(private questionRepository: QuestionRepository) {}
  
    async execute(data: DeleteQuestionContract): Promise<{message: string}> {

      const result = await this.questionRepository.delete(data);

      return result;
      
    }
  }
  
