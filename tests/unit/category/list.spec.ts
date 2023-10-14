import { test } from '@japa/runner'
import { InMemoryCategoryRepository } from 'App/Repositories/InMemory/InMemoryCategoryRepository'
import { CreateCategoryUseCase } from 'App/UseCases/Category/CreateCategoryUseCase'
import { CategoryContract } from 'App/UseCases/Category/Interfaces/CategoryContract'
import { ListCategoryUseCase } from 'App/UseCases/Category/ListCategoryUseCase'
import { makeCategory } from '../factory/make-category'

let repository: InMemoryCategoryRepository
let sut: ListCategoryUseCase
let category: CategoryContract

test.group('List Categories Use Case', (group) => {

  group.setup(async () => {
    
    repository = new InMemoryCategoryRepository()
    sut = new ListCategoryUseCase(repository)

    const createUseCase = new CreateCategoryUseCase(repository)

    for (let index = 0; index <= 10; index++) {

      category = makeCategory({});

      await createUseCase.execute({ category })
    
    }

   
  })

  test('List categories', async ({ assert }) => {
    const result = await sut.execute()

    assert.isArray(result)
  })
})
