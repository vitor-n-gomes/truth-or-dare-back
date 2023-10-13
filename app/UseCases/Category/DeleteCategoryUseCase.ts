import { CategoryRepository } from "App/Repositories/CategoryRepository"
import { DeleteCategoryContract } from "./Interfaces/CategoryContract"


export class DeleteCategoryUseCase {

    constructor(private categoryRepository: CategoryRepository) {}
  
    async execute(data: DeleteCategoryContract): Promise<{message: string}> {

      const result = await this.categoryRepository.delete(data);

      return result;
      
    }
  }
  
