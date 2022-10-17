import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '../home/carousel/carousel.component';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../home/nav-bar/nav-bar.component';
import { TitlePipe } from '../pipes/title.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon'
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  imports: [ 
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    NgxMatFileInputModule,
    MatDialogModule,
    MatMenuModule
],
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    NgxMatFileInputModule,
    MatDialogModule,
    TitlePipe,
    MatMenuModule
  ],
  declarations: [TitlePipe]
})
export class SharedModule {}