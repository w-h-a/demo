import { INotificationClient } from '../../client/notification/notification';
import { IUserRepository } from '../../client/userRepo/userRepo';
import { CreateUserDTO, User } from '../../shared/types';

/**
 * This is the service layer for users. It contains
 * all and only business logic for the domain of users.
 * It knows nothing about HTTP or outbound client implementations.
 */
export class UserService {
  constructor(
    private userRepo: IUserRepository,
    private notificationClient: INotificationClient
  ) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    // TODO: could maybe move this check to handler
    if (!dto.email || !dto.name) {
      // TODO: best to have a separate domain specific errors file
      throw new Error('Missing name or email');
    }

    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new Error('Email already in use');
    }

    const newUser = await this.userRepo.create(dto);

    await this.notificationClient.notify(newUser.email, newUser.name);

    return newUser;
  }

  async getUser(id: string): Promise<User | null> {
    // TODO: business logic if necessary
    return this.userRepo.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    // TODO: add business logic if necessary
    return this.userRepo.findAll();
  }
}
