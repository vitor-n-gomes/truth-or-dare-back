import { test } from '@japa/runner'
import { InMemoryUserRepository } from 'App/Repositories/InMemory/InMemoryUserRepository'
import { CreateUserUseCase } from 'App/UseCases/User/CreateUserUseCase'
import { UserContract } from 'App/UseCases/User/Interfaces/UserContract'
import { UpdateUserUseCase } from 'App/UseCases/User/UpdateUserUseCase'
import { makeUser } from '../factory/make-user'

let repository: InMemoryUserRepository
let sut: UpdateUserUseCase
let userId: string | undefined
let user: UserContract

test.group('Update User Use Case', (group) => {
  group.each.setup(async () => {
    repository = new InMemoryUserRepository()
    sut = new UpdateUserUseCase(repository)

    const createUseCase = new CreateUserUseCase(repository)
    
    user = makeUser()

    const { id } = await createUseCase.execute({ user })

    userId = id
  })

  test('Updating a user', async ({ assert }) => {
    const newUser = makeUser()

    assert.exists(userId)

    const result = await sut.execute({ id: userId, user: newUser })

    assert.exists(result.id)
    assert.exists(result.updatedAt)
  })
})
