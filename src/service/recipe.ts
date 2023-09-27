import { Inject, Provide } from '@midwayjs/decorator';
import { RecipeModel } from '../model/recipe';
import { IGetRecipeItemDTO } from '../interface/recipe';
import { Recipe } from '../entity/recipe';

@Provide()
export class RecipeService {
  @Inject()
  private _photoModel!: RecipeModel;
  async getAllDishes() {
    return this._photoModel.findAllDishes();
  }

  async getDishes(options: IGetRecipeItemDTO) {
    return this._photoModel.findDishes(options.type);
  }

  async addDishes(options: Recipe) {
    return this._photoModel.saveDishes(options);
  }
}
