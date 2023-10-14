import { test } from '@japa/runner'
import { InMemoryUserRepository } from 'App/Repositories/InMemory/InMemoryUserRepository'
import { CreateUserUseCase } from 'App/UseCases/User/CreateUserUseCase'
import { UserContract } from 'App/UseCases/User/Interfaces/UserContract'
import { DeleteUserUseCase } from 'App/UseCases/User/DeleteUserUseCase'
import { makeUser } from '../factory/make-user'

let repository: InMemoryUserRepository
let sut: DeleteUserUseCase
let userId: string | undefined
let user: UserContract

test.group('Delete User Use Case', (group) => {
  group.setup(async () => {
    repository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(repository)

    const createUseCase = new CreateUserUseCase(repository)

    user =  makeUser()

    const { id } = await createUseCase.execute({ user })

    userId = id
  })

  test('Deleting a user', async ({ assert }) => {
    const result = await sut.execute({ id: userId })

    assert.exists(result.message)
  })

  test('Deleting a user that does not exist', async ({ assert }) => {
    try {
      await sut.execute({ id: userId })

      assert.fail('Expected BadRequestException but got success')
    } catch (error) {
      assert.exists(error.message)
    }
  })
})
