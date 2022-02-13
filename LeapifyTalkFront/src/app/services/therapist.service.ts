import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {
  private apiUrl:string = environment.apiUrl;
  private token:any = localStorage.getItem('id_token')
  constructor(public http:HttpClient) { }

  getInstructorById = (instructorId:any):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/therapist/get-instructor/${instructorId}`)
  }

  editInstructorProfile = (data:any) => {
    return this.http.put<any>(`${this.apiUrl}/therapist/edit-details`,data,{headers: { "Authorization": `Bearer ${this.token}` }})
  }

  getDashboardStudents = () => {
    return this.http.get<any>(`${this.apiUrl}/therapist/therapist-dashboard?page=1`,{headers: { "Authorization": `Bearer ${this.token}` }})
  }

  getDashboardStats = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/therapist/stats`,{headers: { "Authorization": `Bearer ${this.token}` }})
  }

  getSearch = (search:String):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/therapist/search-bar?search=${search}`,{headers: { "Authorization": `Bearer ${this.token}` }})
  }
}
