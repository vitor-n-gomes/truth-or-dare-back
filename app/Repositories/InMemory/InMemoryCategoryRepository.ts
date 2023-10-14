import {
  CategoryContract,
  CreateCategoryContract,
  UpdateCategoryContract,
  DeleteCategoryContract,
} from 'App/UseCases/Category/Interfaces/CategoryContract'

import { CategoryRepository } from '../CategoryRepository'
import BadRequestException from 'App/Exceptions/BadRequestException'
import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'

export class InMemoryCategoryRepository implements CategoryRepository {
  public items: CategoryContract[] = []

  async list(): Promise<CategoryContract[]> {
    return this.items
  }

  async show(id: string): Promise<CategoryContract | null> {
    const item = this.items.find((item) => item.id === id)
    return item ?? null
  }

  async create(data: CreateCategoryContract): Promise<CategoryContract> {
    const newCategory = {
      ...data.category,
      id: randomUUID(),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }
    this.items.push(newCategory)
    return newCategory
  }

  async update(data: UpdateCategoryContract): Promise<CategoryContract> {
    const index = this.items.findIndex((item) => item.id === data.id)
    if (index === -1) {
      throw new BadRequestException('This Category does not exist', 409)
    }

    const updatedCategory = {
      ...this.items[index],
      ...data.category,
      id: data.id,
      updatedAt: DateTime.now(),
    }
    this.items[index] = updatedCategory
    return updatedCategory
  }

  async delete(data: DeleteCategoryContract): Promise<{ message: string }> {
    const index = this.items.findIndex((item) => item.id === data.id)
    if (index === -1) {
      throw new BadRequestException('This Category does not exist', 404)
    }

    this.items.splice(index, 1)
    return { message: 'Category has been deleted successfully' }
  }
}
