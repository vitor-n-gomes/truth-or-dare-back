
export interface LoginContract {
    email: string,
    passowrd: string
}


export interface RequestResetPasswordContract {
    email: string
}

export interface ValidateTokenContract {
    id: string,
    randomValue: string
}
