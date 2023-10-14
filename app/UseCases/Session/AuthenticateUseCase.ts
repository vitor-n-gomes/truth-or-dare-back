import { UserRepository } from "App/Repositories/UserRepository";
import { UserContract } from "../User/Interfaces/UserContract";
import { HashUtilService } from "App/Services/HashUtilService";
import { LoginContract } from "./Interfaces/AuthContract";


export default class AuthenticateUseCase {

    private userRepository: UserRepository

    constructor(parameters: { userRepository: UserRepository }) {

        this.userRepository = parameters.userRepository;

    }

    async execute(data: LoginContract): Promise<UserContract> {

        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new Error("The user was not found");
        }

        if (user.status == false) {
            throw new Error("The user is not actived");
        }


        const comparePassword = await HashUtilService.comparePlainTextWithHash({
            plainTextValue: data.password,
            hashedValue: user.password
        });

        if (!comparePassword) {
            throw new Error("Invalid credentials");
        }

        return user;

    }
}
