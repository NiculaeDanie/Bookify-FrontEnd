import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../Dtos/Author';
import { Genre } from '../Dtos/Genre';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authorid?: number;
  author?: Author;
  genre?: Genre ;
  constructor(private authorService: AuthorService,
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
    this.authorService.getAuthorById(authorid).subscribe(
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
