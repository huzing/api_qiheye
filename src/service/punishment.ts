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
    const saveDate = dayjs.unix(data.updatedAt);
    // 获取当前日期
    const currentDate = dayjs();

    // 使用 isSame 方法检查两个日期是否相同
    const isSameDate = currentDate.isSame(saveDate, 'day');

    //当天就不操作
    if (isSameDate) return data;

    // 计算时间戳日期是否在当前日期之前，并且相差一天
    const isYesterday = saveDate.isBefore(currentDate, 'day');

    //如果是昨天
    if (isYesterday) {
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
        data.listen >= 120 &&
        data.reciteWords >= 30 &&
        data.exercise >= 30 &&
        data.reciteBooks >= 20
      ) {
        total -= 20;
        kneel -= 4;
      }

      return await this.updateRecord({
        ...data,
        reciteBooks: 0,
        reciteWords: 0,
        exercise: 0,
        listen: 0,
        kneel: kneel,
        total: total,
      });
    } else {
      //如果是昨天以前，计算两个日期之间的差异
      const diffInDays = currentDate.diff(saveDate, 'day');

      return await this.updateRecord({
        ...data,
        reciteBooks: 0,
        reciteWords: 0,
        exercise: 0,
        listen: 0,
        kneel: data.kneel + (diffInDays - 1) * 5,
        total: data.total + (diffInDays - 1) * 80,
      });
    }
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
      total: options.total ?? saveData.total,
      kneel: options.kneel ?? saveData.kneel,
    });
  }
}
