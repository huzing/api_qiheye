import {
  Inject,
  Controller,
  Provide,
  Get,
  ALL,
  Body,
  Post,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { IBaseResponse } from '../interface/base';
import { PunishmentRecordService } from '@/service/punishment';
import { PunishmentRecord } from '@/entity/punishment_record';

@Provide()
@Controller('/punishment')
export class PunishmentController {
  @Inject()
  ctx: Context;

  @Inject()
  punishmentService: PunishmentRecordService;

  @Get('/get_record')
  async getAllDishes(): Promise<IBaseResponse<PunishmentRecord>> {
    const record = await this.punishmentService.getRecord();
    return { success: true, message: 'OK', data: record };
  }

  @Post('/update_record')
  async addRecord(
    @Body(ALL) body: PunishmentRecord
  ): Promise<IBaseResponse<PunishmentRecord>> {
    const recipe = await this.punishmentService.updateRecord(body);
    return {
      success: true,
      message: 'OK',
      data: recipe,
    };
  }
}
