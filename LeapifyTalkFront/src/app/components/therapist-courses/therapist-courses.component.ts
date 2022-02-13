import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { TherapistService } from 'src/app/services/therapist.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-therapist-courses',
  templateUrl: './therapist-courses.component.html',
  styleUrls: ['./therapist-courses.component.css']
})
export class TherapistCoursesComponent implements OnInit {
  public courseData: any = {
    admin:true,
    courses: [],
    searchResults: []
  };
  public totalPages:number = 0
  public page:number = 1;
  public isNotCourses:boolean = false
  constructor(
    public therapistService:TherapistService,
    public courseService:CoursesService, 
    public _snackBar:MatSnackBar, 
    private router:Router, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  // Function for get the courses
  getCourse = ():void => {
    const queryParams:Params = {page: this.page}
    let token = localStorage.getItem('id_token')

    this.courseService.getCoursesOfInstructor(token, this.page).subscribe((res:any) =>{
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams:queryParams,
          queryParamsHandling: 'merge',
        }
      )
      this.totalPages = Math.ceil(res.response.courses.totalCourses/4)
      
      if(res.status === "ok"){
        if(res.response.courses.totalCourses === 0){
          this.isNotCourses = true
        }else{
          this.courseData.courses = res.response.courses.instructor1 
          this.courseData.courses.forEach((course:any) =>{
            course.instructorName = res.response.courses.instructorName
          })
        }
      }else{
        this._snackBar.openFromComponent(ToastComponent,{data:{type: "error", message: res.msg}})
      }
    })
  }

  // For handle the search
  getSearchInput = (input:any) => {
    this.therapistService.getSearch(input).subscribe((res:any) => {
      if(res.msg){
        this.courseData.searchResults = []
      }else{
        this.courseData.searchResults = res.response.courses.instructor1 ;
      }
    })
  }

  // For change the page
  changePage = (page:number) => {

    this.page = page
    this.getCourse();
  }

  filterCourse = (course:any) => {
    this.courseData.courses.forEach((item:any,index:number) => {
      if(course === item){
        this.courseData.courses.splice(index,1)
      }
    })
  }
}

