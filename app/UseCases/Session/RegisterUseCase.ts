import { UserRepository } from 'App/Repositories/UserRepository'
import { CreateUserContract, UserContract } from '../User/Interfaces/UserContract'
import { HashUtilService } from 'App/Services/HashUtilService'

export default class RegisterUseCase {
  private userRepository: UserRepository

  constructor(parameters: { userRepository: UserRepository }) {
    this.userRepository = parameters.userRepository
  }

  async execute(data: CreateUserContract): Promise<UserContract> {
    const user = await this.userRepository.findByEmail(data.user.email)

    if (!!user) {
      throw new Error('User already exists')
    }

    data.user.status = true
    data.user.forcePasswordReset = true

    data.user.password = await HashUtilService.generateHash({ plainText: data.user.password })

    const result = await this.userRepository.create(data)

    return result
  }
}
