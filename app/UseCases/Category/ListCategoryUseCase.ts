import { CategoryRepository } from "App/Repositories/CategoryRepository"
import { CategoryContract } from "./Interfaces/CategoryContract"

export class ListCategoryUseCase {

    constructor(private categoryRepository: CategoryRepository) {}
  
    async execute(): Promise<CategoryContract[] | null> {

      const result = await this.categoryRepository.list();

      return result;
      
    }
  }
  
