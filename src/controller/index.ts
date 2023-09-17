import { Controller, Get, Post } from '@midwayjs/decorator';

@Controller('/')
export class HomeController {
  @Get('/')
  @Post('/')
  async home() {
    return '你好呀 QIHEYE!';
  }
}
