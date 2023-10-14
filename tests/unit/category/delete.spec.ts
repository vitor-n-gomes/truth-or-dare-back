import { test } from '@japa/runner'
import { InMemoryCategoryRepository } from 'App/Repositories/InMemory/InMemoryCategoryRepository'
import { CreateCategoryUseCase } from 'App/UseCases/Category/CreateCategoryUseCase'
import { CategoryContract } from 'App/UseCases/Category/Interfaces/CategoryContract'
import { DeleteCategoryUseCase } from 'App/UseCases/Category/DeleteCategoryUseCase'
import { randomUUID } from 'node:crypto'

let repository: InMemoryCategoryRepository
let sut: DeleteCategoryUseCase
let categoryId: string | undefined
let category: CategoryContract

test.group('Delete Category Use Case', (group) => {
  group.setup(async () => {
    repository = new InMemoryCategoryRepository()
    sut = new DeleteCategoryUseCase(repository)

    const createUseCase = new CreateCategoryUseCase(repository)

    const userid = randomUUID()

    category = {
      userid: userid,
      description: 'Life & Experiences',
      status: true,
    }

    const { id } = await createUseCase.execute({ category })

    categoryId = id
  })

  test('Deleting a category', async ({ assert }) => {
    const result = await sut.execute({ id: categoryId })

    assert.exists(result.message)
  })

  test('Deleting a category that does not exist', async ({ assert }) => {
    try {
      await sut.execute({ id: categoryId })

      assert.fail('Expected BadRequestException but got success')
    } catch (error) {
      assert.exists(error.message)
    }
  })
})
