import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { companionSignup } from '../models/Companion';

@Injectable({
  providedIn: 'root'
})
export class CompanionService {
  private apiUrl:string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  companionSignup = (body:companionSignup): Observable<any>=> {
    return this.http.post<any>(`${this.apiUrl}/companion/sign-up`, body); 
  }

  getCompanionCourse = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/courses/get-courses/61d9bf60df187b50e001f3f1`);
  }
}
