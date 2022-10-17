import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreDialogComponent } from './genre-dialog.component';

const routes: Routes = [{ path: '', component: GenreDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreDialogRoutingModule { }
