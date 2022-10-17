import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseDto } from '../Dtos/AuthResponseDto';
import { UserForAuthenticationDto } from '../Dtos/UserDto';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  errorMessage: string = '';
  showError: boolean=false;

  submit() {
    const userForAuth: UserForAuthenticationDto = {
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value
    }
    this.authService.loginUser('api/accounts/login', userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
       localStorage.setItem("token", res.token);
       this.authService.getRoles().subscribe(
        (Response: any[])=>{
            if(Response.find(x=> x.value == "Admin")){
                localStorage.setItem('Role','Admin');
            }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      ) 
       this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       this.router.navigate(['/home']);
    },
    error: (err: HttpErrorResponse) => {
      this.errorMessage = err.message;
      this.showError = true;
    }})
  }
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

}
