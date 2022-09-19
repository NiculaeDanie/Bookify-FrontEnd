import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../Dtos/Book';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookid?: number;
  book?: Book;
  file?: SafeResourceUrl;
  constructor(private bookService: BookService,
    private route: ActivatedRoute,
  private router: Router,
  public sanitizer: DomSanitizer
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
  ngOnInit(): void {
    console.log(this.bookService.getBook());
    this.bookid = Number(this.route.snapshot.paramMap.get('id')!);
    this.getBookById(this.bookid!,2);
  }

  getGenres(book?: Book): string{
    if(book== null){
      return '';
    }
    var result: string = "";
    book.genres?.forEach((genre)=>{
      result = result +" "+ genre.name + ",";
    });
      return result.slice(0,-1);
    }
    getAuthors(book?: Book): string{
      if(book == null){
        return '';
      }
      var result: string = "";
      if(book.author.length == 0){
        return "unknown";
      }
      book.author?.forEach((author)=>{
        result = result +" "+ author.name + ",";
      });
        return result.slice(0,-1);
      }
      public getBookById(bookid: number,userid: number): void{
        this.bookService.getBookById(bookid,userid).subscribe(
          (Response: Book)=>{
            this.book=Response; 
            console.log(Response);
            
            this.getImages(Response.id);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      }
      public addBookToFavorites(): void{
        this.bookService.addToFavorites(2,this.bookid!).subscribe(
          (Response: Book)=>{
            this.book=Response; 
            this.getBookById(this.bookid!,2);
            
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      }
      public removeBookFromFavorites(): void{
        this.bookService.removeFromFavorites(2,this.bookid!).subscribe(
          (Response: Book)=>{
            this.getBookById(this.bookid!,2);
            
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      }
      public getImages(id: number): void{
        this.bookService.getBookImage(id).subscribe(
          (Response: HttpResponse<Blob>)=>{
            this.file=this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(Response.body!));
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
    }

}
