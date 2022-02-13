import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public id_token:any;
  apiUrl: string = environment.apiUrl;
  
  constructor(private http:HttpClient) { 
    this.id_token = localStorage.getItem('id_token')
  }

  getStudentDetails = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/edit-profile`,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  editStudentProfile = (data:any) => {
    return this.http.put<any>(`${this.apiUrl}/edit-profile`,data,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }
}
