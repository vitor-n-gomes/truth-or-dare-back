import { test } from '@japa/runner'
import { InMemoryCategoryRepository } from 'App/Repositories/InMemory/InMemoryCategoryRepository'
import { CreateCategoryUseCase } from 'App/UseCases/Category/CreateCategoryUseCase'

import { makeCategory } from '../factory/make-category'

let repository: InMemoryCategoryRepository
let sut: CreateCategoryUseCase

test.group('Create Category Use Case', (group) => {
  group.each.setup(() => {
    repository = new InMemoryCategoryRepository()
    sut = new CreateCategoryUseCase(repository)
  })

  test('Creating a new category', async ({ assert }) => {

    const category = makeCategory({})
    
    const result = await sut.execute({ category })

    assert.exists(result.id)
  })
})
