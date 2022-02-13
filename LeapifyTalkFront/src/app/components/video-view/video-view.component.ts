import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {
  public isStretch:boolean = false;
  public sectionId:any;
  public section:any;
  public isLoading:boolean = false;
  public lessonIndex:number = 0;
  public isPopup:boolean = false;
  public rateDetails:any;
  public courseId:any;
  constructor(private route: ActivatedRoute,private coursesService:CoursesService, public _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param:any) => {
      this.route.queryParams.subscribe((res:any) => {
        this.lessonIndex = parseInt(res.inx)
        this.courseId = res.c
      })
      this.sectionId = param.params.id;
      this.getSection()
    })
  }

  getSection = () =>{
    this.coursesService.getSectionDetails(this.sectionId,this.courseId).subscribe((res:any) =>{
      if(res.status === "ok"){
        this.section = res.sectionFind
        this.rateDetails = res.findRating

        
        if(this.section.files.length<this.lessonIndex){
          this.lessonIndex = 0
        }
        
      }
      
    })
  }

  // To set the progress of the section
  setSectionProgress = (status:boolean) =>{
    let data = {
      courseID: this.section.course_id,
      sectionID: this.section._id
    }
    this.coursesService.handleCourseProgress(data).subscribe((res:any) => {})
    if(this.rateDetails.review === null){
      this.isPopup = true;
    }
  }

  // For review the course
  setTheReview = (data:any) => {
    data.courseID = this.section.course_id
    this.coursesService.postRating(data).subscribe((res:any)=>{

      if(res.status === "ok"){
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"success", message:"Thank for review"}})
      }
    })
  }

  getVideoDuration = (duration:any) => {

    
  }

  stretchToEnd = (status:boolean) => {
    this.isStretch = status
  }

  closeLesson = () => {
    this.isStretch = true;
  }

  openLesson = () => {
    this.isStretch = false
  }

  downloadFile = (link:any) => {

    let tag = document.createElement('a')
    tag.setAttribute("target","_blank")
    tag.setAttribute("download",link)
    tag.setAttribute("href","")
    document.body.appendChild(tag)
    tag.click() 
  }


}
