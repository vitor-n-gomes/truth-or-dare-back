import { CategoryRepository } from "App/Repositories/CategoryRepository"
import { CategoryContract } from "./Interfaces/CategoryContract"

export class ShowCategoryUseCase {

    constructor(private categoryRepository: CategoryRepository) {}
  
    async execute(id: string): Promise<CategoryContract | null> {

      const result = await this.categoryRepository.show(id)

      return result;
      
    }
  }
  
