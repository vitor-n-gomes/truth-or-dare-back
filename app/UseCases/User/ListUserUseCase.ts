import { UserRepository } from 'App/Repositories/UserRepository'
import { UserContract } from './Interfaces/UserContract'

export class ListUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserContract[] | null> {
    const result = await this.userRepository.list()

    return result
  }
}
