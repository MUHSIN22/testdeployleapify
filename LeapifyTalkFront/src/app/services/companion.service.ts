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
    this.header = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('id_token')}`})
  }

  companionSignup = (body:companionSignup): Observable<any>=> {
    return this.http.post<any>(`${this.apiUrl}/companion/companion`, body); 
  }

  getCompanionCourse = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/courses/get-courses/61d9bf60df187b50e001f3f1`);
  }

  getExam = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/quiz/get-quiz/6239e9df5d8c5d9ad6897f59`,{headers:this.header})
  }

  checkAnswer = (id:any,answer:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/quiz/check-answer/${id}`,{answer:answer},{headers:this.header})
  }
}
