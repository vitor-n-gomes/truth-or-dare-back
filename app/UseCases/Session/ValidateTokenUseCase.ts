import { UserRepository } from "App/Repositories/UserRepository";
import { ValidateTokenContract } from "./Interfaces/AuthContract";
import { EncryptionUtilService } from "App/Services/EncryptionUtilService";

export default class ValidateTokenUseCase {

  private userRepository: UserRepository

  constructor(parameters: { userRepository: UserRepository }) {

    this.userRepository = parameters.userRepository;

  }

  async execute(data: ValidateTokenContract): Promise<{ message: string, statusToken: boolean }> {

    const user = await this.userRepository.show(data.id);

    if (!user || !user.id) {
      throw new Error("User does not exist");
    }

    const descriptedValue = EncryptionUtilService.decrypt({
      key: user.resetPasswordToken,
      purpose: data.randomValue
    });

    if(descriptedValue == null){
      throw new Error("The token has expired, or the validation was incorrect");
    }


    return { message: 'Token has been validated', statusToken: true}

  }
}
