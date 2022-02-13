import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'ngx-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public therapists:any;
  public page:number  = 1
  public collectionSize:number = 0

  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
      custom: [
        { name: "approve", title: '<i class="fas fa-check-circle text-success mr-5"></i>'},
        { name: "deny", title: '<i class="fas fa-times-circle text-danger ml-5"></i>'}
      ],
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

  constructor(private httpService: HttpService, private toastr: NbToastrService) {

  }


  ngOnInit() {
    this.getCourses()
  }

  getCourses = () => {
    this.httpService.getCourses(this.page).subscribe((res:any) => {
      if(res.status === "ok"){
        this.collectionSize = res.msg.total
        this.source.load(res.msg.courses)
      }
    })
  }

  onPageChange = (page:any) => {
    this.getCourses()
  }

  onCustomAction = (event:any) => {
    console.log(event.action);
    let confirm = window.confirm("Are you sure to change therapist status?")
    if(confirm){
      switch(event.action){
        case "approve":
          this.httpService.approveCourses(event.data._id).subscribe((res:any) => {
            if(res.status === 'ok'){
              this.getCourses()
              this.toastr.success(res.msg,"Message")
            }else{
              this.toastr.danger(res.msg,"Error")
            }
          })
          break;
        case "deny":
          this.httpService.rejectCourse(event.data._id).subscribe((res:any) => {
            if(res.status === 'ok'){
              this.getCourses()
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
