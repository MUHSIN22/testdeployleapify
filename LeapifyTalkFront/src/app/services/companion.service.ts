import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { companionSignup } from '../models/Companion';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CompanionService {
  private apiUrl:string = environment.apiUrl;
  private header:any;

  constructor(
    private http:HttpClient,
    private httpService:HttpService
  ) { 
    this.httpService.userToken.subscribe((token:any) => {
      console.log(token,"token1232");
      this.header = new HttpHeaders({'Authorization':`Bearer ${token}`})
    })
    
    console.log(localStorage.getItem('id_token'),'token1');
    
  }

  companionSignup = (body:companionSignup): Observable<any>=> {
    return this.http.post<any>(`${this.apiUrl}/companion/companion`, body); 
  }

  getCompanionCourse = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/courses/get-courses/61d9bf60df187b50e001f3f1`);
  }

  getPreferences = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/quiz/get-quiz/624de06ca55e7003663d9912`,{headers:this.header})
  }

  uploadPreferences = (data:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/quiz/preference`,data,{headers:this.header})
  }

  getExam = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/quiz/get-quiz/6239e9df5d8c5d9ad6897f59`,{headers:this.header})
  }

  checkAnswer = (id:any,answer:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/quiz/check-answer/${id}`,{answer:answer},{headers:this.header})
  }

  finishQuiz = (id:any):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/quiz/finish-quiz/${id}`,{headers:this.header})
  }

  getHomeData = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/companion/companion-dashboard`,{headers:this.header})
  }
}
