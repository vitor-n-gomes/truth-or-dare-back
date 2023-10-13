import { CategoryRepository } from "App/Repositories/CategoryRepository"
import { CategoryContract, UpdateCategoryContract } from "./Interfaces/CategoryContract"


export class UpdateCategoryUseCase {

    constructor(private categoryRepository: CategoryRepository) {}
  
    async execute(data: UpdateCategoryContract): Promise<CategoryContract> {

      const category = await this.categoryRepository.update(data);

      return category;
      
    }
  }
  
