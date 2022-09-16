import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { BookifyService } from '../../bookify.service';
import { Book } from '../../Dtos/Book';
import { Genre } from '../../Dtos/Genre';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  books: Book[]=[];
  map = new Map<number , SafeResourceUrl>();
  @Input() genre!: Genre;
  @Output() id= new EventEmitter<number>();
  slides:any= [ [] ];
  visibleDays:number = 5;

  @HostListener("window:resize", []) updateDays() {
    $("#carouselExampleControls"+this.genre.name).carousel(0);
    if (window.innerWidth >= 1200) {
      this.visibleDays = 5; // lg
    } else if (window.innerWidth >= 992) {
      this.visibleDays = 4;//md
    } else if (window.innerWidth  >= 768) {
      this.visibleDays = 3;//sm
    } else if (window.innerWidth < 768) {
      this.visibleDays = 2;//xs
    }
    this.slides = this.chunk(this.books,this.visibleDays);
  }
  constructor(private bookService: BookifyService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(this.genre.name == 'Favorites'){
      this.getFavorites(this.genre.id);
    }
    else{
      if(this.genre.name == 'YourHistory'){
        this.getHistory(this.genre.id);
      }
      else{
        if(this.genre.name == 'Books')
        {
          this.getByAuthor(this.genre.id);
        }
        else{
          this.getBooks(this.genre.id);
        } 
      }
    }
    this.updateDays();
  }
  public getByAuthor(authorid: number): void{
    this.bookService.getBooksByAuthor(authorid).subscribe(
      (Response: Book[])=>{
        this.books=Response;
        this.books.forEach(element => {
          this.getImages(element.id);
        });
        this.slides = this.chunk(this.books,this.visibleDays);        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
  public getBooks(genreid: number): void{
    this.bookService.getBooksByGenre(genreid).subscribe(
      (Response: Book[])=>{
        this.books=Response;
        this.books.forEach(element => {
          this.getImages(element.id);
        });
        this.slides = this.chunk(this.books,this.visibleDays);        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
  public getFavorites(id: number): void{
    this.bookService.getFavorites(id).subscribe(
      (Response: Book[])=>{
        this.books=Response;
        this.books.forEach(element => {
          this.getImages(element.id);
        });
        this.slides = this.chunk(this.books,this.visibleDays);        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
  public getHistory(id: number): void{
    this.bookService.getHistory(id).subscribe(
      (Response: Book[])=>{
        this.books=Response;
        this.books.forEach(element => {
          this.getImages(element.id);
        });
        this.slides = this.chunk(this.books,this.visibleDays);        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
  public getImages(id: number): void{
      this.bookService.getBookImage(id).subscribe(
        (Response: HttpResponse<Blob>)=>{
          this.map.set(id,this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(Response.body!)));
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
  }
  public chunk(arr: any[], chunkSize: number): any[ ]{
    let R=[];
    for (let i=0, len=arr.length; i<len; i+=chunkSize) {
      R.push(arr.slice(i, i+chunkSize));
      }
      return R;
  }

  getGenres(book: Book): string{
    var result: string = "";
    book.genres?.forEach((genre)=>{
      result = result +" "+ genre.name + ",";
    });
      return result.slice(0,-1);
    }
    getAuthors(book: Book): string{
      var result: string = "";
      if(book.author.length == 0){
        return "unknown";
      }
      book.author?.forEach((author)=>{
        result = result +" "+ author.name + ",";
      });
        return result.slice(0,-1);
      }
    public emitId(id: number){
      this.id.emit(id);
    }

}
