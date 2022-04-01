import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  currentRate :any = 3;
  book : boolean = false;
  upcome : boolean = true;
  brcourse : boolean = false;
  mycourse : boolean = true;

  updateuser!: FormGroup;
  updatepic!: FormGroup;
  loggedInUser: any;
  Userdata: any;
  ProfilePic: any;
  filetoupload!: File;
  imageUrl!: string;
  SplitImage: any;
  ImgName: any;
  ImgExtension: any;
  resdata: any;
  showErrormsg: boolean = false;
  id: any;
  address: any;
  gender: any;
  image: any;
  mobile: any;
  result: any = [];
  bookingdata: any = [];

  constructor(config: NgbModalConfig, rating: NgbRatingConfig, private model: NgbModal, private httpService: HttpService, private fb: FormBuilder, private router: Router,) 
  {
    rating.max = 5;
    rating.readonly = true;
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {

    this.httpService.userSubject.subscribe(
      (user) => {
        this.loggedInUser = user;
      })
    // console.log(this.loggedInUser.email);

    this.updateuser = this.fb.group({
      Image: [],
      Address: ['', [Validators.required]],
      Mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10)]],
      Gender: ['', [Validators.required]],
    });

    this.UserData();
    this.Bookingdata();
  }

  Bookingdata() {
    var P_email = this.loggedInUser.email;
    this.httpService.Bookdata({ P_email }).subscribe(
      (res: any) => {
        this.bookingdata = res;
        // console.log(this.bookingdata,'Booking Data');
      });
  }

  Book()
  {
    this.book = true;
    this.upcome = false;
  }

  Upcom()
  {
    this.upcome = true;
    this.book = false;
  }

  Mycourse()
  {
    this.mycourse = true;
    this.brcourse = false;
  }

  Brcourse()
  {
    this.mycourse = false;
    this.brcourse = true;
  }

  openXl(edit: any) {
    this.model.open(edit, { size: 'lg', backdropClass: 'backdrop-color' });
  }

  reload() {
    window.location.reload();
  }
  // ================== Get User Data Start =====================================
  UserData() {
    var Email = { email: this.loggedInUser.email }
    // console.log(Email,"Email");
    this.httpService.UserData(Email).subscribe(
      (res: any) => {
        this.Userdata = res;
        // console.log(this.Userdata.result,"UserData");
        this.mobile = this.Userdata.mobile;
        this.id = this.Userdata._id;
        this.address = this.Userdata.address;
        this.gender = this.Userdata.gender;
        this.image = this.Userdata.image;
        this.result = this.Userdata.result;
        // console.log(this.result[29].selection);
        if (this.result == undefined || this.result == '') {
          if (window.confirm('There are questions and a break for refreshments in the middle ?')) {
            this.router.navigate(['/get-started']);
          }
        }
        ///////////////////////////////////////////////////////////////////
        this.updateuser.controls["Mobile"].setValue(this.mobile == null ? this.mobile = 'NA' : this.mobile),
          this.updateuser.controls["Address"].setValue(this.address == null ? this.address = 'NA' : this.address),
          this.updateuser.controls["Gender"].setValue(this.gender == null ? this.gender = 'NA' : this.gender)
        // this.updatepic.controls["Image"].setValue(this.image)
        /////////////////////////////////////////////////////////////////////
      })
  }

  // ======================= Get User Data End =====================================
  ///////////////////////////// File Upload Start ///////////////////////////////////
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.filetoupload = event.target.files.item(0);

      this.ImgName = this.filetoupload.name;
      this.SplitImage = this.ImgName.split(".");
      this.ImgExtension = this.SplitImage[1];
      // ============================================
      if (this.ImgExtension == "jpg" || this.ImgExtension == "png") {
        // Show Image 
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.filetoupload);
      }
      else if (this.ImgExtension != "jpg" || this.ImgExtension != "png") {
        this.ImgName = null;
        alert('Only jpg, png files are allowed');
      }
      // ============================================
    }
  }
  ///////////////////////////// File Upload End ///////////////////////////////////////////
  // ==================== Client Update Function Start ========================
  UserUpdate(updateuser: any) {
    this.showErrormsg = true;
    if (updateuser.valid) {
      var fd = new FormData();
      fd.append('email', this.loggedInUser.email),
        fd.append('address', this.updateuser.value.Address),
        fd.append('mobile', this.updateuser.value.Mobile),
        fd.append('gender', this.updateuser.value.Gender),
        fd.append('file', this.filetoupload);
      console.log(fd, "formdata");
      this.httpService.PatientUpdate(fd).subscribe(
        (post: any) => {
          this.resdata = post;
          alert(this.resdata.msg);
          // console.log(post,'Post');
          window.location.reload();
        });
    }
  }

  // ==================== Client Update Function End ========================

}
