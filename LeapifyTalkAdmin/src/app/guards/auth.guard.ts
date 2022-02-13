import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn:boolean = false;
  constructor(private httpService: HttpService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.httpService.isLoggedIn.subscribe((res:any) => {
      this.isLoggedIn = res
    })
    if(this.isLoggedIn){
      return true
    }else{
      this.router.navigate(['/auth/login'])
      return false
    }
  }
  
}
