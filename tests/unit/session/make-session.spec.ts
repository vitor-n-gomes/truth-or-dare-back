import { test } from '@japa/runner'
import { InMemoryUserRepository } from 'App/Repositories/InMemory/InMemoryUserRepository'
import RegisterUseCase from 'App/UseCases/Session/RegisterUseCase'
import { makeUser } from '../factory/make-user'
import AuthenticateUseCase from 'App/UseCases/Session/AuthenticateUseCase'

let repository: InMemoryUserRepository
let register: RegisterUseCase
let sut: AuthenticateUseCase
let user = makeUser()

const { password } = user

test.group('It will test the process of creating a new session ', async (group) => {
  group.setup(() => {
    repository = new InMemoryUserRepository()

    register = new RegisterUseCase({
      userRepository: repository,
    })

    sut = new AuthenticateUseCase({ userRepository: repository })
  })

  test('Should be able to create a new user', async ({ assert }) => {
    user = await register.execute({ user })

    assert.exists(user.id)
  })

  test('Should be able to create a new session', async ({ assert }) => {
    try {
      const item = await sut.execute({
        email: user.email,
        password,
      })

      assert.isObject(item)
    } catch (error) {
      assert.ok('The test has failed because it has thrown an exception')
    }
  })

  test('It should fail because the password provided is incorrect', async ({ assert }) => {
    try {
      await sut.execute({
        email: user.email,
        password: password + '55',
      })

      assert.fail('The test has failed because the password provided is incorrect')
    } catch (error) {
      assert.ok('The test was successful because the user password was incorrect')
    }
  })
})
