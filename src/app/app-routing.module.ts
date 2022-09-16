import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthormodalComponent } from './authormodal/authormodal.component';
import { BookmodalComponent } from './bookmodal/bookmodal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PdfmodalComponent } from './pdfmodal/pdfmodal.component';

const routes: Routes = [
  {path:'author/:id',component: AuthormodalComponent},
  {path: 'book/:id', component: BookmodalComponent},
  {path: 'book/content/:id', component:PdfmodalComponent},
  { path: '',   redirectTo: '', pathMatch: 'full', component: HomeComponent },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
