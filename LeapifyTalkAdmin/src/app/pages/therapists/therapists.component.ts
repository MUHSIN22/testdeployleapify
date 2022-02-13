import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { HttpService } from '../../services/http.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
@Component({
  selector: 'ngx-therapists',
  templateUrl: './therapists.component.html',
  styleUrls: ['./therapists.component.scss']
})
export class TherapistsComponent  {
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

  constructor(private httpService: HttpService, private toastr: NbToastrService) {

  }


  ngOnInit() {
    this.getTherapists()
  }

  getTherapists = () => {
    this.httpService.getTherapists(this.page).subscribe((res:any) => {
      if(res.status === "ok"){
        this.collectionSize = res.msg.total
        this.source.load(res.msg.courses)
        
      }
    })
  }

  onPageChange = (page:any) => {
    this.getTherapists()
    
  }

  onCustomAction = (event:any) => {
    console.log(event.action);
    let confirm = window.confirm("Are you sure to change therapist status?")
    if(confirm){
      switch(event.action){
        case "approve":
          this.httpService.approveTherapists(event.data._id).subscribe((res:any) => {
            if(res.status === 'ok'){
              this.getTherapists()
              this.toastr.success(res.msg,"Message")
            }else{
              this.toastr.danger(res.msg,"Error")
            }
          })
          break;
        case "deny":
          this.httpService.rejectTherapists(event.data._id).subscribe((res:any) => {
            if(res.status === 'ok'){
              this.getTherapists();
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
