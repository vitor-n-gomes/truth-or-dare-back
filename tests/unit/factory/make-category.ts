import { CategoryContract } from 'App/UseCases/Category/Interfaces/CategoryContract'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function makeCategory(parameters: {userId?: string}) {
  const { userId } = parameters;

  const category: CategoryContract = {
    userid: userId ??  randomUUID(),
    description: faker.lorem.word(5),
    status: true
  }

  return category
}
