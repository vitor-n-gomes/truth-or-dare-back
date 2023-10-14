import { UserRepository } from 'App/Repositories/UserRepository'
import { RequestResetPasswordContract } from './Interfaces/AuthContract'
import { EncryptionUtilService } from 'App/Services/EncryptionUtilService'

export default class GenerateResetPasswordTokenUseCase {
  private userRepository: UserRepository
  private expiresIn: string | number = '2 hours'

  constructor(parameters: { userRepository: UserRepository; expiresIn?: string | number }) {
    const { userRepository, expiresIn } = parameters

    this.userRepository = userRepository
    this.expiresIn = expiresIn || this.expiresIn
  }

  async execute(
    data: RequestResetPasswordContract
  ): Promise<{ message: string; randomValue: string; expiresIn: string | number }> {
    const user = await this.userRepository.findByEmail(data.email)

    if (!user || !user.id) {
      throw new Error('User does not exist')
    }

    const min = 10000
    const max = 99999

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

    const key = EncryptionUtilService.encrypt({
      payload: '1',
      purpose: String(randomNumber),
      expiresIn: this.expiresIn,
    })

    user.forcePasswordReset = true
    user.resetPasswordToken = key

    await this.userRepository.update({
      id: user.id,
      user: user,
    })

    return {
      message: 'Token has been created',
      randomValue: String(randomNumber),
      expiresIn: this.expiresIn,
    }
  }
}
