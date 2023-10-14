import { test } from '@japa/runner'
import { setTimeout } from 'node:timers/promises'

import { InMemoryUserRepository } from 'App/Repositories/InMemory/InMemoryUserRepository'
import RegisterUseCase from 'App/UseCases/Session/RegisterUseCase';
import { makeUser } from '../factory/make-user';
import GenerateResetPasswordTokenUseCase from 'App/UseCases/Session/GenerateResetPasswordTokenUseCase';
import ValidateTokenUseCase from 'App/UseCases/Session/ValidateTokenUseCase';


let repository: InMemoryUserRepository
let register: RegisterUseCase;
let generateToken: GenerateResetPasswordTokenUseCase;
let sut: ValidateTokenUseCase;
let user = makeUser();
let expiresIn = 4;
let randomValue: string = '';


test.group('It will test the process of validate a reset password token ', async (group) => {

  group.setup(async () => {

    repository = new InMemoryUserRepository();

    register = new RegisterUseCase({
      userRepository: repository
    });

    generateToken = new GenerateResetPasswordTokenUseCase({ userRepository: repository, expiresIn });
    sut = new ValidateTokenUseCase({ userRepository: repository });

    user = await register.execute({ user });

    const item = await generateToken.execute({
      email: user.email
    });

    await repository.findByEmail(user.email);

    randomValue = item.randomValue;

  })


  test('Should be able to validate a reset password token', async ({ assert }) => {

    if (user.id) {

      const { statusToken } = await sut.execute({
        id: user.id,
        randomValue: randomValue
      });

      assert.equal(statusToken, true);
    }
  })

  test('Should failed because reset password token has expired', async ({ assert }) => {

    await setTimeout((expiresIn + 1) * 1000)

    try {

      if (user.id) {

        await sut.execute({
          id: user.id,
          randomValue: randomValue
        });

      }

      assert.fail('The test has failed because the valid time has finished');

    } catch (error) {

      assert.ok('The test was successful because the valid time has finished');

    }


  })


})

