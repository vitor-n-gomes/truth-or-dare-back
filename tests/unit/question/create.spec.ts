import { test } from '@japa/runner'
import { InMemoryQuestionRepository } from 'App/Repositories/InMemory/InMemoryQuestionRepository'
import { CreateQuestionUseCase } from 'App/UseCases/Question/CreateQuestionUseCase'

import { randomUUID } from 'node:crypto'

let repository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

test.group('Create Question Use Case', (group) => {
  group.each.setup(() => {
    repository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(repository)
  })

  test('Creating a new question', async ({ assert }) => {
    const id = randomUUID()

    const question = {
      userid: id,
      description: 'What is your favorite food?',
      status: true,
      type: 1,
    }

    const result = await sut.execute({ question })

    assert.exists(result.id)
  })
})
