
export interface UserContract {
    name: string,
    email: string,
    status: boolean,
    passowrd: string,
    forcePasswordReset: boolean,
    resetPasswordToken: string,
}

export interface CreateUserContract {
    user: UserContract
}

export interface UpdateUserContract extends CreateUserContract {
    id: string
}

export interface DeleteUserContract {
    id: string
}