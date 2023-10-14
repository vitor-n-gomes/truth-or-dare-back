import { test } from '@japa/runner'
import { InMemoryCategoryRepository } from 'App/Repositories/InMemory/InMemoryCategoryRepository'
import { CreateCategoryUseCase } from 'App/UseCases/Category/CreateCategoryUseCase'
import { CategoryContract } from 'App/UseCases/Category/Interfaces/CategoryContract'
import { UpdateCategoryUseCase } from 'App/UseCases/Category/UpdateCategoryUseCase'
import { makeCategory } from '../factory/make-category'

let repository: InMemoryCategoryRepository
let sut: UpdateCategoryUseCase
let categoryId: string | undefined
let category: CategoryContract

test.group('Update Category Use Case', (group) => {
  group.each.setup(async () => {
    repository = new InMemoryCategoryRepository()
    sut = new UpdateCategoryUseCase(repository)

    const createUseCase = new CreateCategoryUseCase(repository)
    
    category = makeCategory({})

    const { id } = await createUseCase.execute({ category })

    categoryId = id
  })

  test('Updating a category', async ({ assert }) => {
    const newCategory = makeCategory({})

    assert.exists(categoryId)

    const result = await sut.execute({ id: categoryId, category: newCategory })

    assert.exists(result.id)
    assert.exists(result.updatedAt)
  })
})
