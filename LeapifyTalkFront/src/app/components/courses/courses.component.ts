import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CoursesService } from 'src/app/services/courses.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public activeCategory: String = "";
  public courses: any;
  public mostPopular:any = []
  public totalPages:number = 0;
  public page:number = 1;
  public paginatedCourse:any;

  constructor(public router:ActivatedRoute,private coursesService:CoursesService, public _snackBar:MatSnackBar,public route:Router) { }

  ngOnInit(): void {
      this.router.queryParams.subscribe(params => {
        this.page = params.page? params.page : 1
        this.route.navigate(
          [],
          {
            relativeTo: this.router,
            queryParams:{page:this.page},
            queryParamsHandling: 'merge',
          }
        )
        this.activeCategory = params.belongs 
        
        if(this.activeCategory === "Popular" || !this.activeCategory){
          this.coursesService.getCoursesPage().subscribe((res:any) => {
            this.courses = res;
            this.mostPopular = res.sixCourses
          })
          this.coursesService.getCourseByCategories(this.page).subscribe((res:any) => {
            this.paginatedCourse = res.courses
            this.totalPages = Math.ceil(res.courseCount/4)
            
          })
        }else{
          this.coursesService.getCoursesPage(this.activeCategory).subscribe((res:any) => {
            
            if(res.status === "error"){
              this._snackBar.openFromComponent(ToastComponent, { data: { type:"error", message: "Something went wrong!"}})
            }
            this.courses = res;
            this.mostPopular = res.sixCourses  
          })

          this.coursesService.getCourseByCategories(this.page,this.activeCategory).subscribe((res:any) => {
            
            this.paginatedCourse = res.response.courses.courses    
            this.totalPages = Math.ceil(res.response.course1/4)
          })
        }
      })
      
  }

  changePage = (page:number) =>{
    this.route.navigate(
      [],
      {
        relativeTo: this.router,
        queryParams:{page:page},
        queryParamsHandling: 'merge',
      }
    )
  }
  

  addParams = () =>{
    this.route.navigate(
      [],
      {
        relativeTo: this.router,
        queryParams:{page: this.page},
      }
    )
  }  

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    autoWidth: true,
    margin: 20,
    navText: [`<i class="fas fa-arrow-left"></i>`,`<i class="fas fa-arrow-right"></i>`],
    responsive: {
      0:{
        items: 1
      },
      360:{
        items: 1.5
      },
      700:{
        items: 2
      },
      800:{
        items: 3
      },
      1200: {
        items: 4 
      },
      
    },
    nav: true
  }
}
