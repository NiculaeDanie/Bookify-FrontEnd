import { Component, OnInit } from '@angular/core';
import { BookifyService } from '../bookify.service';
import { Search } from '../Dtos/Search';
import { HttpErrorResponse } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { Book } from '../Dtos/Book';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public search: Search[]= [];
  book?: Book;
  @Output() bookemit = new EventEmitter<number>();
  @Output() authoremit = new EventEmitter<number>();
  constructor(private bookService: BookifyService) { }

  ngOnInit(): void {
    
  }
  public Search(event: any): void{
    this.bookService.search(event.target.value).subscribe(
      (Response: Search[])=>{
        this.search=Response;
      },
      (error: HttpErrorResponse) => {
        this.search = [];
      }
    )
  }
  public Log(event:any,option: Search):void{
    if(option.type == "Book"){
      this.bookemit.emit(option.id);
    }
    if(option.type == "Author"){
      this.authoremit.emit(option.id);
    }
    
    
  }

}
