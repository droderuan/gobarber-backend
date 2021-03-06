import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all providers', async () => {
    const user0 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'John Foo',
      email: 'johnfoo@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Boo',
      email: 'johnboo@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user0, user1]);
  });
});
