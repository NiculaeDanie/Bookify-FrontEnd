import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationComponent } from './authentication/email-confirmation/email-confirmation.component';
import { AuthGuard } from './guards/auth-guard.service';
import { UserGuard } from './guards/user-guard.service';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', component: LoginComponent },
  { path: 'register',  pathMatch: 'full', component: SignupComponent },
  { path: 'emailconfirmation', component: EmailConfirmationComponent },
  { path: '', component: HomeComponent ,
  children:[
  {path: 'home', component: HomeCarouselComponent},
  { path: 'book/:id', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  { path: 'author/:id', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
  { path: 'add-book', loadChildren: () => import('./crud-components/add-book/add-book.module').then(m => m.AddBookModule) , canActivate:[AuthGuard]},
  { path: 'update-book', loadChildren: () => import('./crud-components/update-book/update-book.module').then(m => m.UpdateBookModule), canActivate:[AuthGuard] },
  { path: 'author-dialog', loadChildren: () => import('./crud-components/author-dialog/author-dialog.module').then(m => m.AuthorDialogModule), canActivate:[AuthGuard] },
  { path: 'genre-dialog', loadChildren: () => import('./crud-components/genre-dialog/genre-dialog.module').then(m => m.GenreDialogModule), canActivate:[AuthGuard] },
  { path: 'statistics', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule), canActivate:[AuthGuard] },
  ], canActivate:[UserGuard]
},
  
  {path: '**', loadChildren: () => import('./page-not-found/page-not-fond.module').then(m => m.PageNotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
