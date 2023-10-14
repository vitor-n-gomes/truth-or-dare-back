import {
  UserContract,
  CreateUserContract,
  UpdateUserContract,
  DeleteUserContract
} from "App/UseCases/User/Interfaces/UserContract";

import { UserRepository } from "../UserRepository";
import BadRequestException from "App/Exceptions/BadRequestException";
import { randomUUID } from 'node:crypto'
import { DateTime } from "luxon";

export class InMemoryUserRepository implements UserRepository {

  public items: UserContract[] = []

  async list(): Promise<UserContract[]> {
    return this.items;
  }

  async findByEmail(email: string): Promise<UserContract | null> {

    const item = this.items.find((item) => item.email === email);

    return item ?? null;
  }

  async show(id: string): Promise<UserContract | null> {
    const item = this.items.find((item) => item.id === id);
    return item ?? null;
  }

  async create(data: CreateUserContract): Promise<UserContract> {
    const newUser = {
      ...data.user,
      id: randomUUID(),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    };
    this.items.push(newUser);
    return newUser;
  }

  async update(data: UpdateUserContract): Promise<UserContract> {
    const index = this.items.findIndex((item) => item.id === data.id);
    if (index === -1) {
      throw new BadRequestException('This User does not exist', 409);
    }

    const updatedUser = {
      ...this.items[index],
      ...data.user,
      id: data.id,
      updatedAt: DateTime.now(),
    };
    this.items[index] = updatedUser;
    return updatedUser;
  }

  async delete(data: DeleteUserContract): Promise<{ message: string }> {
    const index = this.items.findIndex((item) => item.id === data.id);
    if (index === -1) {
      throw new BadRequestException('This User does not exist', 404);
    }

    this.items.splice(index, 1);
    return { message: 'User has been deleted successfully' };
  }
}
