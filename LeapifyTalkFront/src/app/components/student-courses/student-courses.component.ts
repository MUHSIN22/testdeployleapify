import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  public courseType:String = '';
  public courses:any;
  public isLoading:boolean = false;
  public isCourses:boolean = false;
  public isPurchased:boolean = false;
  public isCompleted:boolean = false;
  constructor(public route:ActivatedRoute, public router:Router,public coursesService:CoursesService, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.isCourses = false
      this.courseType = params.type
      if(this.courseType === "all" || !this.courseType){
        this.getPurchasedCourses()
        this.isPurchased = true
        this.isCompleted = false
      }else if(this.courseType === "ongoing"){
        this.getOngoingCourses()
        this.isPurchased = false
        this.isCompleted = false
      }else if(this.courseType === "completed"){
        this.getCompletedCourses()
        this.isPurchased = false
        this.isCompleted = true    
      }
    })
    
  }

  getPurchasedCourses = () => {
    this.isLoading = true
    this.coursesService.purchasedCourses().subscribe((res:any) => {
      
      if(res.status === "ok"){
        this.courses = res.finalArray
        if(res.finalArray.length > 0){
          this.isCourses = true
        }
      }else{
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"error",message:"Something went wrong!"}})
      }
      this.isLoading = false
    })
  }

  getOngoingCourses = () => {
    this.isLoading = true
    this.coursesService.getOngoingCourses().subscribe((res:any) => {
      if(res.status === "ok"){
        this.courses = res.finalArray
        if(this.courses.length > 0) {
          this.isCourses = true;
        }
      }else{
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"error",message:"Something went wrong!"}})
      }
    })
    this.isLoading = false
  }

  getCompletedCourses = () => {
    this.isLoading = true
    this.coursesService.getCompletedCourses().subscribe((res:any) => {
      if(res.status === "ok"){
        this.courses = res.finalArray
        if(this.courses.length > 0){
          this.isCourses = true
        }
      }else{
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"error",message:"Something went wrong!"}})
      }
    })
    this.isLoading = false
  }

  navClick = (type: string):void => {
    this.router.navigate([],{
      relativeTo: this.route,
      queryParams:{
        type: type
      },
      queryParamsHandling: 'merge'
    })
  }

}
