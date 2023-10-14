import { test } from '@japa/runner'
import { InMemoryUserRepository } from 'App/Repositories/InMemory/InMemoryUserRepository'
import { CreateUserUseCase } from 'App/UseCases/User/CreateUserUseCase'
import { UserContract } from 'App/UseCases/User/Interfaces/UserContract'
import { ListUserUseCase } from 'App/UseCases/User/ListUserUseCase'
import { makeUser } from '../factory/make-user'

let repository: InMemoryUserRepository
let sut: ListUserUseCase
let user: UserContract

test.group('List Categories Use Case', (group) => {

  group.setup(async () => {
    
    repository = new InMemoryUserRepository()
    sut = new ListUserUseCase(repository)

    const createUseCase = new CreateUserUseCase(repository)

    for (let index = 0; index <= 10; index++) {

      user = makeUser();

      await createUseCase.execute({ user })
    
    }

   
  })

  test('List categories', async ({ assert }) => {
    const result = await sut.execute()

    assert.isArray(result)
  })
})
