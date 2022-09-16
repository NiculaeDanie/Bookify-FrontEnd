import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { SharedModule } from '../modules/shared.module';
import { CarouselComponent } from '../home/carousel/carousel.component';


@NgModule({
  declarations: [
    AuthorComponent
  ],
  imports: [
    AuthorRoutingModule,
    SharedModule
  ]
})
export class AuthorModule { }
