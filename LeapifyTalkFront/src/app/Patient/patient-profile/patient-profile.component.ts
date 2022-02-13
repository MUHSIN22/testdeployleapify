import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';

declare var $: any;

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  show4: boolean = false;

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
  mobile: any;
  id: any;
  address: any;
  gender: any;
  image: any;
  resdata: any;
  showErrormsg: boolean = false;

  constructor(config: NgbModalConfig, rating: NgbRatingConfig, private model: NgbModal, private httpService: HttpService, private fb: FormBuilder) {
    rating.max = 5;
    rating.readonly = true;
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.updateuser = this.fb.group({
      // Image: [],
      Address: ['', [Validators.required]],
      Mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10)]],
      Gender: ['', [Validators.required]],
    });

    this.httpService.userSubject.subscribe(
      (user) => {
        this.loggedInUser = user;
      })
    // console.log(this.loggedInUser.email);
    this.UserData();
    // if(this.mobile == null && this.gender == null && this.address == null)
    // {
    //   alert("Please Complete Your Profile");
    //   // this.openXl(content:any);
    // }
  }

  openXl(content: any) {
    this.model.open(content, { size: 'xl', backdropClass: 'backdrop-color' });
  }

  headingOne() {
    this.show1 = !this.show1;
    $("#show1").click(function () {
      $(".data1").addClass("data_display1");
      $(".data2").removeClass("data_display2");
      $(".data3").removeClass("data_display3");
      $(".data4").removeClass("data_display4");
    });
  }
  headingTwo() {
    this.show2 = !this.show2;
    $("#show2").click(function () {
      $(".data2").addClass("data_display2");
      $(".data1").removeClass("data_display1");
      $(".data3").removeClass("data_display3");
      $(".data4").removeClass("data_display4");
    });
  }
  headingThree() {
    this.show3 = !this.show3;
    $("#show3").click(function () {
      $(".data3").addClass("data_display3");
      $(".data1").removeClass("data_display1");
      $(".data2").removeClass("data_display2");
      $(".data4").removeClass("data_display4");
    });
  }
  headingFour() {
    this.show4 = !this.show4;
    $("#show4").click(function () {
      $(".data4").addClass("data_display4");
      $(".data1").removeClass("data_display1");
      $(".data2").removeClass("data_display2");
      $(".data3").removeClass("data_display3");
    });
  }
  // ================== Get User Data Start =====================================
  UserData() {
    var Email = { email: this.loggedInUser.email }
    // console.log(Email,"Email");
    this.httpService.UserData(Email).subscribe(
      (res: any) => {
        this.Userdata = res;
        // console.log(this.Userdata,"UserData");
        this.mobile = this.Userdata.mobile;
        this.id = this.Userdata._id;
        this.address = this.Userdata.address;
        this.gender = this.Userdata.gender;
        // this.image = this.Userdata.image;
        ///////////////////////////////////////////////////////////////////
        this.updateuser.controls["Mobile"].setValue(this.mobile == null ? this.mobile = 'NA' : this.mobile),
        this.updateuser.controls["Address"].setValue(this.address == null ? this.address = 'NA' : this.address),
        this.updateuser.controls["Gender"].setValue(this.gender == null ? this.gender = 'NA' : this.gender)
        // this.updatepic.controls["Image"].setValue(this.image)
        /////////////////////////////////////////////////////////////////////
      })
  }

  // ======================= Get User Data End =====================================

  // ==================== Client Update Function Start ========================
  UserUpdate(updateuser: any) {
    this.showErrormsg = true;
    if (updateuser.valid) {
      var UpdateJson = {
        email: this.loggedInUser.email,
        address: this.updateuser.value.Address,
        mobile: this.updateuser.value.Mobile,
        gender: this.updateuser.value.Gender,
      }
      // var fd = new FormData();
      //   fd.append('file', this.filetoupload);
      //   console.log(fd,"formdata");
      this.httpService.PatientUpdate(UpdateJson).subscribe(
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
