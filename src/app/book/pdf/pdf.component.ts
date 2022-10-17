import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../Dtos/Book';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  bookid?: number;
  book?: Book;
  file?: SafeResourceUrl;
  
  constructor(private bookService: BookService,
    private route: ActivatedRoute,
  private router: Router,
  private sanitizer: DomSanitizer,
  private auth: AuthenticationService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
   ngOnInit(): void {
    this.bookid = Number(this.route.snapshot.paramMap.get('id')!);
    this.getBookById(this.bookid!);
    this.getBookContent(this.bookid);
   }

  public getBookById(bookid: number): void{
    this.bookService.getBookById(bookid,this.auth.getEmail()).subscribe(
      (Response: Book)=>{
        this.book=Response; 
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
  public getBookContent(bookid: number):void{
    this.bookService.getBookContent(bookid,this.auth.getEmail()).subscribe(
      (Response: HttpResponse<Blob>)=>{
        this.file = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(Response.body!));        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
  

}
