import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const url = `${environment.apiUrl}/recipes.json`;
    this.httpClient.put(url, recipes).subscribe(response => {
      console.log('response from PUT: ', response);
    });
  }
}
