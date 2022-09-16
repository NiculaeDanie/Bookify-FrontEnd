import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Book} from './Dtos/Book';
import {Genre} from './Dtos/Genre';
import {Search} from './Dtos/Search';
import { Author } from './Dtos/Author';
@Injectable({
  providedIn: 'root'
})
export class BookifyService {
  private serverUrl = environment.apiBaseUrl
  constructor(private http: HttpClient) { }
  
  public getBooksByGenre(genreid: number): Observable<Book[]>{
    return this.http.get<Book[]>(this.serverUrl+'/Book/Genre/'+genreid);
  }
  public getGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(this.serverUrl+'/Genre');
  }
  public search(search: string): Observable<Search[]>{
    return this.http.get<Search[]>(this.serverUrl+'/User/'+search);
  }
  public getBookById(id: number, userid: number): Observable<Book>{
    return this.http.get<Book>(this.serverUrl+'/Book/'+id + "/"+ userid);
  }
  public getBookContent(id: number,userid: number): Observable<HttpResponse<Blob>>{
    return this.http.get<Blob>(this.serverUrl+'/Book/Content/'+userid+"/"+id,{ observe: 'response', responseType: 'blob' as 'json' });
  }
  public getBookImage(id: number): Observable<HttpResponse<Blob>>{
    return this.http.get<Blob>(this.serverUrl+'/Book/Image/'+id,{ observe: 'response', responseType: 'blob' as 'json' });
  }
  public getAuthorById(id: number): Observable<Author>{
    return this.http.get<Author>(this.serverUrl+'/Author/'+id);
  }
  public getFavorites(id: number): Observable<Book[]>{
    return this.http.get<Book[]>(this.serverUrl+'/User/Favorites/'+id);
  }
  public getHistory(id: number): Observable<Book[]>{
    return this.http.get<Book[]>(this.serverUrl+'/User/History/'+id);
  }
  public addToFavorites(userid: number,bookid: number): Observable<Book>{
    return this.http.post<Book>(this.serverUrl+"/User/" + bookid+ "/" + userid,null);
  }
  public removeFromFavorites(userid: number,bookid: number): Observable<Book>{
    return this.http.delete<Book>(this.serverUrl+"/User/" + bookid+ "/" + userid);
  }
  public getBooksByAuthor(authorid: number): Observable<Book[]>{
    return this.http.get<Book[]>(this.serverUrl+'/Book/Author/'+authorid);
  }
}
