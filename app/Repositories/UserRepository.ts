import {
  CreateUserContract,
  DeleteUserContract,
  UpdateUserContract,
  UserContract,
} from 'App/UseCases/User/Interfaces/UserContract'

export interface UserRepository {
  list(): Promise<UserContract[] | null>
  findByEmail(email: string): Promise<UserContract | null>
  show(id: string): Promise<UserContract | null>
  create(data: CreateUserContract): Promise<UserContract>
  update(data: UpdateUserContract): Promise<UserContract>
  delete(data: DeleteUserContract): Promise<{ message: string }>
}
