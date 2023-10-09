import { Inject, Provide } from '@midwayjs/decorator';
import { PunishmentRecordModel } from '@/model/punishment';
import { PunishmentRecord } from '@/entity/punishment_record';
import dayjs = require('dayjs');

@Provide()
export class PunishmentRecordService {
  @Inject()
  private _photoModel!: PunishmentRecordModel;
  async getRecord() {
    const data = await this._photoModel.findRecord();

    // 使用dayjs解析Unix时间戳
    const date1 = dayjs.unix(data.updatedAt);
    const date2 = dayjs();

    // 计算两个日期之间的差异
    const diffInDays = date2.diff(date1, 'day');

    if (diffInDays > 1) {
      return this.updateRecord({
        ...data,
        reciteBooks: 0,
        reciteWords: 0,
        exercise: 0,
        listen: 0,
        kneel: data.kneel + (diffInDays - 1) * 5,
        total: data.total + (diffInDays - 1) * 80,
      });
    } else if (diffInDays === 1) {
      let total = data.total;
      let kneel = data.kneel;
      if (data.listen < 120) {
        total += 10;
        kneel += 2;
      }
      if (data.reciteWords < 30) {
        total += 10;
        kneel += 2;
      }
      if (data.exercise < 30) {
        total += 10;
        kneel += 2;
      }
      if (data.reciteBooks < 20) {
        total += 10;
        kneel += 2;
      }

      if (
        data.listen === 120 &&
        data.reciteWords === 30 &&
        data.exercise === 30 &&
        data.reciteBooks === 20
      ) {
        total -= 20;
        kneel -= 4;
      }

      return this.updateRecord({
        ...data,
        reciteBooks: 0,
        reciteWords: 0,
        exercise: 0,
        listen: 0,
        kneel: kneel,
        total: total,
      });
    }

    return data;
  }

  async updateRecord(options: PunishmentRecord) {
    const saveData = await this._photoModel.findRecord();
    const nowDate = dayjs().unix();
    return await this._photoModel.updateRecord({
      ...saveData,
      reciteBooks: options.reciteBooks ?? 0,
      reciteWords: options.reciteWords ?? 0,
      exercise: options.exercise ?? 0,
      listen: options.listen ?? 0,
      updatedAt: nowDate,
      total: saveData.total,
      kneel: saveData.kneel,
    });
  }
}
