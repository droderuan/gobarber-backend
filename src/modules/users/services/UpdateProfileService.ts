import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private HashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail?.email !== user.email) {
      throw new AppError('Email already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Needed old password to update password');
    }

    if (password && old_password) {
      const checkPassword = await this.HashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!checkPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.HashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserAvatarService;
