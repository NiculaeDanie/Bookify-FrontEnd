import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Dtos/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  submit(){
    const user: User = {
      name: this.form.get('name')!.value,
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value
    };
    this.authService.registerUser("api/accounts/registration", user)
    .subscribe({
      next: (_) => this.router.navigate([""]),
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    })
  }
  }


