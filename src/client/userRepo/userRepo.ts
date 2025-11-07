import { CreateUserDTO, User } from '../../api/user/domain';

/**
 * Interface for the User Repo.
 * This defines the contract that the service layer will use,
 * allowing the implementation (e.g, Postgres, Mongo, in-memory, Mock)
 * to be swapped out.
 */
export interface IUserRepository {
  create(dto: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
