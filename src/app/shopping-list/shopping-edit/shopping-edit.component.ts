import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) editIngredientForm: NgForm;
  startedEditingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.startedEditingSubscription =
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.editIngredientForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      });
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }

  onAddIngredient(form: NgForm) {
    this.shoppingListService.addIngredient(
      new Ingredient(form.value.name, form.value.amount)
    );
  }
}
