import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css'],
})
export class IngredientListComponent implements OnInit {
  model: any = {};
  ingredient: string;
  ingredients: Array<string> = [];

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  addIngredient() {
    //Adding ingredient:
    //Data checking to see if this is a valid ingredient.

    if (this.ingredient === '') {
      return console.log('no blanks!');
    }

    if (this.ingredient === 'asparagus') {
      this.toastr.error('asparagus is not a valid ingredient');
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
    // let url =
    //   'https://mouthfullservice.azurewebsites.net/api/mouthfull/broccoli';
    let url = 'http://localhost:5000/api/test/ingredient';

    console.log('Do the API request for a recipe!');

    function pass(res) {
      var result = res.json();
      result.then(
        function (data) {
          console.log(data);
        },
        function (err) {
          console.error(err);
        }
      );
    }

    function fail(res) {
      console.error(res);
    }

    // let response = fetch(url, { method: 'get' });

    // response.then(pass, fail);
  }
}

//* id,
//* EntityId,
//* title,
//* image,
//* favorite,
//* comment,
//*
//* missed ingredients  -	 missedIngredientCount
//* unused ingredients  -	 unusedIngredientCount
//* usedIngredients		  -	 usedIngredientCount
