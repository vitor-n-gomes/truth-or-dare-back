import { UserRepository } from 'App/Repositories/UserRepository'
import { RequestResetPasswordContract } from './Interfaces/AuthContract'
import GenerateResetPasswordTokenUseCase from './GenerateResetPasswordTokenUseCase'
export default class RequestResetPasswordUseCase {
  private userRepository: UserRepository

  constructor(parameters: { userRepository: UserRepository }) {
    this.userRepository = parameters.userRepository
  }

  async execute(data: RequestResetPasswordContract): Promise<{ message: string }> {
    const generateResetPasswordToken = new GenerateResetPasswordTokenUseCase({
      userRepository: this.userRepository,
    })

    const { randomValue } = await generateResetPasswordToken.execute(data)

    return { message: 'An email with the link to reset your password has been sent to you' }
  }
}
