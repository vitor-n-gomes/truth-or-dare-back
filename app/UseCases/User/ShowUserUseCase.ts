import { UserRepository } from 'App/Repositories/UserRepository'
import { UserContract } from './Interfaces/UserContract'

export class ShowUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserContract | null> {
    const result = await this.userRepository.show(id)

    return result
  }
}
