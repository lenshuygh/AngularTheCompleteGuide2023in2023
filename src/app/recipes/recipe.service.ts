import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://static01.nyt.com/images/2023/08/16/multimedia/MRS-Roasted-Carrots-vzjq/MRS-Roasted-Carrots-vzjq-master768.jpg?w=1280&q=75',
      [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]
    ),
    new Recipe(
      'Another Test Recipe',
      'This is another simply a test',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
      [new Ingredient('Bread', 2), new Ingredient('Meat', 1)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeByIndex(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
