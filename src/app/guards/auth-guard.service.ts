
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        var isAuthenticated = this.authService.isAuthenticated();
        if (!isAuthenticated) {
            this.router.navigate(['']);
        }
        this.authService.getRoles().subscribe(
            (Response: any[])=>{
                console.log(Response);
                
                if(!Response.find(x=> x.value == "Admin")){
                    this.router.navigate(['/home']);
                }
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          ) 
        return isAuthenticated;
    }
}