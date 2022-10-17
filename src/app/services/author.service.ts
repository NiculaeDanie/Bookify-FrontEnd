import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../Dtos/Author';
import { Search } from '../Dtos/Search';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private serverUrl = environment.apiBaseUrl
  constructor(private http: HttpClient) { }
  public getAuthorById(id: number): Observable<Author>{
    return this.http.get<Author>(this.serverUrl+'/Author/'+id);
  }
  public search(search: string): Observable<Search[]>{
    return this.http.get<Search[]>(this.serverUrl+'/Book/Search/'+search);
  }
  public add(book: FormData): Observable<Author>{
    return this.http.post<Author>(this.serverUrl+'/Author',book);
  }
}
