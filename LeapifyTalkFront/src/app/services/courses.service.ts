import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl: string = environment.apiUrl;
  public coursePageData : any ;
  public id_token:any = localStorage.getItem('id_token')

  private courseCategories:any = [
    {
      "General Health":["Herbalism","Hoistic Medicine","Anomatherapy","Refloxology"]
    },
    {
      "Mental Health":["Psychotherpy","REBT","Anxiety Management","Life Coach Training","Counselling"]
    },
    { 
      "Meditation":["Sound Therapy","Addiction Recovery","Stress Management","Breathing Techiniques"]
    },
    { 
      "Other Health":["Hoistic Medicine","EFT(Emotional Freedom Technique)","Spiritual Healing","Medical Terminology"]
    }
  ];

  constructor(public http: HttpClient, public httpService: HttpService) { }

  getCourseCategories = () : any => {
    return <any>this.courseCategories
  }

  getCoursesPage = (category?:String): Observable<any> => {
    // this.coursePageData = await axios.get(this.apiUrl+'/courses/popular')
    
    if(category){
      return this.http.get<any>(this.apiUrl+'/courses/popular?category='+category)
    }else{
      return this.http.get<any>(this.apiUrl+'/courses/popular')
    }
  }

  getCoursesOfInstructor = (token:any, page: number):Observable<any> =>{
    return this.http.get<any>(`${this.apiUrl}/therapist/my-courses?page=${page}`,{headers:{ "authorization":`Bearer ${token}` }})
  }

  addNewCourse = (data:any): Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/courses/new-course`,data,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  getCourseById = (id:string): Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/courses/get-courses/${id}`)
  }

  editCourseById = (data:any,id:string): Observable<any> => {
    return this.http.put<any>(`${this.apiUrl}/courses/edit-course/${id}`,data,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  getCourseByInstId = (id:any,page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/therapist/inst-courses/${id}?page=${page}`)
  }

  addNewSection = (id:any,data:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/courses/add-section/${id}`,data,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  getCourseByCategories = (page:number,category?:String):Observable<any> =>{
    if(!category){
      return this.http.get<any>(`${this.apiUrl}/courses/all-courses?page=${page}`)
    }else{
      return this.http.get<any>(`${this.apiUrl}/courses/all-courses?page=${page}&category=${category}`)
    }
  }

  deleteCourse = (courseId:number): Observable<any> => {
    return this.http.delete<any>(`${this.apiUrl}/courses/delete-course/${courseId}`,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  purchaseCourse = (courseId:any): Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/courses/buy-course`,{courseID:courseId},{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  purchasedCourses = () : Observable<any> => {
    this.id_token = this.httpService.id_token
    return this.http.get(`${this.apiUrl}/courses/purchased-courses`,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  getSectionDetails = (sectionId:any,courseId:any) => {
    return this.http.get<any>(`${this.apiUrl}/courses/get-section/${sectionId}?c=${courseId}`,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  postRating = (data:any) =>{
    return this.http.post<any>(`${this.apiUrl}/courses/post-rating`,data,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  handleCourseProgress = (data:any) => {
    return this.http.post<any>(`${this.apiUrl}/courses/ongoing-courses`,data,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  getOngoingCourses = (): Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/courses/ongoing-courses`,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  getCompletedCourses = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/courses/complete-courses`,{ headers: { "Authorization": `Bearer ${this.id_token}` } })
  }

  searchAll = (data:any):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/courses/search-course?search=${data}`)
  }

  getReview = (id:any,page:any):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/courses/get-reviews/${id}?page=${page}`)
  }
}
