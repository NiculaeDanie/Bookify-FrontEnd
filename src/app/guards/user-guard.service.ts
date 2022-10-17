
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
export class UserGuard implements CanActivate {
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
        return isAuthenticated;
    }
}