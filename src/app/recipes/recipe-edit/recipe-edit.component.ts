import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private activedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // if there's an id we're in edit mode, if not it's in new mode
      this.editMode = params['id'] != null;
    });
  }
}
