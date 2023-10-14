import { UserRepository } from "App/Repositories/UserRepository";
import { UserContract } from "../User/Interfaces/UserContract";
import { HashUtilService } from "App/Services/HashUtilService";
import { LoginContract } from "./Interfaces/AuthContract";


export default class AuthenticateUseCase {

    constructor(private userRepository: UserRepository) { }

    async execute(data: LoginContract): Promise<UserContract> {

        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.status == false) {

            throw new Error("User is not actived");

        }

        const comparePassword = await HashUtilService.comparePlainTextWithHash({
            plainTextValue: data.passowrd,
            hashedValue: user.password
        });

        if(!comparePassword){
            throw new Error("Invalid credentials");
        }

        return user;

    }
}
