import { test } from '@japa/runner'
import { InMemoryUserRepository } from 'App/Repositories/InMemory/InMemoryUserRepository'
import RegisterUseCase from 'App/UseCases/Session/RegisterUseCase'
import { makeUser } from '../factory/make-user'

let repository: InMemoryUserRepository
let sut: RegisterUseCase
const user = makeUser()

test.group('Register a user through a session', (group) => {
  group.setup(() => {
    repository = new InMemoryUserRepository()

    sut = new RegisterUseCase({
      userRepository: repository,
    })
  })

  test('Should be able to create a new user', async ({ assert }) => {
    const result = await sut.execute({ user })

    assert.exists(result.id)
  })

  test('Should fail if the user already exist', async ({ assert }) => {
    try {
      await sut.execute({ user })

      assert.fail('The test has failed because the user already exists')
    } catch (error) {
      assert.ok(
        'The test was successful because the user already exists, and it is not possible to create a user with the same email address.'
      )
    }
  })
})
