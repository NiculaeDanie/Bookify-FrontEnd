import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { PdfComponent } from './pdf/pdf.component';

const routes: Routes = [{ path: '', component: BookComponent },
                        { path: 'content', component: PdfComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
