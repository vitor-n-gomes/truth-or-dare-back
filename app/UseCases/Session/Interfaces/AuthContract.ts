export interface LoginContract {
  email: string
  password: string
}

export interface RequestResetPasswordContract {
  email: string
}

export interface ValidateTokenContract {
  id: string
  randomValue: string
}
