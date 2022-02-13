import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TherapistAuthGuard implements CanActivate {
  public isLoggedIn:boolean = false;
  public userSubject:Observable<any> = new Observable();
  public user:any;
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.init()
  }
  
  init = ( ) => {
    let token = localStorage.getItem('id_token');
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        this.isLoggedIn = true
        this.userSubject = this.jwtHelper.decodeToken(token)
        this.user = this.userSubject
      }
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.init()
    if (this.isLoggedIn && this.user.user === "therapist") {  
      return true;
    }
    else {
      this.router.navigate(['/therapist-signin']);
      return false;
    }
  }
  
}
