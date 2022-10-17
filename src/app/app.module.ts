import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared.module';
import { CoreModule } from './modules/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './home/carousel/carousel.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { SignupComponent } from './signup/signup.component';
import { EmailConfirmationComponent } from './authentication/email-confirmation/email-confirmation.component';
import { AuthInterceptor } from './guards/AuthInterceptor';
import { AuthGuard } from './guards/auth-guard.service';
import { UserGuard } from './guards/user-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    HomeCarouselComponent,
    CarouselComponent,
    SignupComponent,
    EmailConfirmationComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    AuthGuard,
    UserGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
