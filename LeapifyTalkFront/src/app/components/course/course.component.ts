import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { HttpService } from 'src/app/services/http.service';
import { StudentService } from 'src/app/services/student.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  public courseId:any;
  public course:any;
  public commentPage:number = 1;
  public isPlayed:boolean = false;
  public lastUpdated:any;
  public instructorCourses:any;
  public isLessonExpand:boolean = false;
  public isLoading:boolean = false
  public isAlreadyPurchased:boolean = false
  public isReview:boolean = false;
  public reviews:any[] = [];
  public lessonContentCounts = {
    doc: 0,
    pdf: 0,
    video: 0
  };

  constructor(
    public router:Router,
    public route: ActivatedRoute, 
    public coursesService: CoursesService,
    public httpService: HttpService,
    public _snackBar:MatSnackBar,
    private studentService:StudentService
  ) { }

  ngOnInit(): void {
    let loggedInUser = this.httpService.loggedInUser
    this.route.paramMap.subscribe((params:any)=>{
      this.courseId = params.params.id
      this.coursesService.getCourseById(this.courseId).subscribe((res:any) => {
        this.course = res.resp.instructorCourse
        this.instructorCourses = res.resp.instCourses
        this.lastUpdated = new Date(res.resp.instructorCourse.last_updated).toLocaleDateString()
        this.checkWhetherCourseAlreadyPurchased();
        this.getReviews()
        this.getNumberOfFiles(this.course.sections)
        
      })
      
    })

  }

  getNumberOfFiles = (section:any) => {
    section.forEach((section:any )=> {
      section.files.forEach((file:any) => {
        if(file.doc){
          this.lessonContentCounts.doc++
        }
        if(file.video){
          this.lessonContentCounts.video++
        }
        if(file.pdf){
          this.lessonContentCounts.pdf++
        }
      })
    })
  }

  getReviews = () => {
    this.coursesService.getReview(this.course._id,this.commentPage).subscribe((res:any) => {
      if(res.status === "ok"){
        this.reviews = [...this.reviews,...res.msg.courses]
      }
    })
  }

  getMoreReviews = () => {
    this.commentPage++
    this.getReviews()
  }

  checkWhetherCourseAlreadyPurchased  = () =>{
    this.coursesService.purchasedCourses().subscribe((res:any)=>{
      let purchasedCourses = res.finalArray
      purchasedCourses.forEach((course:any) => {
        if(course.courses._id === this.course._id){
          this.isAlreadyPurchased = true
        }
      })
    })
  }

  playVideo = () => {
    this.isPlayed = true
  }

  buyCourse = () => {
    let loggedInUser = this.httpService.loggedInUser
    if(this.isAlreadyPurchased){
      this.router.navigateByUrl('/student/course')
    }else if(loggedInUser && loggedInUser.user !== "therapist"){
      this.isLoading = true;
      this.coursesService.purchaseCourse(this.courseId).subscribe(res => {
        this.isLoading = false
        if(res.status === "error"){
          this._snackBar.openFromComponent(ToastComponent, { data: { type:"error",message:res.msg}})
        }else {
          window.location.href = res.link
        }
        
      })
    }else{
      this._snackBar.openFromComponent(ToastComponent, { data: { type:"error",message:"Signin for purchase courses"}})
      this.router.navigateByUrl('/signin')
    }
  }

  
}
