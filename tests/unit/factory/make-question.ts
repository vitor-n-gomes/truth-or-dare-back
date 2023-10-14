import { QuestionContract } from 'App/UseCases/Question/Interfaces/QuestionContract'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function makeQuestion(parameters: {userId?: string, typeQuestion?: 'truth' | 'dare'}) {

  const { userId, typeQuestion } = parameters;

  const generateRandomType = () => Math.random() < 0.5 ? 'truth' : 'dare';

  const question: QuestionContract = {
    userid: userId ??  randomUUID(),
    description: faker.lorem.words(20),
    status: true,
    type: typeQuestion ?? generateRandomType()
  }

  return question
}
