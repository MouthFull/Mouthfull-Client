import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-results',
  templateUrl: './recipe-results.component.html',
  styleUrls: ['./recipe-results.component.css'],
})
export class RecipeResultsComponent implements OnInit {
  constructor(public recipeService: RecipeService) {
    recipeService.sayHello();
    recipeService.recipeResults$.subscribe((val) => {
      console.log(val);
    });

    recipeService.recipeArray$.subscribe((val) => {
      console.log(val);
    });
  }

  ngOnInit(): void {}

  requestRecipe(event) {
    console.log('Requesting recipe by id:', event.target.value);
    let url =
      'https://mouthfullservice.azurewebsites.net/api/recipe/' +
      event.target.value;
    // let url = 'http://localhost:5000/api/test/ingredient';
    console.log('sending request to ', url);

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

    let response = fetch(url, { method: 'get' });

    response.then(pass, fail);
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
