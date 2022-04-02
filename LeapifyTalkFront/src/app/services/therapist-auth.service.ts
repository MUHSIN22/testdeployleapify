import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Signin } from 'src/interfaces';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TherapistAuthService {
  private apiUrl:string = environment.apiUrl;

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService,private httpService: HttpService) { }
  
  regitsterUser = (data:any): Observable<any> =>{
    return this.http.post<any>(`${this.apiUrl}/companion/therapist`,data);
  }

  sendOtpToUser = (data:any): Observable<any> =>{
    return this.http.post<any>(`${this.apiUrl}/therapist/send-otp`,data)
  }

  verifyOtp = (data:any): Observable<any> =>{
    return this.http.post<any>(`${this.apiUrl}/therapist/verify-otp`,data)
  }

  signin = (data:Signin): Observable<any> =>{
    // return this.http.post<any>(`${this.apiUrl}/therapist/login`, data)
    return this.http.post<any>(`${this.apiUrl}/therapist/login`, data)
  }

  loginOtp = (data:any): Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/therapist/login-otp`,data)
  }

  verifyLoginOtp = (data:any): Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/therapist/verify-login`,data)
  }

  forgotPassword = (data:any) => {
    return this.http.post<any>(`${this.apiUrl}/therapist/forgot-password`,data)  
  } 

  logout() {
    let token = localStorage.getItem('id_token');
    return axios.post(`${this.apiUrl}/therapist/logout`, token, { headers: { "Authorization": `Bearer ${token}` } })
      .then(
        (res :any) => {
          this.httpService.id_token = "";
          localStorage.removeItem('id_token');
          this.httpService.loggedIn = false;
          this.httpService.isloggedIn.next(this.httpService.loggedIn);
          return res;
        }, (err) => {
          return err;
        });
  }
  
  changePassword = (data:any,token:any) => {
    return this.http.post<any>(`${this.apiUrl}/therapist/reset-password/${token}`,data)
  }

  resendOtp = (data:any) => {
    return this.http.post<any>(`${this.apiUrl}/therapist/resend-otp`,data)
  }
}
