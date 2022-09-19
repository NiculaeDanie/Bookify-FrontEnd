import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../Dtos/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private serverUrl = environment.apiBaseUrl
  constructor(private http: HttpClient) { }
  public getAuthorById(id: number): Observable<Author>{
    return this.http.get<Author>(this.serverUrl+'/Author/'+id);
  }
}
