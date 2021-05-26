import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodGroupsComponent } from './food-groups/food-groups.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { RecipeResultsComponent } from './recipe-results/recipe-results.component';

const routes: Routes = [
  { path: '', component: IngredientListComponent },
  { path: 'recipes', component: RecipeResultsComponent },
  { path: 'animation', component: FoodGroupsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
