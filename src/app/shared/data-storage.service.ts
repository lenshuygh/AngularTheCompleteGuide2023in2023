import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from '../../environment';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  url = `${environment.apiUrl}/recipes.json`;

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(this.url, recipes).subscribe(response => {
      console.log('response from PUT: ', response);
    });
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>(this.url).subscribe(recipes => {
      this.recipeService.setRecipes(recipes);
    });
  }
}
