import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorDialogRoutingModule } from './author-dialog-routing.module';
import { AuthorDialogComponent } from './author-dialog.component';
import {MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/modules/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthorDialogComponent
  ],
  imports: [
    CommonModule,
    AuthorDialogRoutingModule,
    MatDialogModule,
    SharedModule,
    FormsModule 
  ]
})
export class AuthorDialogModule { }
