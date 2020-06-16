import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<User[]> {
    const providers = this.userRepository.findAllProviders({
      except_user_id: user_id,
    });

    return providers;
  }
}

export default ListProvidersService;
