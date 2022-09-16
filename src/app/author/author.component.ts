import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookifyService } from '../bookify.service';
import { Author } from '../Dtos/Author';
import { Genre } from '../Dtos/Genre';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authorid?: number;
  author?: Author;
  genre?: Genre ;
  constructor(private bookService: BookifyService,
    private route: ActivatedRoute,
  private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.authorid = Number(this.route.snapshot.paramMap.get('id')!);
    this.getAuthorById(this.authorid!);
    this.genre = {id: this.authorid! , name:"Books"};
  }

  getAuthorById(authorid: number): void{
    this.bookService.getAuthorById(authorid).subscribe(
      (Response: Author)=>{
        this.author=Response; 
        console.log(Response);
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
}
