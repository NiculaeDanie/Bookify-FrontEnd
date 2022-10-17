import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../Dtos/Book';
import { Search } from '../Dtos/Search';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  private serverUrl = environment.apiBaseUrl;
  private book?: Book;
  constructor(private http: HttpClient) { }
  public getFavorites(id: string): Observable<Book[]>{
    return this.http.get<Book[]>(this.serverUrl+'/Book/Favorites/'+id);
  }
  public getHistory(id: string): Observable<Book[]>{
    return this.http.get<Book[]>(this.serverUrl+'/Book/History/'+id);
  }
  public addToFavorites(userid: string,bookid: number): Observable<Book>{
    return this.http.post<Book>(this.serverUrl+"/Book/" + bookid+ "/" + userid,null);
  }
  public removeFromFavorites(userid: string,bookid: number): Observable<Book>{
    return this.http.delete<Book>(this.serverUrl+"/Book/" + bookid+ "/" + userid);
  }
  public getBooksByAuthor(authorid: number): Observable<Book[]>{
    return this.http.get<Book[]>(this.serverUrl+'/Book/Author/'+authorid);
}
public search(search: string): Observable<Search[]>{
  return this.http.get<Search[]>(this.serverUrl+'/Book/Search/'+search);
}
public getBookById(id: number, userid: string): Observable<Book>{
  return this.http.get<Book>(this.serverUrl+'/Book/'+id + "/"+ userid);
}
public getBookContent(id: number,userid: string): Observable<HttpResponse<Blob>>{
  return this.http.get<Blob>(this.serverUrl+'/Book/Content/'+userid+"/"+id,{ observe: 'response', responseType: 'blob' as 'json' });
}
public getBookImage(id: number): Observable<HttpResponse<Blob>>{
  return this.http.get<Blob>(this.serverUrl+'/Book/Image/'+id,{ observe: 'response', responseType: 'blob' as 'json' });
}
public getBooksByGenre(genreid: number): Observable<Book[]>{
  return this.http.get<Book[]>(this.serverUrl+'/Book/Genre/'+genreid);
}
public add(book: FormData): Observable<Book>{
  return this.http.post<Book>(this.serverUrl+'/Book',book);
}
public update(book: FormData,id: number): Observable<Book>{
  return this.http.put<Book>(this.serverUrl+'/Book/'+id,book);
}
public addAuthor(bookid: number, authorid: number){
  return this.http.put(this.serverUrl+'/Book/Author/'+authorid+'/'+bookid,null);
}
public addGenre(bookid: number, genreid: number){
  return this.http.put(this.serverUrl+'/Book/Genre/'+genreid+'/'+bookid,null);
}
public deleteBook(bookid: number){
  return this.http.delete(this.serverUrl+'/Book/'+bookid);
}

}
