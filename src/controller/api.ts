import {
  Inject,
  Controller,
  Post,
  Query,
  Get,
  Body,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/web';
import { IBaseResponse, IUserOptions } from '../interface';
import { UserService } from '../service/user';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('id') id: number): Promise<IBaseResponse<IUserOptions>> {
    const user = await this.userService.getUser({ id });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/add_user')
  async addUser(
    @Body() body: Omit<IUserOptions, 'id'>
  ): Promise<IBaseResponse<string>> {
    if (!body || !body.nickname || !body.password) {
      return {
        success: false,
        message: 'ERROR',
        data: '用户名与密码不能为空!!',
      };
    }

    return { success: true, message: 'OK', data: 'user' };
  }
}
