import { Component, OnInit } from '@angular/core';
import { Search } from '../../Dtos/Search';
import { HttpErrorResponse } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { Book } from '../../Dtos/Book';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  constructor(private bookService: BookService, private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
    
  }
  public logOut(){
    this.auth.logOut();
    this.router.navigate(['']);
  }
  public isAdmin(){
    return this.auth.isAdmin();
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
  public route(option: Search){
    this.router.navigate(['/',option.type.toLowerCase(),option.id]);
  }

}
