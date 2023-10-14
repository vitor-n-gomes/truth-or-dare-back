import { test } from '@japa/runner'
import { InMemoryQuestionRepository } from 'App/Repositories/InMemory/InMemoryQuestionRepository'
import { CreateQuestionUseCase } from 'App/UseCases/Question/CreateQuestionUseCase'
import { QuestionContract } from 'App/UseCases/Question/Interfaces/QuestionContract'
import { ListQuestionsUseCase } from 'App/UseCases/Question/ListQuestionsUseCase'
import { randomUUID } from 'node:crypto'
import { makeQuestion } from '../factory/make-question'

let repository: InMemoryQuestionRepository
let sut: ListQuestionsUseCase
let question: QuestionContract

test.group('List Categories Use Case', (group) => {
  group.setup(async () => {
    repository = new InMemoryQuestionRepository()
    sut = new ListQuestionsUseCase(repository)

    const createUseCase = new CreateQuestionUseCase(repository)

    question = makeQuestion({})

    await createUseCase.execute({ question })
  })

  test('List categories', async ({ assert }) => {
    const result = await sut.execute()

    assert.isArray(result)
  })
})
