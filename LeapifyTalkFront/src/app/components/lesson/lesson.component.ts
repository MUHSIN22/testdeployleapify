import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  @Input() section:any;
  @Input() isAlreadyPurchased:boolean = false;
  public isLessonExpand:boolean = false;
  public loggedInUser:any;
  constructor(private httpService:HttpService, public router:Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedInUser = this.httpService.loggedInUser
    
  }
  expandLesson = () => {
    this.isLessonExpand = true
  }

  navigateToSection = (index:number) => {
    if(this.isAlreadyPurchased){
      this.router.navigateByUrl('/course-view/'+this.section._id+"?inx="+index+"&c="+this.section.course_id)
    }else if(this.loggedInUser && this.loggedInUser.user !== "therapist"){
      this._snackBar.openFromComponent(ToastComponent,{data:{type:"warning",message:"Buy the course for view"}})
    }else{
      this.router.navigateByUrl('/signin')
    }
  }

}
