import { UserRepository } from 'App/Repositories/UserRepository'
import { UserContract, CreateUserContract } from './Interfaces/UserContract'

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserContract): Promise<UserContract> {
    const user = await this.userRepository.create(data)

    return user
  }
}
