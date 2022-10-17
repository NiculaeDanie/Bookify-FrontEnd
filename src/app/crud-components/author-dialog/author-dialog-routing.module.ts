import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDialogComponent } from './author-dialog.component';

const routes: Routes = [{ path: '', component: AuthorDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorDialogRoutingModule { }
