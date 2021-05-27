import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-results',
  templateUrl: './recipe-results.component.html',
  styleUrls: ['./recipe-results.component.css'],
})
export class RecipeResultsComponent implements OnInit {
  recipes: [];

  constructor(public recipeService: RecipeService, private router: Router) {
    this.recipes = JSON.parse(localStorage.getItem('recipes'));
    console.log(this.recipes);
  }

  ngOnInit(): void {}

  requestRecipe(event) {
    console.log('Requesting recipe by id:', event.target.value);
    let url =
      'https://mouthfullservice.azurewebsites.net/api/recipe/' +
      event.target.value;
    console.log('sending request to ', url);

    function pass(res) {
      var result = res.json();
      result.then(
        function (data) {
          console.log(data);
          localStorage.setItem('recipeSummary', JSON.stringify(data));
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

    this.router.navigate(['dishes']);
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
