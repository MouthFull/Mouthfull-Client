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
    //I think that this just needs to be in the ngOnInit based on Thursday's lecture,
    //but I'm not entirely sure and I haven't had time to test this out and make sure it works.
  }

  ngOnInit(): void {
    this.recipes = JSON.parse(localStorage.getItem('recipes'));
    console.log(this.recipes);
  }

  requestRecipe(event) {
    console.log('Requesting recipe by id:', event.target.value);
    let url =
      'http://localhost:5000/api/recipe/' +
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

    let responseSummary = fetch(url, { method: 'get' });

    function infoPass(res) {
      var result = res.json();
      result.then(
        function (data) {
          console.log(data);
          localStorage.setItem('spoonacularSourceUrl', JSON.stringify(data.spoonacularSourceUrl));
        },
        function (err) {
          console.error(err);
        }
      );
    }


    
    const infoUrl = 'http://localhost:5000/api/information/' + event.target.value;
    let recipeInformationResponse = fetch(infoUrl, {method: 'get'});
    
    
    recipeInformationResponse.then(infoPass, fail);
    responseSummary.then(pass, fail);

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
