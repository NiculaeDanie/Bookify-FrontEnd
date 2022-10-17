import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseDto } from '../Dtos/AuthResponseDto';
import { RegistrationResponseDto } from '../Dtos/RegistragitonDto';
import { User } from '../Dtos/User';
import { UserForAuthenticationDto } from '../Dtos/UserDto';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  email?: string;
  private serverUrl = environment.apiBaseUrl;
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();
  private currentUserSubject?: BehaviorSubject<User>;
  public currentUser?: Observable<User>;
  constructor(private http: HttpClient) { }
  public confirmEmail(token: string,email: string): Observable<any>{
    return this.http.get<any>(this.serverUrl+"/EmailConfirmation")
  }
  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    localStorage.setItem('email',body.email);
    return this.http.post<AuthResponseDto>(this.serverUrl+ "/User/login", body);
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }
  public registerUser = (route: string, body: User) => {
    return this.http.post<RegistrationResponseDto> (this.serverUrl+ "/User/register", body);
  }
  public getEmail(): string{
    return localStorage.getItem('email')!;
  }
  public getRoles(): Observable<any[]>{
    var email = localStorage.getItem("email");
    return this.http.get<any[]>(this.serverUrl+"/User/getRoles/"+email)
  }
  public static getToken(){
    localStorage.getItem('token');
  }
  public isAdmin(): Boolean {
    const token = localStorage.getItem('token'); // get token from local storage
    if(token==null){
      return false;
    }
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object
    if(parsedPayload.exp < Date.now() / 1000){
      localStorage.setItem("token", '');
      localStorage.setItem("email", '');
      localStorage.setItem("Role", '');
    }
    const role = localStorage.getItem('Role');
    if(role != 'Admin'){
      return false;
    }
    return parsedPayload.exp > Date.now() / 1000; // check if token is expired
  }
  public logOut(){
    localStorage.setItem("token", '');
      localStorage.setItem("email", '');
      localStorage.setItem("Role", '');
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // get token from local storage
    if(token==null){
      return false;
    }
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object
    if(parsedPayload.exp < Date.now() / 1000){
      localStorage.setItem("token", '');
      localStorage.setItem("email", '');
      localStorage.setItem("Role", '');
    }
    return parsedPayload.exp > Date.now() / 1000; // check if token is expired
  }

}
