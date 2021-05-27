import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { RecipeResultsComponent } from './recipe-results/recipe-results.component';
import { FoodGroupsComponent } from './food-groups/food-groups.component';
import { DishesComponent } from './dishes/dishes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    IngredientListComponent,
    RecipeResultsComponent,
    FoodGroupsComponent,
    DishesComponent,
    // FormsModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
