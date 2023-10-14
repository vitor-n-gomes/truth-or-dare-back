import { CategoryRepository } from 'App/Repositories/CategoryRepository'
import { CategoryContract, CreateCategoryContract } from './Interfaces/CategoryContract'

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(data: CreateCategoryContract): Promise<CategoryContract> {
    const category = await this.categoryRepository.create(data)

    return category
  }
}
