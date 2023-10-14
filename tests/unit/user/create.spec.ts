import { test } from '@japa/runner'
import { InMemoryUserRepository } from 'App/Repositories/InMemory/InMemoryUserRepository'
import { CreateUserUseCase } from 'App/UseCases/User/CreateUserUseCase'

import { makeUser } from '../factory/make-user'

let repository: InMemoryUserRepository
let sut: CreateUserUseCase

test.group('Create User Use Case', (group) => {
  group.each.setup(() => {
    repository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(repository)
  })

  test('Creating a new user', async ({ assert }) => {

    const user = makeUser()
    
    const result = await sut.execute({ user })

    assert.exists(result.id)
  })
})
