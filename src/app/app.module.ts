import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthormodalComponent } from './authormodal/authormodal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './modules/shared.module';
import { CoreModule } from './modules/core.module';



@NgModule({
  declarations: [
    AppComponent,
    AuthormodalComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
