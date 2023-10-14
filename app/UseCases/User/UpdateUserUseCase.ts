import { UserRepository } from 'App/Repositories/UserRepository'
import { UserContract, UpdateUserContract } from './Interfaces/UserContract'

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: UpdateUserContract): Promise<UserContract> {
    const user = await this.userRepository.update(data)

    return user
  }
}
