import { Pool } from 'pg';
import { IUserRepository } from '../userRepo';
import { CreateUserDTO, User } from '../../../api/user/domain';
import { randomUUID } from 'crypto';

/**
 * Implementation of the IUserRepository using Postgres
 */
export class PostgresUserRepository implements IUserRepository {
  constructor(private pool: Pool) {}

  async create(dto: CreateUserDTO): Promise<User> {
    const id = randomUUID();
    const newUser: User = { id, ...dto };

    const query = {
      text: 'INSERT INTO users(id, name, email) VALUES($1, $2, $3) RETURNING *',
      values: [newUser.id, newUser.name, newUser.email],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async findById(id: string): Promise<User | null> {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this.pool.query(query);

    return result.rows[0] || null;
  }

  async findAll(): Promise<User[]> {
    const query = {
      text: 'SELECT * FROM users',
    };

    const result = await this.pool.query(query);

    return result.rows;
  }
}
