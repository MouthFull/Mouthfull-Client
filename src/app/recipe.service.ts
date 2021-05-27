import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeBaseUrl =
    'https://mouthfullservice.azurewebsites.net/api/mouthfull/broccoli';
  str: string;
  private readonly _recipeResults = new BehaviorSubject<string>(
    'Hello from Behavior Subject'
  );

  private readonly _recipeArray = new BehaviorSubject<any>([]);

  readonly recipeResults$ = this._recipeResults.asObservable();
  readonly recipeArray$ = this._recipeArray.asObservable();

  get recipes(): string {
    return this._recipeResults.getValue();
  }

  set recipeResults(val: string) {
    this._recipeResults.next(val);
  }

  addRecipe(val: string) {
    this._recipeResults.next(val);
  }

  addRecipesToArray(recipes: any) {
    console.log('adding: ', recipes);
    this._recipeArray.next(recipes);
  }

  sayHello() {
    console.log('Hello from your recipe service');
  }
}
