import { test } from '@japa/runner'
import { InMemoryQuestionRepository } from 'App/Repositories/InMemory/InMemoryQuestionRepository'
import { CreateQuestionUseCase } from 'App/UseCases/Question/CreateQuestionUseCase'

import { makeQuestion } from '../factory/make-question'

let repository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

test.group('Create Question Use Case', (group) => {
  group.each.setup(() => {
    repository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(repository)
  })

  test('Creating a new question', async ({ assert }) => {

    const question = makeQuestion({})

    const result = await sut.execute({ question })

    assert.exists(result.id)
  })
})
