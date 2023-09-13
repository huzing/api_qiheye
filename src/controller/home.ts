import { Controller, Get, Post } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  @Post('/')
  async home() {
    return 'Hello Midwayjs!';
  }
}
