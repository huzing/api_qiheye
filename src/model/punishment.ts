import { PunishmentRecord } from '@/entity/punishment_record';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

@Provide()
export class PunishmentRecordModel {
  @InjectEntityModel(PunishmentRecord)
  punishmentRecordModel: Repository<PunishmentRecord>;

  async findRecord() {
    // find All
    return await this.punishmentRecordModel.findOne(1);

    // find first
    const firstRecipe = await this.punishmentRecordModel.findOne(1);
    console.log('First Recipe from the db: ', firstRecipe);

    // // find by views
    // const allViewedRecipes = await this.recipeModel.find({ views: 1 });
    // console.log('All viewed Recipes: ', allViewedRecipes);

    // let allPublishedRecipes = await this.recipeModel.find({
    //   isPublished: true,
    // });
    // console.log('All published Recipes: ', allPublishedRecipes);

    // // find and get count
    // let [allRecipes, RecipesCount] = await this.recipeModel.findAndCount();
    // console.log('All Recipes: ', allRecipes);
    // console.log('Recipes count: ', RecipesCount);
  }

  // save
  async updateRecord(options: PunishmentRecord) {
    const record = await this.findRecord();
    record.listen = options.listen;
    record.exercise = options.exercise;
    record.reciteBooks = options.reciteBooks;
    record.reciteWords = options.reciteWords;
    record.kneel = options.kneel;
    record.total = options.total;
    record.updatedAt = options.updatedAt;
    // save entity
    return await this.punishmentRecordModel.save(record);
  }
}
