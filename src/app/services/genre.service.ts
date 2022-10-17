import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../Dtos/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private serverUrl = environment.apiBaseUrl
  constructor(private http: HttpClient) { }
  public getGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(this.serverUrl+'/Genre');
  }
  public getById(id: number): Observable<Genre>{
    return this.http.get<Genre>(this.serverUrl+'/Genre/'+id);
  }
  public add(book: FormData): Observable<Genre>{
    return this.http.post<Genre>(this.serverUrl+'/Genre',book);
  }
}
