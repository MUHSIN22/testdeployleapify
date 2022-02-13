import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-student-dashboard-course-card',
  templateUrl: './student-dashboard-course-card.component.html',
  styleUrls: ['./student-dashboard-course-card.component.css']
})
export class StudentDashboardCourseCardComponent implements OnInit {
  public starHover: number = 0;
  public currentRating: number = 0;
  public rateData:any;
  @Input() course:any;
  @Input() isPurchased: boolean = false;
  @Input() isCompleted:boolean =false
  constructor(private router:Router, private courseService:CoursesService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.course.courses.progress = Math.round(this.course.courses.progress)
    if(this.course.ratings){
      this.starHover = this.course.ratings.rates
      this.currentRating = this.course.ratings.rates
    }
    
  }
  rateTheCourse = (courseId:string,rating:number):void => {
    
    this.rateData = {
      rates:rating,
      courseID: this.course.courses._id
    }
    this.courseService.postRating(this.rateData).subscribe((res:any) => {
      if(res.status === "ok"){
        this.starHover = rating;
        this.currentRating = rating;
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"success", message:"Thanks for rating"}})
      }else{
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"error", message:res.msg}})
      }
      
    })
  }
  onMouseOverStar = (rating:number):void =>{
    this.starHover = rating
  }
  onMouseOutStar = ():void => {
    this.starHover = this.currentRating !== 0 ? this.currentRating : 0
  }

  navigateToSection = (event:any) =>{
    if(event.target.nodeName !== "I"){
      this.router.navigateByUrl('/course-view/'+this.course.courses.sections[0]+"?inx=0&c="+this.course.courses._id)
    }
  }
}
