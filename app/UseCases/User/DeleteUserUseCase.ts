import { UserRepository } from 'App/Repositories/UserRepository'
import { DeleteUserContract } from './Interfaces/UserContract'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: DeleteUserContract): Promise<{ message: string }> {
    const result = await this.userRepository.delete(data)

    return result
  }
}
