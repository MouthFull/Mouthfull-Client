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
  // subject: BehaviorSubject<string>;
  recipes = [
    {
      id: 658509,
      image: 'https://spoonacular.com/recipeImages/658509-312x231.jpg',
      missedIngredientCount: 2,
      missedIngredients: [
        {
          id: 11215,
          image: 'https://spoonacular.com/cdn/ingredients_100x100/garlic.png',
          name: 'garlic',
          entityId: 0,
        },
        {
          id: 9152,
          image:
            'https://spoonacular.com/cdn/ingredients_100x100/lemon-juice.jpg',
          name: 'lemon juice',
          entityId: 0,
        },
      ],
      title: 'Roasted Broccoli with Lemon and Garlic',
      unusedIngredients: [
        {
          id: 11090,
          image: 'https://spoonacular.com/cdn/ingredients_100x100/broccoli.jpg',
          name: 'broccoli',
          entityId: 0,
        },
      ],
      usedIngredientCount: 1,
      usedIngredients: [
        {
          id: 10011090,
          image: 'https://spoonacular.com/cdn/ingredients_100x100/broccoli.jpg',
          name: 'broccoli florets',
          entityId: 0,
        },
      ],
      favorite: false,
      comment: null,
      entityId: 0,
      neededingredients: null,
    },
  ];

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
    let ingredientString = '';
    this.ingredients.forEach((ingredient) => {
      ingredientString += ingredient + ',';
    });
    ingredientString = ingredientString.slice(0, ingredientString.length - 1);

    let url =
      'https://mouthfullservice.azurewebsites.net/api/mouthfull/' +
      ingredientString;

    console.log('send the request to :', url);

    function pass(res) {
      var result = res.json();
      result.then(
        function (data) {
          console.log('data retrieved: ', data);
          localStorage.setItem('recipes', JSON.stringify(data));
        },
        function (err) {
          console.error(err);
        }
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
