import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { environment } from '../../../environments/environment.prod';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'ngx-approved-courses',
  templateUrl: './approved-courses.component.html',
  styleUrls: ['./approved-courses.component.scss']
})
export class ApprovedCoursesComponent implements OnInit {

  public therapists:any;
  public page:number  = 1
  public collectionSize:number = 0
  public settings:any;
  public cardTitle:String

  ApprovedSettings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    pager:{
      display: false
    },
    columns: {
      course_title: {
        title: 'Course Title',
        type: 'string',
        filter: false
      },
      instructor: {
        title: 'Instructor',
        type: 'string',
        filter: false,
        valuePrepareFunction : (instructor) => {
          return instructor.name
        }
        
      },
      _id:{
        title: 'Link to course',
        type: 'html',
        filter: false,
        valuePrepareFunction: (id) => {
          return `<a href="${environment.frontendURL}/course/${id}" target="_blank">View course</a>`
        }
      },
      original_price:{
        title: 'Price',
        type: 'number',
        filter: false
      },
      offer_price:{
        title: 'Discounted price',
        type: 'number',
        filter: false
      },
      created_at: {
        title: 'Created At',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) =>{
          return new Date(date).toLocaleDateString()
        }
      }
    },
  };

  rejectedSettings = {
    actions: {
      add: false,
      delete: false,
      edit: false
    },
    pager:{
      display: false
    },
    columns: {
      course_title: {
        title: 'Course Title',
        type: 'string',
        filter: false
      },
      instructor: {
        title: 'Instructor',
        type: 'string',
        filter: false,
        valuePrepareFunction : (instructor) => {
          return instructor.name
        }
        
      },
      photo: {
        title: 'Thumbnail',
        type: 'html',
        filter: false,
        valuePrepareFunction : (photo) => {
          return `<a href="${photo}">View Thumbnail</a>`
        }
      },
      video:{
        title: "Preview",
        type: 'html',
        filter: false,
        valuePrepareFunction : (video) => {
          return `<a href="${video}" target="_blank">View preview</a>`
        }
      },
      offer_price:{
        title: 'Discounted Price',
        type: 'number',
        filter: false
      },
      original_price:{
        title: 'Price',
        type: 'number',
        filter: false
      },
      created_at: {
        title: 'Created At',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) =>{
          return new Date(date).toLocaleDateString()
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private httpService: HttpService, private toastr: NbToastrService, private router: ActivatedRoute) {

  }


  ngOnInit() {
    this.approvedOrRejected();
  }

  approvedOrRejected = () => {
    this.router.url.subscribe((res:any) => {
      if(res[0].path === "approved-courses") {
        this.getApprovedCourses()
        this.settings = this.ApprovedSettings
        this.cardTitle = "Approved Courses"
      }else if(res[0].path === "rejected-courses"){
        this.getRejectedCourses()
        this.settings = this.rejectedSettings
        this.cardTitle = "Rejected Courses"
      }
      
    })
  }

  getApprovedCourses = () => {
    this.httpService.getApprovedCourses(this.page).subscribe((res:any) => {
      this.source.load(res.msg.courses)
      this.collectionSize = res.msg.total
      
    })
  }

  getRejectedCourses = () => {
    this.httpService.getRejectedCourses(this.page).subscribe((res:any) => {
      this.source.load(res.msg.courses)
      this.collectionSize = res.msg.total
      
    })
  }


  onPageChange = (page:any) => {
    this.approvedOrRejected()
  }

  onCustomAction = (event:any) => {
    console.log(event.action);
    let confirm = window.confirm("Are you sure to change therapist status?")
    if(confirm){
      switch(event.action){
        case "approve":
          this.httpService.approveCourses(event.data._id).subscribe((res:any) => {
            if(res.status === 'ok'){
              this.approvedOrRejected()
              this.toastr.success(res.msg,"Message")
            }else{
              this.toastr.danger(res.msg,"Error")
            }
          })
          break;
        case "deny":
          this.httpService.rejectCourse(event.data._id).subscribe((res:any) => {
            if(res.status === 'ok'){
              this.approvedOrRejected()
              this.toastr.success(res.msg,"Message")
            }else{
              this.toastr.danger(res.msg,"Error")
            }
          })
          break;
        default:
          break;
      }   
    }else{
      this.toastr.danger("Operation Cancelled","Cancellation")
    }
  }
}
