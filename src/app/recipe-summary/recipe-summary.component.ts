import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-summary',
  templateUrl: './recipe-summary.component.html',
  styleUrls: ['./recipe-summary.component.css'],
})
export class RecipeSummaryComponent implements OnInit {
  recipe = {
    title: String,
    summary: String,
  };

  constructor() {
    this.recipe = JSON.parse(localStorage.getItem('recipeSummary'));
    console.log(this.recipe);
  }

  ngOnInit(): void {}
}

// https://spoonacular.com/food-api/docs#Summarize-Recipe
