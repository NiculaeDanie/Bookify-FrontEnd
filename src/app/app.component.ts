import { Component } from '@angular/core';
import { BookifyService } from './bookify.service';
import { Genre } from './Dtos/Genre';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './Dtos/User';
import { Book } from './Dtos/Book';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bookify'
  constructor(){
  }
  ngOnInit(){
  }

    
 
  
}
