import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Author } from '../../Dtos/Author';
import { Genre } from '../../Dtos/Genre';
import { Search } from '../../Dtos/Search';
import { AuthorService } from '../../services/author.service';
import { GenreService } from '../../services/genre.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../Dtos/Book';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-add-book',
  templateUrl: '../book-form.component.html',
  styleUrls: ['../book-form.component.css']
})
export class AddBookComponent implements OnInit {
  name: string = "Add book";
  authors: Author[]= [];
  genres: Genre[]=[];
  show: Boolean = false;
  search: Search[] = [];
  genreSearch: Genre[] = [];
  bookForm= new FormGroup({
    Title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    Description: new FormControl('',[Validators.required, Validators.minLength(3)]),
    ReleaseDate: new FormControl('',[Validators.required]),
    Content: new FormControl('',[Validators.required]),
    Image: new FormControl('',[Validators.required])
  });
  constructor(private dialog: MatDialog,private authorService: AuthorService, private genreService: GenreService, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    
  }
  public submit(){
    console.log(this.bookForm.get('ReleaseDate')!.value!);
    
    const formData = new FormData();
    formData.append('Title', this.bookForm.get('Title')!.value!);
    formData.append('Description', this.bookForm.get('Description')!.value!);
    formData.append('ReleaseDate', this.bookForm.get('ReleaseDate')!.value!);
    formData.append('Content', this.bookForm.get('Content')!.value!);
    formData.append('Image', this.bookForm.get('Image')!.value!);
    console.log(formData);
    
    this.bookService.add(formData).subscribe(
      (Response: Book)=>{
        this.authors.forEach(element => {
          this.bookService.addAuthor(Response.id,element.id).subscribe();
        });
        this.genres.forEach(element => {
          this.bookService.addGenre(Response.id,element.id).subscribe();
        });
        this.router.navigate(['/book',Response.id]);
      }
    );
  }
  get f(){
    return this.bookForm.controls;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AuthorDialogComponent, {
      width: '600px',
      data: {name: '', description: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      const formData = new FormData();
      formData.append('Name',result.name);
      formData.append('Description',result.description);
      this.authorService.add(formData).subscribe(
        (Response: Author)=>{
          this.authors.push(Response);
        }
      );
    });
  }
  openDialogGenre(): void {
    const dialogRef = this.dialog.open(GenreDialogComponent, {
      width: '600px',
      data: {name: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      const formData = new FormData();
      formData.append('Title',result.name);
      this.genreService.add(formData).subscribe(
        (Response: Genre)=>{
          this.genres.push(Response);
        }
      );
    });
  }

  public Search(event: any): void{
    this.authorService.search(event.target.value).subscribe(
      (Response: Search[])=>{
        this.search=Response.filter(x=>x.type!='Book' && !this.authors.some(a=>a.id==x.id));
      },
      (error: HttpErrorResponse) => {
        this.search = [];
      }
    )
  }
  public SearchGenre(event: any): void{
    this.genreService.getGenres().subscribe(
      (Response: Genre[])=>{
        this.genreSearch=Response.filter(x=>x.name.includes(event.target.value));
      },
      (error: HttpErrorResponse) => {
        this.search = [];
      }
    )
  }
  public select(id: number){
    this.authorService.getAuthorById(id).subscribe(
      (Response: Author)=>{
        this.authors.push(Response);
        
      },
      (error: HttpErrorResponse) => {
        this.search = [];
      }
    )
  }
  public selectGenre(id: number){
    this.genreService.getById(id).subscribe(
      (Response: Genre)=>{
        this.genres.push(Response);
        
      },
      (error: HttpErrorResponse) => {
        this.search = [];
      }
    )
  }
  public remove(author: Author){
    const index: number = this.authors.indexOf(author);
    if (index !== -1) {
        this.authors.splice(index, 1);
    } 
  }
  public removeGenre(author: Genre){
    const index: number = this.genres.indexOf(author);
    if (index !== -1) {
        this.genres.splice(index, 1);
    } 
  }

}
