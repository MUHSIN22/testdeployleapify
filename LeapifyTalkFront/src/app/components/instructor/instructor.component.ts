import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { TherapistService } from 'src/app/services/therapist.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
  public instructorId:any;
  public instructor:any;
  public totalPages:number = 0;
  public page:number = 1;
  public instructorCourseDetails:any;
  constructor(public instructorService: TherapistService, public router:ActivatedRoute, public route:Router, public courseService: CoursesService, public _snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.instructorId = this.router.snapshot.paramMap.get('id');
    
    this.instructorService.getInstructorById(this.instructorId).subscribe((res:any) => {
      this.instructor = res.oneInst
    })

    this.getCourse();
  }

  changePage = (page:number) => {
    this.page = page
    this.getCourse();
  }

  getCourse = ():void => {
    const queryParams:Params = {page: this.page}
    let token = localStorage.getItem('id_token')

    this.courseService.getCourseByInstId(this.instructorId, this.page).subscribe((res:any) =>{
      this.route.navigate(
        [],
        {
          relativeTo: this.router,
          queryParams:queryParams,
          queryParamsHandling: 'merge',
        }
      )
      this.totalPages = Math.ceil(res.response.courses.totalCourses/4)
      if(res.status === "ok"){
        this.instructorCourseDetails = {
          courses: res.response.courses.instructor1,
          totalPages: this.totalPages,
          page: this.page
        }
        this.instructorCourseDetails.courses.forEach((course:any) => {
          course.instructorName = res.response.courses.instructorName
        })
        
      }else{
        this._snackbar.openFromComponent(ToastComponent,{data:{type: 'error', message: "Something went wrong!"}})
      }
    })

  }

}
