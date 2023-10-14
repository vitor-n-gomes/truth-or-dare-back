import { UserRepository } from "App/Repositories/UserRepository";
import { RequestResetPasswordContract } from "./Interfaces/AuthContract";
import { EncryptionUtilService } from "App/Services/EncryptionUtilService";

export default class GenerateResetPasswordTokenUseCase {

  private userRepository: UserRepository

  constructor(parameters: { userRepository: UserRepository }) {

    this.userRepository = parameters.userRepository;

  }

  async execute(data: RequestResetPasswordContract): Promise<{ message: string, randomValue: string }> {

    const user = await this.userRepository.findByEmail(data.email);

    if (!user || !user.id) {
      throw new Error("User does not exist");
    }

    const min = 10000;
    const max = 99999;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const key = EncryptionUtilService.encrypt({
      payload: user.id,
      purpose: String(randomNumber),
      expiresIn: '2 hours'
    })

    user.forcePasswordReset = true;
    user.resetPasswordToken = key

    await this.userRepository.update({
      id: user.id,
      user: user
    })

    return { message: 'Token has been created', randomValue: String(randomNumber)}

  }
}
