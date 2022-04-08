import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-companion-course-card',
  templateUrl: './companion-course-card.component.html',
  styleUrls: ['./companion-course-card.component.css']
})
export class CompanionCourseCardComponent implements OnInit {
  public starHover: number = 0;
  public currentRating: number = 0;
  public rateData:any;
  @Input() course:any;
  constructor(private router:Router, private courseService:CoursesService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.starHover = this.course.rates
  }

  rateTheCourse = (courseId:string,rating:number):void => {
    this.starHover = rating;
    this.currentRating = rating;
    this.rateData = {
      rates:rating,
      courseID: this.course._id
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
    console.log(rating);
    
    this.starHover = rating
  }
  onMouseOutStar = ():void => {
    this.starHover = this.currentRating !== 0 ? this.currentRating : 0
  }

  navigateToCourse = (event:any):void => {
    console.log(this.course);
    
    if(event.target.nodeName !== "I"){
      console.log(this.course);
      this.router.navigateByUrl('/course-view/'+this.course.sections._id+"?inx=0&c="+this.course._id)
    }
  }
}
