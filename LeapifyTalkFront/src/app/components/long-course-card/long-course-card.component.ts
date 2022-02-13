import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-long-course-card',
  templateUrl: './long-course-card.component.html',
  styleUrls: ['./long-course-card.component.css']
})
export class LongCourseCardComponent implements OnInit {
  @Input() allCourse: boolean = false;
  @Input() courseData:any;
  @Input() course:any;
  @Input() isTherapist: boolean = false;
  @Output() deletedCourse = new EventEmitter();
  public thumbnail:string = '';
  public particluarCourse:any;
  public ratingDetails:any = {
    rating: 0,
    number_of_students_rated: 0
  };
  constructor(public courseService:CoursesService, public _snackBar:MatSnackBar,public router:Router) { }

  ngOnInit(): void {
  }

  route = () => {
    if(!this.isTherapist){
      this.router.navigate(['/course/'+this.course._id])
    }
    // [routerLink]="[!isTherapist&&'/course/'+course._id]"
  }

  deleteCourse = () => {
    let isSure = window.confirm('Are you sure to delete?')
    if(isSure){
      this.courseService.deleteCourse(this.course._id).subscribe((res:any) => {
        if(res.status === "ok"){
          this._snackBar.openFromComponent(ToastComponent, { data: { type:"success",message:"Course deleted successfully"}})
          this.deletedCourse.emit(this.course)
        }else{
          this._snackBar.openFromComponent(ToastComponent, { data: { type:"error",message:"Something went wrong!"}})
        }
      })
    }
  }

}
