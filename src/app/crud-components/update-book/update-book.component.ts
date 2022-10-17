import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/Dtos/Author';
import { Book } from 'src/app/Dtos/Book';
import { Genre } from 'src/app/Dtos/Genre';
import { Search } from 'src/app/Dtos/Search';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-update-book',
  templateUrl: '../book-form.component.html',
  styleUrls: ['../book-form.component.css']
})
export class UpdateBookComponent implements OnInit {
  name: string = "Update book";
  authors: Author[]= [];
  genres: Genre[]=[];
  show: Boolean = false;
  search: Search[] = [];
  genreSearch: Genre[] = [];
  newAdded: Author[] = [];
  newRemoved: Author[] = [];
  newAddedGenre: Genre[] = [];
  newRemovedGenre: Genre[] = [];
  bookForm!: FormGroup;
  bookid?: number;
  constructor(private dialog: MatDialog, private authorService: AuthorService,private auth: AuthenticationService,
    private sanitizer: DomSanitizer , private genreService: GenreService, private bookService: BookService, private router: Router,private route:ActivatedRoute) { }
  book!: Book;
  ngOnInit(): void {
    this.bookid = Number(this.route.snapshot.paramMap.get('id')!);
    this.getBookById(this.bookid!);
    
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
          this.newAdded.push(Response);
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
          this.newAddedGenre.push(Response);
        }
      );
    });
  }

  public getBookById(bookid: number): void{
    this.bookService.getBookById(bookid,this.auth.getEmail()).subscribe(
      (Response: Book)=>{
        this.book=Response;
        this.authors=Response.author;
        this.genres=Response.genres; 
        this.bookForm= new FormGroup({
          Title: new FormControl(Response.title,[Validators.required, Validators.minLength(3)]),
          Description: new FormControl(Response.description,[Validators.required, Validators.minLength(3)]),
          ReleaseDate: new FormControl(Response.releaseDate,[Validators.required]),
          Content: new FormControl(),
          Image: new FormControl()
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
  

  public submit(){
    const formData = new FormData();
    formData.append('Title', this.bookForm.get('Title')!.value!);
    formData.append('Description', this.bookForm.get('Description')!.value!);
    formData.append('ReleaseDate', this.bookForm.get('ReleaseDate')!.value!);
    formData.append('Content', this.bookForm.get('Content')!.value!);
    formData.append('Image', this.bookForm.get('Image')!.value!);
    console.log(formData);
    console.log(this.bookid);
    
    this.bookService.update(formData,this.bookid!).subscribe(
      (Response: Book)=>{
        this.newAdded.forEach(element => {
          this.bookService.addAuthor(this.bookid!,element.id).subscribe();
        });
        this.newAddedGenre.forEach(element => {
          this.bookService.addGenre(this.bookid!,element.id).subscribe();
        });
        this.router.navigate(['/book',this.bookid]);
      }
    );
  }
  get f(){
    return this.bookForm.controls;
  }
  public Search(event: any): void{
    this.authorService.search(event.target.value).subscribe(
      (Response: Search[])=>{
        this.search=Response.filter(x=>x.type!='Book');
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
        const index: number = this.authors.indexOf(Response);
        if(index !== -1){
          this.newRemoved.splice(index,1);
        }
        else{
          this.newAdded.push(Response);
        }
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
        const index: number = this.genres.indexOf(Response);
        if(index !== -1){
          this.newRemovedGenre.splice(index,1);
        }
        else{
          this.newAddedGenre.push(Response);
        }
        this.genres.push(Response);
        
      },
      (error: HttpErrorResponse) => {
        this.search = [];
      }
    )
  }
  public remove(author: Author){
    const index: number = this.authors.indexOf(author);
    const index2: number = this.newAdded.indexOf(author);
    if(index2 !== -1){
      this.newAdded.splice(index2,1);
    }
    if (index !== -1) {
        this.authors.splice(index, 1);
    } 
    if (index2 === -1 && index !== -1 ){
      this.newRemoved.push(author);
    }
  }
  public removeGenre(author: Genre){
    const index: number = this.genres.indexOf(author);
    const index2: number = this.newAddedGenre.indexOf(author);
    if(index2 !== -1){
      this.newAddedGenre.splice(index2,1);
    }
    if (index !== -1) {
        this.genres.splice(index, 1);
    } 
    if (index2 === -1 && index !== -1 ){
      this.newRemovedGenre.push(author);
    } 
  }
}
