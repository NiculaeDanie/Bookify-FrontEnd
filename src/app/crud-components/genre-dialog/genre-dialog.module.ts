import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreDialogRoutingModule } from './genre-dialog-routing.module';
import { GenreDialogComponent } from './genre-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/modules/shared.module';


@NgModule({
  declarations: [
    GenreDialogComponent
  ],
  imports: [
    CommonModule,
    GenreDialogRoutingModule,
    MatDialogModule,
    SharedModule,
    FormsModule 
  ]
})
export class GenreDialogModule { }
