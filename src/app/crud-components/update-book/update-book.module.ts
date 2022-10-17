import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateBookRoutingModule } from './update-book-routing.module';
import { UpdateBookComponent } from './update-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared.module';


@NgModule({
  declarations: [
    UpdateBookComponent
  ],
  imports: [
    CommonModule,
    UpdateBookRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UpdateBookModule { }
