import { CreateUserDTO, User } from '../../../shared/types';
import { IUserRepository } from '../userRepo';

/**
 * Mock implementation of the IUserRepository
 */
export class MockUserRepository implements IUserRepository {
  create = jest.fn<Promise<User>, [CreateUserDTO]>();
  findById = jest.fn<Promise<User | null>, [string]>();
  findByEmail = jest.fn<Promise<User | null>, [string]>();
  findAll = jest.fn<Promise<User[]>, []>();
}
