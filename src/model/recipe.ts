import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Recipe } from '../entity/recipe';
import { IGetRecipeItemDTO } from '../interface/recipe';

@Provide()
export class RecipeModel {
  @InjectEntityModel(Recipe)
  recipeModel: Repository<Recipe>;

  async findAllDishes() {
    // find All
    return await this.recipeModel.find();

    // find first
    const firstRecipe = await this.recipeModel.findOne(1);
    console.log('First Recipe from the db: ', firstRecipe);

    // find one by name
    const meAndBearsRecipe = await this.recipeModel.findOne({
      name: 'Me and Bears',
    });
    console.log('Me and Bears Recipe from the db: ', meAndBearsRecipe);

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

  async findDishes(type: IGetRecipeItemDTO['type']) {
    return await this.recipeModel.find({ type: type });
  }

  // save
  async saveDishes(options: Recipe) {
    // create a entity object
    const recipe = new Recipe();
    recipe.count = options.count;
    recipe.cover = options.cover;
    recipe.description = options.description;
    recipe.name = options.name;
    recipe.type = options.type;

    // save entity
    return await this.recipeModel.save(recipe);
  }
}
