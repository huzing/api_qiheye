import {
  Inject,
  Controller,
  Provide,
  Query,
  Get,
  ALL,
  Body,
  Post,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { RecipeService } from '../service/recipe';
import { IGetRecipeItemDTO, IRecipeResponseDTO } from '../interface/recipe';
import { IBaseResponse } from '../interface/base';
import { Recipe } from '../entity/recipe';

@Provide()
@Controller('/recipe')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  recipeService: RecipeService;

  @Get('/get_all_dishes')
  async getAllDishes(): Promise<IBaseResponse<IRecipeResponseDTO[]>> {
    const dishes = await this.recipeService.getAllDishes();
    return { success: true, message: 'OK', data: dishes };
  }

  @Get('/get_dishes')
  async getDishes(
    @Query() type?: IGetRecipeItemDTO['type']
  ): Promise<IBaseResponse<IRecipeResponseDTO[]>> {
    const dishes = await this.recipeService.getDishes({ type });
    return { success: true, message: 'OK', data: dishes };
  }

  @Post('/add_dishes')
  async addDishes(@Body(ALL) body: Recipe): Promise<IBaseResponse<Recipe>> {
    const recipe = await this.recipeService.addDishes(body);
    return {
      success: true,
      message: 'OK',
      data: recipe,
    };
  }
}
