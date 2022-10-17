import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/Dtos/Genre';
import { User } from 'src/app/Dtos/User';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {

  genres: Genre[]=[];
  user?: User = {id: 2 , name: 'test' , email:'test'};


  constructor(private genreService: GenreService){
  }
  ngOnInit(){
    this.getGenres();
  }

    
  public getGenres(): void{
      this.genreService.getGenres().subscribe(
        (Response: Genre[])=>{
          this.genres=Response;
          if(this.user!=null){
            this.genres = [{ id : this.user.id! , name : "YourHistory"}].concat(this.genres);
            this.genres = [{ id : this.user.id! , name : "Favorites"}].concat(this.genres);
          } 
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    }

}
