import { UserService } from './service';
import { MockUserRepository } from '../../client/userRepo/mock/userRepo';
import { MockNotificationClient } from '../../client/notification/mock/notification';
import { CreateUserDTO, User } from '../../shared/types';

/**
 * We test the service business logic in isolation
 * Strive to test behavior and not implementation details
 */
describe('UserService', () => {
  let service: UserService;
  let userRepo: MockUserRepository;
  let notificationClient: MockNotificationClient;

  beforeEach(() => {
    userRepo = new MockUserRepository();
    notificationClient = new MockNotificationClient();

    service = new UserService(userRepo, notificationClient);
  });

  describe('createUser', () => {
    it('should create a new user and send a welcome email', async () => {
      // Arrange
      const dto: CreateUserDTO = {
        name: 'Test User',
        email: 'test@example.com',
      };

      const createdUser: User = {
        id: '123-abc',
        ...dto,
      };

      userRepo.findByEmail.mockResolvedValue(null);
      userRepo.create.mockResolvedValue(createdUser);

      // Act
      const result = await service.createUser(dto);

      // Assert
      expect(result).toEqual(createdUser);
      expect(userRepo.create).toHaveBeenCalledWith(dto);
      expect(notificationClient.notify).toHaveBeenCalledWith(
        createdUser.email,
        createdUser.name
      );
    });
  });
});
