import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://static01.nyt.com/images/2023/08/16/multimedia/MRS-Roasted-Carrots-vzjq/MRS-Roasted-Carrots-vzjq-master768.jpg?w=1280&q=75'
    ),
    new Recipe(
      'Another Test Recipe',
      'This is another simply a test',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg'
    ),
  ];

  onRecipeSelected(singleRecipe: Recipe) {
    this.recipeWasSelected.emit(singleRecipe);
  }
}
