import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NbToastrService } from '@nebular/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = environment.apiUrl
  tokenId = ''
  loggedInStatus:boolean = false
  isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService, private router:Router) {
    let token = localStorage.getItem('token')
    this.tokenId = token
    if(token){
      if(!this.jwtHelper.isTokenExpired(token)){
        this.setUser(token)
      }else{
        this.isLoggedIn.next(false)
        this.loggedInStatus = false
      }
    }else{
      this.isLoggedIn.next(false)
      this.loggedInStatus = false
    }
  }

  getCourseCount = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/course-counts`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  getStatisticsCount = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/total-counts`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  getTransactions = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-transactions?page=${page}`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  getTherapists = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-therapists?page=${page}`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  approveTherapists = (therapistID:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/approve-therapist/${therapistID}`,{},{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  rejectTherapists = (therapistID:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/reject-therapist/${therapistID}`,{},{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  getCourses = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-courses?page=${page}`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  approveCourses = (courseID:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/approve-course/${courseID}`,{},{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  rejectCourse = (courseID:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/reject-course/${courseID}`,{},{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  getMostPurchasedCourse = (page:number) =>{
    return this.http.get<any>(`${this.apiUrl}/student-course-count/?page=${page}`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  loginAdmin = (data:any) => {
    return this.http.post<any>(`${this.apiUrl}/login-admin`,data)
  }

  logout = () => {
    let token = localStorage.getItem('token');
    localStorage.removeItem('token')
    this.isLoggedIn.next(false)
    this.loggedInStatus = false
    return this.http.post<any>(`${this.apiUrl}/logout-admin`,{},{headers:{'Authorization':`Bearer ${token}`}})
  }

  getApprovedTherapists = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-approved-therapists?page=${page}`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }
  
  getRejectedTherapists = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-unapproved-therapists?page=${page}`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  getRejectedCourses = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-unapproved-courses?page=${page}`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  getApprovedCourses = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-approved-courses?page=${page}`,{headers:{'Authorization':`Bearer ${this.tokenId}`}})
  }

  setUser = (token) =>{
    localStorage.setItem('token',token)
    this.isLoggedIn.next(true)
    this.loggedInStatus = true
    this.tokenId = token
  }
}
