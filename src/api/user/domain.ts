export interface User {
  id: string;
  name: string;
  email: string;
}

export type CreateUserDTO = Omit<User, 'id'>;
