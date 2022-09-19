import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '',   redirectTo: '', pathMatch: 'full', component: HomeComponent },
  { path: 'book/:id', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  { path: 'author/:id', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
  {path: '**', loadChildren: () => import('./page-not-found/page-not-fond.module').then(m => m.PageNotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
