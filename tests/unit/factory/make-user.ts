import { UserContract } from "App/UseCases/User/Interfaces/UserContract";
import { faker } from '@faker-js/faker';

export function makeUser(){

    const user: UserContract = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        forcePasswordReset: false,
        resetPasswordToken: ""
    }

    return user;
}