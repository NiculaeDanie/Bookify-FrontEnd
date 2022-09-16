import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { BookifyService } from '../bookify.service';;
import { Genre } from '../Dtos/Genre';
import { User } from '../Dtos/User';
import { CarouselComponent } from './carousel/carousel.component';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Bookify-FrontEnd';
  genres: Genre[]=[];
  user?: User = {id: 2 , name: 'test' , email:'test'};


  constructor(private bookService: BookifyService){
  }
  ngOnInit(){
    this.getGenres();
  }

    
  public getGenres(): void{
      this.bookService.getGenres().subscribe(
        (Response: Genre[])=>{
          this.genres=Response;
          if(this.user!=null){
            this.genres = [{ id : this.user.id , name : "YourHistory"}].concat(this.genres);
            this.genres = [{ id : this.user.id , name : "Favorites"}].concat(this.genres);
          } 
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    }
  @ViewChildren(CarouselComponent) child!: CarouselComponent;
  ngAfterViewInit() {
    console.log(this.child!);
  }
  public getId(id: number){
    alert(id);
  }
  
}
