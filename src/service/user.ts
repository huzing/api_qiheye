import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';

@Provide()
export class UserService {
  async getUser(options: Pick<IUserOptions, 'id'>): Promise<IUserOptions> {
    return {
      id: options.id,
      nickname: 'mockedName',
      password: '',
    };
  }

  async addUser(options: IUserOptions) {
    return {
      uid: options.id,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
