import { test } from '@japa/runner'
import { InMemoryUserRepository } from 'App/Repositories/InMemory/InMemoryUserRepository'
import RegisterUseCase from 'App/UseCases/Session/RegisterUseCase'
import { makeUser } from '../factory/make-user'
import GenerateResetPasswordTokenUseCase from 'App/UseCases/Session/GenerateResetPasswordTokenUseCase'

let repository: InMemoryUserRepository
let register: RegisterUseCase
let sut: GenerateResetPasswordTokenUseCase
let user = makeUser()
let expiresIn = 2

test.group('It will test the process of creating a token for reset password ', async (group) => {
  group.setup(() => {
    repository = new InMemoryUserRepository()

    register = new RegisterUseCase({
      userRepository: repository,
    })

    sut = new GenerateResetPasswordTokenUseCase({ userRepository: repository, expiresIn })
  })

  test('Should be able to create a new user', async ({ assert }) => {
    user = await register.execute({ user })

    assert.exists(user.id)
  })

  test('Should be able to generate a token', async ({ assert }) => {
    const item = await sut.execute({
      email: user.email,
    })

    const result = await repository.findByEmail(user.email)

    if (result) {
      assert.isNotEmpty(result.resetPasswordToken)
    }

    assert.isObject(item)
  })
})
