import { test } from '@japa/runner'
import { InMemoryQuestionRepository } from 'App/Repositories/InMemory/InMemoryQuestionRepository'
import { CreateQuestionUseCase } from 'App/UseCases/Question/CreateQuestionUseCase'
import { QuestionContract } from 'App/UseCases/Question/Interfaces/QuestionContract'
import { UpdateQuestionUseCase } from 'App/UseCases/Question/UpdateQuestionUseCase'

import { randomUUID } from 'node:crypto'

let repository: InMemoryQuestionRepository
let sut: UpdateQuestionUseCase
let questionId: string | undefined
let question: QuestionContract

test.group('Update Question Use Case', (group) => {
  group.each.setup(async () => {
    repository = new InMemoryQuestionRepository()
    sut = new UpdateQuestionUseCase(repository)

    const createUseCase = new CreateQuestionUseCase(repository)

    const userid = randomUUID()

    question = {
      userid: userid,
      description: 'What is your favorite food?',
      status: true,
      type: 1,
    }
    const { id } = await createUseCase.execute({ question })

    questionId = id
  })

  test('Updating a question', async ({ assert }) => {
    const newQuestion = {
      userid: randomUUID(),
      description: 'Send a picture showing your tongue for your mom?',
      status: true,
      type: 2,
    }

    assert.exists(questionId)

    const result = await sut.execute({ id: questionId, question: newQuestion })

    assert.exists(result.id)
    assert.exists(result.updatedAt)
    assert.notEqual(question.description, result.description)
  })
})
