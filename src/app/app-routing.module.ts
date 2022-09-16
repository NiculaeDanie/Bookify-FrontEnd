import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthormodalComponent } from './authormodal/authormodal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'author/:id',component: AuthormodalComponent},
  { path: '',   redirectTo: '', pathMatch: 'full', component: HomeComponent },
  { path: 'book/:id', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
