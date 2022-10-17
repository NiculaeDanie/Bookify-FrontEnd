import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBookRoutingModule } from './add-book-routing.module';
import { AddBookComponent } from './add-book.component';
import { SharedModule } from '../../modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AddBookComponent
  ],
  imports: [
    CommonModule,
    AddBookRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
 ]
})
export class AddBookModule { }
