import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '../home/carousel/carousel.component';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TitlePipe } from '../pipes/title.pipe';


@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule
],
  exports: [
    CommonModule,
    RouterModule,
    CarouselComponent,
    NavBarComponent,
    HomeComponent,
    TitlePipe,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  declarations: [CarouselComponent, NavBarComponent,HomeComponent,TitlePipe]
})
export class SharedModule {}