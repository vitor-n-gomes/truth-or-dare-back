import { UserRepository } from "App/Repositories/UserRepository";
import { RequestResetPasswordContract } from "./Interfaces/AuthContract";

export default class RequestResetPasswordUseCase {

  constructor(private userRepository: UserRepository) { }

  async execute(data: RequestResetPasswordContract): Promise<{message: string}> {

    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("User does not exist");
    }


    return { message: 'Request password '}

  }
}
