import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css'],
})
export class IngredientListComponent implements OnInit {
  model: any = {};
  ingredient: string;
  ingredients: Array<string> = [];
  ingredientString = '';
  _recipeService: RecipeService;

  constructor(
    private toastr: ToastrService,
    recipeService: RecipeService,
    private router: Router
  ) {
    recipeService.addRecipe(
      'Hello from ingredient-list cstor via Behavior Subjecct'
    );
    this._recipeService = recipeService;
    // this._recipeService.addRecipesToArray(this.recipes);
  }

  ngOnInit(): void {}

  addIngredient() {
    //Adding ingredient:
    //Data checking to see if this is a valid ingredient.

    if (this.ingredient === '') {
      return console.log('no blanks!');
    }

    if (this.ingredient === 'asparagus' || this.ingredient === 'thumb tacks') {
      this.toastr.error(this.ingredient + ' is not a valid ingredient');
    } else {
      console.log('Adding ingredient', this.ingredient);

      this.ingredients.push(this.ingredient);
      this.ingredient = '';

      //Show all ingredients:
      console.log('List so far: ', this.ingredients);
    }
  }

  clearIngredients() {
    this.ingredients = [];
    console.log('Cleared list', this.ingredients);
  }

  removeIngredient(ingredientToBeRemoved: string) {
    console.log(ingredientToBeRemoved);

    let index = this.ingredients.indexOf(ingredientToBeRemoved);
    this.ingredients.splice(index, 1);
  }

  getRecipe() {
    let ingredientString = '';
    this.ingredients.forEach((ingredient) => {
      ingredientString += ingredient + ',';
    });
    ingredientString = ingredientString.slice(0, ingredientString.length - 1);

    let url =
      'http://localhost:5000/api/mouthfull/' +
      ingredientString;

    console.log('send the request to :', url);

    function pass(res) {
      var result = res.json();
      result.then(
        function (data) {
          localStorage.setItem('recipes', JSON.stringify(data));
        },
        function (err) {}
      );
    }

    function fail(res) {
      console.error(res);
    }

    let response = fetch(url, { method: 'get' });
    response.then(pass, fail);

    this.router.navigate(['animation']);
  }
}
