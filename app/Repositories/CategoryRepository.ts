import {
  CategoryContract,
  CreateCategoryContract,
  DeleteCategoryContract,
  UpdateCategoryContract,
} from 'App/UseCases/Category/Interfaces/CategoryContract'

export interface CategoryRepository {
  list(): Promise<CategoryContract[] | null>
  show(id: string): Promise<CategoryContract | null>
  create(data: CreateCategoryContract): Promise<CategoryContract>
  update(data: UpdateCategoryContract): Promise<CategoryContract>
  delete(data: DeleteCategoryContract): Promise<{ message: string }>
}
