import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService, NB_THEME_OPTIONS } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { environment } from '../../../environments/environment.prod';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'ngx-approved-therapists',
  templateUrl: './approved-therapists.component.html',
  styleUrls: ['./approved-therapists.component.scss']
})
export class ApprovedTherapistsComponent implements OnInit {

  public therapists:any;
  public page:number  = 1
  public collectionSize:number = 0
  public settings:any;
  public cardTitle:string = ''

  ApprovedSettings = {
    actions: {
      add: false,
      delete: false,
      edit: false
    },
    pager:{
      display: false
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: false,
        valuePrepareFunction : (email) => {
          return email ? email : "No email"
        }
      },
      phone: {
        title: 'Mobile',
        type: 'string',
        filter: false,
        valuePrepareFunction: (phone) => {
          return phone ? phone : "No phone"
        }
      },
      _id: {
        title: 'Profile',
        type: 'html',
        filter: false,
        valuePrepareFunction: (profileID) => {
          return `<a href="${environment.frontendURL}/instructor/${profileID}" target="_blank">View Profile</a>`
        }
      },
      created_at: {
        title: 'Date',
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
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: false,
        valuePrepareFunction : (email) => {
          return email ? email : "No email"
        }
      },
      phone: {
        title: 'Mobile',
        type: 'string',
        filter: false,
        valuePrepareFunction: (phone) => {
          return phone ? phone : "No phone"
        }
      },
      created_at: {
        title: 'Date',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) =>{
          return new Date(date).toLocaleDateString()
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private httpService: HttpService, private toastr: NbToastrService, private router:ActivatedRoute ) {

  }


  ngOnInit() {
    // this.getTherapists()
    this.approvedOrRejected()
  }

  approvedOrRejected = () => {
    this.router.url.subscribe((res:any) => {
      if(res[0].path === "approved-therapists"){
        this.getApprovedTherapists()
        this.settings = this.ApprovedSettings
        this.cardTitle = 'Approved Therapists'
      }else if(res[0].path === "rejected-therapists"){
        this.settings = this.rejectedSettings
        this.cardTitle = "Rejected Therapists"
        this.getRejectedTherapists();
      }
    })
  }

  getApprovedTherapists = () => {
    this.httpService.getApprovedTherapists(this.page).subscribe((res:any) => {
      console.log(res);
      this.source.load(res.msg.courses)
      this.collectionSize = res.msg.total
    })
  }
  
  getRejectedTherapists = () => {
    this.httpService.getRejectedTherapists(this.page).subscribe((res:any) => {
      console.log(res);
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
          this.httpService.approveTherapists(event.data._id).subscribe((res:any) => {
            if(res.status === 'ok'){
              this.approvedOrRejected()
              this.toastr.success(res.msg,"Message")
            }else{
              this.toastr.danger(res.msg,"Error")
            }
          })
          break;
        case "deny":
          this.httpService.rejectTherapists(event.data._id).subscribe((res:any) => {
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
