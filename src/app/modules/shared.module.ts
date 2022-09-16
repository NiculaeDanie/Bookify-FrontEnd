import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from '../app-routing.module';
import { CarouselComponent } from '../home/carousel/carousel.component';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TitlePipe } from '../pipes/title.pipe';


@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    HttpClientModule,
    PdfViewerModule],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    CarouselComponent,
     NavBarComponent,
     HomeComponent,
     TitlePipe,
     AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    HttpClientModule,
    PdfViewerModule
  ],
  declarations: [CarouselComponent, NavBarComponent,HomeComponent,TitlePipe]
})
export class SharedModule {}