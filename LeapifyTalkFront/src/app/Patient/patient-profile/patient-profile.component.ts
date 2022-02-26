import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
// ---------------------------
video : boolean = true;
  intro : boolean = false;
  calendar : boolean = false;
  currentRate = 3;
  Doctordata : any = [];
  Pricedata : any = [];
  Price : any = [];
  ta_value! : boolean;
  v_value! : boolean;
  vr_value! : boolean;
  txt_value! : boolean;

  CurrentDate = this.datepipe.transform((new Date),'dd/MMM/YYY');
  CurrentDay = this.datepipe.transform((new Date), 'ccc');

  shiftdata : any = [];
  ResData : any = [];
  nextDate: any;
  nextDateValue: any;
  nextDayValue: any;
  nextFullDate: any;
  WeekDate: any = [];
  WeekDay: any = [];

  SundayValue: any;
  MondayValue: any;
  TuesdayValue: any;
  WednesdayValue: any;
  ThursdayValue: any;
  FridayValue: any;
  SaturdayValue: any;

  Sunday: any = [];
  Monday: any = [];
  Tuesday: any = [];
  Wednesday: any = [];
  Thursday: any = [];
  Friday: any = [];
  Saturday: any = [];

// --------------------------
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
  result: any = [];
  DoctorFilterdata: any = [];
  priceT = 0;
  cho:boolean=true;
  appoint!:boolean;
  cal!:boolean;
  comm!:boolean;
  pay!:boolean;

  constructor(config: NgbModalConfig, rating: NgbRatingConfig, private datepipe: DatePipe, private model: NgbModal, private httpService: HttpService, private fb: FormBuilder, private router: Router) {
    rating.max = 5;
    rating.readonly = true;
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.updateuser = this.fb.group({
      Image: [],
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
    this.DoctorData();
  }
// =======================================================================================
halfhourset = [
  { id: 7, name: "07:00 - 08:00" }, { id: 8, name: "08:00 - 09:00" }, { id: 9, name: "09:00 - 10:00" }, { id: 10, name: "10:00 - 11:00" }, { id: 11, name: "11:00 - 12:00" }, { id: 12, name: "12:00 - 13:00" }, { id: 13, name: "13:00 - 14:00" }, { id: 14, name: "14:00 - 15:00" }, { id: 15, name: "15:00 - 16:00" }, { id: 16, name: "16:00 - 17:00" }, { id: 17, name: "17:00 - 18:00" }, { id: 18, name: "18:00 - 19:00" }, { id: 19, name: "19:00 - 20:00" }, { id: 20, name: "20:00 - 21:00" }, { id: 21, name: "21:00 - 22:00" }, { id: 22, name: "22:00 - 23:00" }, { id: 23, name: "23:00 - 24:00" }, { id: 24, name: "24:00 - 01:00" }, { id: 1, name: "01:00 - 02:00" }, { id: 2, name: "02:00 - 03:00" }, { id: 3, name: "03:00 - 04:00" }, { id: 4, name: "04:00 - 05:00" }, { id: 5, name: "05:00 - 06:00" }, { id: 6, name: "06:00 - 07:00" },
]

DoctorData()
{
  this.httpService.DoctorsData({role : 'Doctor'}).subscribe(
    (res : any) => {
      this.Doctordata = res;
      // console.log(this.Doctordata);
      var res = this.result[29].selection;
      // console.log(res,'Result');
      for(var i=0; i<this.Doctordata.length; i++)
      {
        // console.log(this.Doctordata[i].specialitiesDetails,'Specialities');
        var Spec = this.Doctordata[i].specialitiesDetails;
        for(var k=0; k<Spec.length; k++)
        {
          // console.log(Spec,'Spec');
          for(var j=0; j<res.length; j++)
        {
          if(this.Doctordata[i].specialitiesDetails[k] == res[j])
          {
            // console.log('Hello...............');
            this.DoctorFilterdata[j] = this.Doctordata[i];
          }
        }
        }
      }
      // console.log(this.DoctorFilterdata,'Doctor Filter Data');
    })
}

Trial(priceT: any)
{
  console.log('Patient'+' : '+this.loggedInUser.email);
  console.log('Trial Price'+' : '+priceT);
  this.cal = true;
  this.cho = false;
}

selectedata(name : any,CurrentDate : any,WeekDate : any, week : any)
{
  console.log('Current Date'+' : '+CurrentDate);
  console.log('Slot'+' : '+name);
  console.log('Week Date'+' : '+WeekDate);
  console.log('Week Day'+' : '+week);
  this.cal = false;
  this.comm = true;
}

commdata()
{
  this.pay = true;
  this.comm = false; 
}

payment()
{
  // this.pay = false;
  alert('Your Appointment Is Booked');
  window.location.reload();
}

Onvideo()
{
  this.video = true;
  this.intro = false;
  this.calendar = false;
}
Onintro()
{
  this.video = false;
  this.intro = true;
  this.calendar = false;
}
Oncalendar(_id : any, email :any)
{
  this.video = false;
  this.intro = false;
  this.calendar = true;
  this.httpService.ShiftData({email}).subscribe(
    (res : any) => {
      this.shiftdata = res;
      this.ResData = this.shiftdata[0];
      // console.log(this.shiftdata);
      this.Sunday = this.ResData.sun;
      this.Monday = this.ResData.mon;
      this.Tuesday = this.ResData.tue;
      this.Wednesday = this.ResData.wed;
      this.Thursday = this.ResData.thu;
      this.Friday = this.ResData.fri;
      this.Saturday = this.ResData.sat;  
    });
  for (var i = 0; i <= 6; i++) {
    this.nextDate = new Date;
    this.nextFullDate = this.nextDate.setDate(this.nextDate.getDate() + i);

    this.nextDateValue = this.datepipe.transform((this.nextFullDate),'dd/MM');
    this.nextDayValue = this.datepipe.transform((this.nextDate), 'ccc');

    this.WeekDate[i] = this.nextDateValue;
    this.WeekDay[i] = this.nextDayValue;
  }
  // =================================================================================
  // this.ShiftData();
  for (var j = 0; j < this.WeekDay.length; j++) {
    // -----------------------------------------------------------------------------
    if(this.WeekDay[j] == 'Sun')
      {
        for (var i = 0; i < this.ResData.Sunday.length; i++) {
          this.SundayValue = this.ResData.Sunday[i];
          this.Sunday[i] = this.SundayValue;
        }
      // console.log(this.Sunday, 'Sunday Array Elements...............');
      }
    // ---------------------------------------------------------------------------
    if (this.WeekDay[j] == 'Monday') {
      for (var i = 0; i < this.ResData.Monday.length; i++) {
        this.MondayValue = this.ResData.Monday[i];
        this.Monday[i] = this.MondayValue;
      }
      // console.log(this.Monday, 'Monday Array Elements...............');
    }
    // ----------------------------------------------------------------------------
    if (this.WeekDay[j] == 'Tuesday') {
      for (var i = 0; i < this.ResData.Tuesday.length; i++) {
        this.TuesdayValue = this.ResData.Tuesday[i];
        this.Tuesday[i] = this.TuesdayValue;
      }
      // console.log(this.Tuesday, 'Tuesday Array Elements...............');
    }
    // -----------------------------------------------------------------------------
    if (this.WeekDay[j] == 'Wednesday') {
      for (var i = 0; i < this.ResData.Wednesday.length; i++) {
        this.WednesdayValue = this.ResData.Wednesday[i];
        this.Wednesday[i] = this.WednesdayValue;
      }
      // console.log(this.Wednesday, 'Wednesday Array Elements...............');
    }
      // ----------------------------------------------------------------------------
      if(this.WeekDay[j] == 'Thursday')
      {
        for (var i = 0; i < this.ResData.Thursday.length; i++) {
          this.ThursdayValue = this.ResData.Thursday[i];
          this.Thursday[i] = this.ThursdayValue;
        }
        // console.log(this.Thursday, 'Thursday Array Elements...............');
      }
      // -----------------------------------------------------------------------------
      if(this.WeekDay[j] == 'Friday')
      {
        for (var i = 0; i < this.ResData.Friday.length; i++) {
          this.FridayValue = this.ResData.Friday[i];
          this.Friday[i] = this.FridayValue;
        }
        // console.log(this.Friday, 'Friday Array Elements...............');
      }
      // -------------------------------------------------------------------------------
      if(this.WeekDay[j] == 'Saturday')
      {
        for (var i = 0; i < this.ResData.Saturday.length; i++) {
          this.SaturdayValue = this.ResData.Saturday[i];
          this.Saturday[i] = this.SaturdayValue;
        }
      //  console.log(this.Saturday, 'Saturday Array Elements...............');
      }
      // ----------------------------------------------------------------------------------
  }
  // =================================================================================

}

BookAppointment(content : any, email :any)
{
  // console.log(email);
  this.httpService.PriceData({email}).subscribe(
    (res : any) => {
      this.Pricedata = res;
      this.Price = this.Pricedata[0];
    if(this.Price.ta_value == 1)
    {
      this.ta_value = true;
    }
    if(this.Price.v_value == 'true')
    {
      this.v_value = true;
    }
    if(this.Price.vr_value == 'true')
    {
      this.vr_value = true;
    }
    if(this.Price.txt_value == 'true')
    {
      this.txt_value = true;
    }
    this.httpService.ShiftData({email}).subscribe(
      (res : any) => {
        this.shiftdata = res;
        this.ResData = this.shiftdata[0];
        // console.log(this.shiftdata);
        this.Sunday = this.ResData.sun;
        this.Monday = this.ResData.mon;
        this.Tuesday = this.ResData.tue;
        this.Wednesday = this.ResData.wed;
        this.Thursday = this.ResData.thu;
        this.Friday = this.ResData.fri;
        this.Saturday = this.ResData.sat;  
      });
    for (var i = 0; i <= 6; i++) {
      this.nextDate = new Date;
      this.nextFullDate = this.nextDate.setDate(this.nextDate.getDate() + i);
  
      this.nextDateValue = this.datepipe.transform((this.nextFullDate),'dd/MMM/YYY');
      this.nextDayValue = this.datepipe.transform((this.nextDate), 'ccc');
  
      this.WeekDate[i] = this.nextDateValue;
      this.WeekDay[i] = this.nextDayValue;
    }
    this.model.open(content, { size: 'xl', backdropClass : 'backdrop-color' });
  // ==============================================================================

  $('fieldset').hide().eq(0).show();
  $("#finish-step").prop("hidden",true);
  
  $('#next-step').click(function() {
      var current = $('fieldset:visible'),
          next = current.next('fieldset');
      if (next.length === 0) {
          next = current.nextUntil('fieldset').next('fieldset');
      }
      current.hide();
      next.show();
      if (next.nextUntil('fieldset').next('fieldset').add(next.next('fieldset')).length === 0) {
          $("#next-step").prop("disabled",true);
          $("#next-step").prop("hidden",true);
          $("#finish-step").prop("hidden",false);
      }
      $("#previous-step").prop("disabled",false);  
  });
  $('#previous-step').click(function() {
      var current = $('fieldset:visible'),
          prev = current.prev('fieldset');
      if (prev.length === 0) {
          prev = current.prevUntil('fieldset').prev('fieldset');
      }
      current.hide();
      prev.show();
      if (prev.prevUntil('fieldset').prev('fieldset').add(prev.prev('fieldset')).length === 0) {
          $("#previous-step").prop("disabled",true);
      }
      $("#next-step").prop("disabled",false);
      $("#next-step").prop("hidden",false);
      $("#finish-step").prop("hidden",true);
  });

});

// ==================================================================================
}
// =======================================================================================
  openXl(content: any) {
    this.model.open(content, { size: 'xl', backdropClass: 'backdrop-color' });
  }

  Book(book: any) {
    this.model.open(book, { size: 'xl', backdropClass: 'backdrop-color' });
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
        // console.log(this.Userdata.result,"UserData");
        this.mobile = this.Userdata.mobile;
        this.id = this.Userdata._id;
        this.address = this.Userdata.address;
        this.gender = this.Userdata.gender;
        this.image = this.Userdata.image;
        this.result = this.Userdata.result;
        // console.log(this.result[29].selection);
        if(this.result == undefined || this.result == '')
        {
          if(window.confirm('There are questions and a break for refreshments in the middle ?')){
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
   onFileSelected(event : any)
   {
     if (event.target.files.length > 0) 
     {
       this.filetoupload = event.target.files.item(0);
       
       this.ImgName = this.filetoupload.name;
       this.SplitImage = this.ImgName.split(".");
       this.ImgExtension = this.SplitImage[1];
       // ============================================
       if( this.ImgExtension == "jpg" || this.ImgExtension == "png")
       {
         // Show Image 
         var reader = new FileReader();
         reader.onload = (event:any) => 
         {
           this.imageUrl = event.target.result;
         }
         reader.readAsDataURL(this.filetoupload);
       }
       else if(this.ImgExtension != "jpg" || this.ImgExtension != "png")
       {
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
      console.log(fd,"formdata");
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
