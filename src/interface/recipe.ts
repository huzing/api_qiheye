import { EDishesType } from '../dict/recipe';
import { Recipe } from '../entity/recipe';

export interface IGetRecipeItemDTO {
  type: EDishesType;
}

export interface IRecipeResponseDTO extends Recipe {
  name: string;
}
