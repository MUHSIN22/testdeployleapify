import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit {

  loggedInUser: any;
  bookingdata : any = [];
  bookingnote: any;
  result: any;
  addnote!: FormGroup;
  filetoupload!: File;
  FileName: any;
  SplitFile: any;
  FileExtension: any;
  fileUrl: any;
  showErrormsg! : boolean;

  constructor(private httpService: HttpService, config: NgbModalConfig, private model: NgbModal, private fb: FormBuilder) 
  {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
    this.httpService.userSubject.subscribe(
      (user) => {
        this.loggedInUser = user;
      })
    // console.log(this.loggedInUser.email);

    this.addnote = this.fb.group({
      note:['',[Validators.required]],
      file:['',[Validators.required]],
    });

    this.Bookingdata();
  }

  Bookingdata()
  {
    var D_email = this.loggedInUser.email;
    this.httpService.BookingData({D_email}).subscribe(
      (res : any) => {
        this.bookingdata = res;
        // console.log(res,'Booking Data');
        // console.log(this.bookingdata,'Booking Data');
      })
  }

  AppJoin(appnote : any, _id : any, Link : any)
{
  // console.log(this.bookingdata);
  for(var i=0; i<this.bookingdata.length; i++)
  {
    if(this.bookingdata[i]._id == _id)
    {
      this.bookingnote = this.bookingdata[i];
    }
  }
  var Email = this.bookingnote.P_email;
  // console.log(Email);
  this.httpService.A_result({Email}).subscribe(
    (res: any) => {
      this.result = res.selection;
      // console.log(this.result);
    })
  this.model.open(appnote, { size: 'xl', backdropClass: 'backdrop-color' });
}

  ///////////////////////////// File Upload Start ///////////////////////////////////
  onFileSelected(event : any)
  {
    if (event.target.files.length > 0) 
    {
      this.filetoupload = event.target.files.item(0);
      
      this.FileName = this.filetoupload.name;
      this.SplitFile = this.FileName.split(".");
      this.FileExtension = this.SplitFile[1];
      // ============================================
      if( this.FileExtension == "pdf" || this.FileExtension == "doc")
      {
        // Show Image 
        var reader = new FileReader();
        reader.onload = (event:any) => 
        {
          this.fileUrl = event.target.result;
        }
        reader.readAsDataURL(this.filetoupload);
      }
      else if(this.FileExtension != "pdf" || this.FileExtension != "doc")
      {
        this.FileName = null;
       alert('Only pdf, doc files are allowed');
      }
      // ============================================
    }
  }
    ///////////////////////////// File Upload End ///////////////////////////////////////////
AddNote(addnote : any)
{
  this.showErrormsg = true;
  if (addnote.valid) {
    var fd = new FormData();
    fd.append('_id', this.bookingnote._id);
    fd.append('note', this.addnote.value.note);
    fd.append('file', this.filetoupload);
    // console.log(this.addnote.value.note,'Post Data');
    // console.log(this.filetoupload,'Post Data');
    this.httpService.AddNote(fd).subscribe(
      (post : any) => {
        alert(post.msg);
        // console.log(post,'Post');
        window.location.reload();
      });
  }
}

reload() {
  window.location.reload();
}

AppDone(_id : any)
{
  var AppDone = {
    _id: _id,
    Status: "3"
  }
  if(window.confirm('Are sure you want to Done this Appointment ?')){
    this.httpService.AppDone(AppDone).subscribe(
      (res: any) => {
        alert(res.msg);
        window.location.reload();
      })
  }
}

}
