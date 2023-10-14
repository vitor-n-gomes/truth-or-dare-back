import { test } from '@japa/runner'
import { InMemoryQuestionRepository } from 'App/Repositories/InMemory/InMemoryQuestionRepository'
import { SyncQuestionCategoriesUseCase } from 'App/UseCases/Question/SyncQuestionCategoriesUseCase'
import { randomUUID } from 'node:crypto'

let repository: InMemoryQuestionRepository
let sut: SyncQuestionCategoriesUseCase

test.group('Sync Question With Categories UseCase', (group) => {
  group.each.setup(() => {
    repository = new InMemoryQuestionRepository()
    sut = new SyncQuestionCategoriesUseCase(repository)
  })

  test('Sync', async ({ assert }) => {
    try {
      const id = randomUUID()

      const result = await sut.execute({
        questionid: id,
        categories: [
          {
            id: randomUUID(),
          },
        ],
      })

      assert.exists(result.message)
    } catch (error) {
      assert.fail('Expected BadRequestException but got success')
    }
  })
})
