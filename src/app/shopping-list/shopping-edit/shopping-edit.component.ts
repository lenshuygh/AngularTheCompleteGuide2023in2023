import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  onAddIngredient(form: NgForm) {
    this.shoppingListService.addIngredient(
      new Ingredient(form.value.name, form.value.amount)
    );
  }
}
