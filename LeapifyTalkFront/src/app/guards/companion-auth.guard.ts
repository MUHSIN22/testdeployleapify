import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CompanionAuthGuard implements CanActivate {
  isLoggedIn:boolean = false;
  loggedInUser:any={}

  constructor(
    private httpServices:HttpService,
    private router:Router
  ){
    this.httpServices.userSubject.subscribe(res => {
      this.loggedInUser=res
    })
    this.httpServices.isloggedIn.subscribe(res => {
      this.isLoggedIn = res;
    })
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLoggedIn && this.loggedInUser.role === "companion"){
      return true;
    }else{
      this.router.navigateByUrl('/signin')
      return false
    }
      
  }
  
}
