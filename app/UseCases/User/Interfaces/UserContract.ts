import { DateTime } from 'luxon'

export interface UserContract {
  id?: string
  name: string
  email: string
  status?: boolean
  password: string
  forcePasswordReset: boolean
  resetPasswordToken: string
  createdAt?: DateTime
  updatedAt?: DateTime
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
