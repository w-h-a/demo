import { UserService } from '../../service/user/service';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../../api/user/domain';

/**
 * This is the handler/controller layer for users.
 * Using arrow function just to auto bind `this`
 */
export class UserHandler {
  constructor(private userService: UserService) {}

  createUser = async (req: Request, res: Response) => {
    try {
      // TODO: improve use zod to parse
      const dto = req.body as CreateUserDTO;
      const newUser = await this.userService.createUser(dto);
      res.status(201).json(newUser);
    } catch (err: unknown) {
      // TODO: improve (switch to find out what the error is and translate to http code/response
      res.status(500).json({ message: (err as Error).message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUser(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err: unknown) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err: unknown) {
      res.status(500).json({ message: (err as Error).message });
    }
  };
}
