import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http'
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PdfmodalComponent } from './pdfmodal/pdfmodal.component';
import { BookmodalComponent } from './bookmodal/bookmodal.component';
import { AuthormodalComponent } from './authormodal/authormodal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { TitlePipe } from './pipes/title.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarouselComponent,
    PdfmodalComponent,
    BookmodalComponent,
    AuthormodalComponent,
    PageNotFoundComponent,
    HomeComponent,
    TitlePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
