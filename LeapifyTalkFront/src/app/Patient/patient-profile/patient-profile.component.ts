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
  video: boolean = true;
  intro: boolean = false;
  calendar: boolean = false;
  currentRate = 3;
  Doctordata: any = [];
  Pricedata: any = [];
  Price: any = [];
  ta_value!: boolean;
  v_value!: boolean;
  vr_value!: boolean;
  txt_value!: boolean;

  CurrentDate = this.datepipe.transform((new Date), 'dd/MMM/YYY');
  CurrentDay = this.datepipe.transform((new Date), 'ccc');

  shiftdata: any = [];
  ResData: any = [];
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
  cho: boolean = true;
  appoint!: boolean;
  appoint_v!: boolean;
  appoint_vr!: boolean;
  appoint_txt!: boolean;
  cal!: boolean;
  Recal!: boolean;
  comm!: boolean;
  pay!: boolean;
  WeekData: any = [];
  BookingData: any;
  bookingdata: any = [];

  Sunjson: any = [];
  Monjson: any = [];
  Tuejson: any = [];
  Wedjson: any = [];
  Thujson: any = [];
  Frijson: any = [];
  Satjson: any = [];

  Slot: any = [];
  SData: any = [];
  MData: any = [];
  TData: any = [];
  WData: any = [];
  ThData: any = [];
  FData: any = [];
  SaData: any = [];

  sun: any = [];
  mon: any = [];
  tue: any = [];
  wed: any = [];
  thu: any = [];
  fri: any = [];
  sat: any = [];

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
    this.Bookingdata();
    // console.log('Data'+' : '+localStorage.getItem("Data"));
  }
  // =======================================================================================
  halfhourset = [
    { id: 7, name: "07:00 - 08:00" }, { id: 8, name: "08:00 - 09:00" }, { id: 9, name: "09:00 - 10:00" }, { id: 10, name: "10:00 - 11:00" }, { id: 11, name: "11:00 - 12:00" }, { id: 12, name: "12:00 - 13:00" }, { id: 13, name: "13:00 - 14:00" }, { id: 14, name: "14:00 - 15:00" }, { id: 15, name: "15:00 - 16:00" }, { id: 16, name: "16:00 - 17:00" }, { id: 17, name: "17:00 - 18:00" }, { id: 18, name: "18:00 - 19:00" }, { id: 19, name: "19:00 - 20:00" }, { id: 20, name: "20:00 - 21:00" }, { id: 21, name: "21:00 - 22:00" }, { id: 22, name: "22:00 - 23:00" }, { id: 23, name: "23:00 - 24:00" }, { id: 24, name: "24:00 - 01:00" }, { id: 1, name: "01:00 - 02:00" }, { id: 2, name: "02:00 - 03:00" }, { id: 3, name: "03:00 - 04:00" }, { id: 4, name: "04:00 - 05:00" }, { id: 5, name: "05:00 - 06:00" }, { id: 6, name: "06:00 - 07:00" },
  ]

  DoctorData() {
    this.httpService.DoctorsData({ role: 'Doctor' }).subscribe(
      (res: any) => {
        this.Doctordata = res;
        // console.log(this.Doctordata);
        var res = this.result[29].selection;
        // console.log(res,'Result');
        for (var i = 0; i < this.Doctordata.length; i++) {
          // console.log(this.Doctordata[i].specialitiesDetails,'Specialities');
          var Spec = this.Doctordata[i].specialitiesDetails;
          for (var k = 0; k < Spec.length; k++) {
            // console.log(Spec,'Spec');
            for (var j = 0; j < res.length; j++) {
              if (this.Doctordata[i].specialitiesDetails[k] == res[j]) {
                this.DoctorFilterdata[j] = this.Doctordata[i];
              }
            }
          }
        }
        // =============================================================================================
        // -------------- Remove Duplicate Sunday Data -----------------------
        var FinalDoctorFilterdata = this.DoctorFilterdata.reduce((accumalator: any, current: any) => {
          if (
            !accumalator.some(
              (item: any) => item.id === current.id && item.email === current.email
            )
          ) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
        // -------------- Remove Duplicate Value --------------------
        // console.log(FinalSaturdayData,'Saturday Final Data Array..........................');
        FinalDoctorFilterdata.sort((x: any, y: any) => x.id - y.id);
        this.DoctorFilterdata = FinalDoctorFilterdata;
        // ====================================================================================================
        // console.log(FinalDoctorFilterdata,'Doctor Filter Data');
      })
  }

  Trial(price: any) {
    // var P_email = this.loggedInUser.email;
    var Price = {
      Price: price,
      // Bundle : null
    }
    localStorage.setItem("Price", JSON.stringify(Price));
    this.cal = true;
    this.cho = false;
  }
  Price_v() {
    this.appoint = true;
    this.appoint_v = true;
    this.cho = false;
  }
  v_cal(price: any, bundle: any) {
    // var P_email = this.loggedInUser.email;
    var Price = {
      Price: price,
      Bundle: bundle
    }
    // console.log(Price);
    localStorage.setItem("Price", JSON.stringify(Price));
    this.cal = true;
    this.appoint = false;
    this.appoint_v = false;
  }

  Price_vr() {
    this.appoint = true;
    this.appoint_vr = true;
    this.cho = false;
  }
  vr_cal(price: any, bundle: any) {
    // var P_email = this.loggedInUser.email;
    var Price = {
      Price: price,
      Bundle: bundle
    }
    // console.log(Price);
    localStorage.setItem("Price", JSON.stringify(Price));
    this.cal = true;
    this.appoint = false;
    this.appoint_v = false;
  }

  Price_txt() {
    this.appoint = true;
    this.appoint_txt = true;
    this.cho = false;
  }
  v_txt(price: any, bundle: any) {
    // var P_email = this.loggedInUser.email;
    var Price = {
      Price: price,
      Bundle: bundle
    }
    // console.log(Price);
    localStorage.setItem("Price", JSON.stringify(Price));
    this.cal = true;
    this.appoint = false;
    this.appoint_v = false;
  }

  selectedata(slot: any, CurrentDate: any, date: any, day: any) {
    var data = JSON.parse(localStorage.getItem("Price")!);
    // console.log(data);
    var Data = {
      Price: data.Price,
      Bundle: data.Bundle == null ? 1 : data.Bundle,
      Currentdate: CurrentDate,
      Slot: slot,
      SelectDate: date,
      Day: day,
    }
    // console.log(Data);
    localStorage.setItem("Data", JSON.stringify(Data));
    this.cal = false;
    this.comm = true;
  }

  ReSelectdata(slot: any, date: any, day: any) {
    var data = JSON.parse(localStorage.getItem("BookingDataById")!);
    // console.log(data,'Old Data');
    var Data = {
      P_email: data.P_email,
      D_email: data.D_email,
      MeetLink: data.MeetLink,
      P_name: data.P_name,
      D_name: data.D_name,
      Price: data.Price,
      Bundle: data.Bundle,
      Currentdate: data.Currentdate,
      Slot: slot,
      SelectDate: date,
      Day: day,
      Status: "1",
    }
    // console.log(Data,'New Data');
    this.httpService.AppReschedule(Data).subscribe(
      (res: any) => {
        alert(res.msg);
        window.location.reload();
      })
  }

  commdata(email: any, Link: any, first_name: any, last_name: any) {
    var data = JSON.parse(localStorage.getItem("Data")!);
    var Data = {
      // data : localStorage.getItem("Data"),
      P_email: this.loggedInUser.email,
      P_name: this.loggedInUser.name,
      D_name: first_name + ' ' + last_name,
      Price: data.Price,
      Bundle: data.Bundle,
      Currentdate: data.Currentdate,
      Slot: data.Slot,
      SelectDate: data.SelectDate,
      Day: data.Day,
      D_email: email,
      MeetLink: Link,
      Status: "1",
    }
    localStorage.setItem("Data", JSON.stringify(Data));
    this.pay = true;
    this.comm = false;
    this.BookingData = JSON.parse(localStorage.getItem("Data")!);
    // console.log(this.BookingData,"Booking Data");
  }

  payment() {
    var BookJson = JSON.parse(localStorage.getItem("Data")!);
    this.httpService.AppBook(BookJson).subscribe(
      (res: any) => {
        alert(res.msg);
        // localStorage.clear();
        window.location.reload();
      })
  }

  AppCancel(_id: any) {
    var BCJson = {
      _id: _id,
      Status: "0"
    }
    if (window.confirm('Are sure you want to cancel this Appointment ?')) {
      this.httpService.AppCancel(BCJson).subscribe(
        (res: any) => {
          alert(res.msg);
          window.location.reload();
        })
    }
  }

  AppFeedback(D_email : any, P_email : any, D_name : any, P_name : any) {
    var fbJson = {
      D_email: D_email,
      P_email: P_email,
      D_name: D_name,
      P_name: P_name,
      C_Date : this.CurrentDate,
    }
    localStorage.setItem("Feedback", JSON.stringify(fbJson));
    this.router.navigate(['/patient-feedback']);
  }

  AppReschedule(app: any, email: any, _id: any) {
    var BCJson = {
      _id: _id,
      Status: "2"
    }
    this.httpService.AppDataById({ _id }).subscribe(
      (res: any) => {
        // console.log(res);
        localStorage.setItem("BookingDataById", JSON.stringify(res));
      })
    if (window.confirm('Are sure you want to Reschedule this Appointment ?')) {
      this.httpService.AppBookingStatus(BCJson).subscribe(
        (res: any) => {
          alert(res.msg);
          // window.location.reload();
        })
      this.Recal = true;
      // console.log(email);
      this.httpService.ShiftData({ email }).subscribe(
        (res: any) => {
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
          this.BookStatusdata();
          // console.log(this.bookingdata);
        });
      for (var i = 0; i <= 6; i++) {
        this.nextDate = new Date;
        this.nextFullDate = this.nextDate.setDate(this.nextDate.getDate() + i);

        this.nextDateValue = this.datepipe.transform((this.nextFullDate), 'dd/MMM');
        this.nextDayValue = this.datepipe.transform((this.nextDate), 'ccc');

        this.WeekDate[i] = this.nextDateValue;
        this.WeekDay[i] = this.nextDayValue;
        this.WeekData[i] = this.nextDayValue + this.nextDateValue;
      }
      this.model.open(app, { size: 'xl', backdropClass: 'backdrop-color' });
    }
  }

  AppJoin(_id: any, Link: any) {
    if (window.confirm('Are sure you want to Join this Appointment ?')) {
      // alert(_id+' '+Link);
    }
  }

  Bookingdata() {
    var P_email = this.loggedInUser.email;
    this.httpService.Bookdata({ P_email }).subscribe(
      (res: any) => {
        this.bookingdata = res;
        // console.log(this.bookingdata,'Booking Data');
      });
  }

  BookStatusdata() {
    this.bookingdata;
    // console.log(this.bookingdata,'Booking Data');
    // console.log(this.bookingdata[0].SelectDate.slice(0,6));
    this.WeekDate;
    // console.log(this.WeekDate,'Week Date');
    this.ResData;
    // console.log(this.ResData,'Doctor Shift Data');
    for (var i = 0; i < this.bookingdata.length; i++) {
      for (var k = 0; k < this.WeekDate.length; k++) {
        if (this.WeekDate[k] == this.bookingdata[i].SelectDate.slice(0, 6)) {
          if (this.bookingdata[i].Day == 'Mon' && this.bookingdata[i].Status == '1') {
            this.MData[i] = this.bookingdata[i].Slot;
          }
          if (this.bookingdata[i].Day == 'Tue' && this.bookingdata[i].Status == '1') {
            this.TData[i] = this.bookingdata[i].Slot;
          }
          if (this.bookingdata[i].Day == 'Wed' && this.bookingdata[i].Status == '1') {
            this.WData[i] = this.bookingdata[i].Slot;
          }
          if (this.bookingdata[i].Day == 'Thu' && this.bookingdata[i].Status == '1') {
            this.ThData[i] = this.bookingdata[i].Slot;
          }
          if (this.bookingdata[i].Day == 'Fri' && this.bookingdata[i].Status == '1') {
            this.FData[i] = this.bookingdata[i].Slot;
          }
          if (this.bookingdata[i].Day == 'Sat' && this.bookingdata[i].Status == '1') {
            this.SaData[i] = this.bookingdata[i].Slot;
          }
          if (this.bookingdata[i].Day == 'Sun' && this.bookingdata[i].Status == '1') {
            this.SData[i] = this.bookingdata[i].Slot;
          }
        }
      }
    }
    // ============================================================================================
    for (var i = 0; i < this.Sunday.length; i++) {
      for (var j = 0; j < this.SData.length; j++) {
        if (this.Sunday[i].name == this.SData[j]) {
          var id = this.Saturday[i].id;
          var name = this.Saturday[i].name;
          var check = 1;
          var status = 2;
          this.sun[j] =
          {
            id: id,
            name: name,
            check: check,
            status: status,
          }
        }

      }
    }
    // console.log(this.sun,'Sun Data');
    // ------------------- Filter Commom Sunday Data -------------------------
    for (let i = 0; i < this.Sunday.length; i++) {
      if (this.Sunday.lastIndexOf(this.Sunday[i]) === this.Sunday.indexOf(this.Sunday[i])) {
        this.sun.push(this.Sunday[i]);
      }
    }
    // -------------- Remove Duplicate Sunday Data -----------------------
    var FinalSundayData = this.sun.reduce((accumalator: any, current: any) => {
      if (
        !accumalator.some(
          (item: any) => item.id === current.id && item.name === current.name
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    // -------------- Remove Duplicate Value --------------------
    // console.log(FinalSundayData,'Sunday Final Data Array..........................');
    FinalSundayData.sort((x: any, y: any) => x.id - y.id);
    this.Sunjson = FinalSundayData;
    // ============================================================================================
    // ===================================================================================
    for (var i = 0; i < this.Monday.length; i++) {
      for (var j = 0; j < this.MData.length; j++) {
        if (this.Monday[i].name == this.MData[j]) {
          var id = this.Monday[i].id;
          var name = this.Monday[i].name;
          var check = 1;
          var status = 2;
          this.mon[j] =
          {
            id: id,
            name: name,
            check: check,
            status: status,
          }
        }
      }
    }
    // console.log(this.mon,'Mon Data');
    // ------------------- Filter Commom Sunday Data -------------------------
    for (let i = 0; i < this.Monday.length; i++) {
      if (this.Monday.lastIndexOf(this.Monday[i]) === this.Monday.indexOf(this.Monday[i])) {
        this.mon.push(this.Monday[i]);
      }
    }
    // -------------- Remove Duplicate Sunday Data -----------------------
    var FinalMondayData = this.mon.reduce((accumalator: any, current: any) => {
      if (
        !accumalator.some(
          (item: any) => item.id === current.id && item.name === current.name
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    // -------------- Remove Duplicate Value --------------------
    //  console.log(FinalMondayData,'Monday Final Data Array..........................');
    FinalMondayData.sort((x: any, y: any) => x.id - y.id);
    this.Monjson = FinalMondayData;
    // ============================================================================================
    for (var i = 0; i < this.Tuesday.length; i++) {
      for (var j = 0; j < this.TData.length; j++) {
        if (this.Tuesday[i].name == this.TData[j]) {
          var id = this.Tuesday[i].id;
          var name = this.Tuesday[i].name;
          var check = 1;
          var status = 2;
          this.tue[j] =
          {
            id: id,
            name: name,
            check: check,
            status: status,
          }
        }

      }
    }
    // console.log(this.tue,'Tue Data');
    // ------------------- Filter Commom Sunday Data -------------------------
    for (let i = 0; i < this.Tuesday.length; i++) {
      if (this.Tuesday.lastIndexOf(this.Tuesday[i]) === this.Tuesday.indexOf(this.Tuesday[i])) {
        this.tue.push(this.Tuesday[i]);
      }
    }
    // -------------- Remove Duplicate Sunday Data -----------------------
    var FinalTuesdayData = this.tue.reduce((accumalator: any, current: any) => {
      if (
        !accumalator.some(
          (item: any) => item.id === current.id && item.name === current.name
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    // -------------- Remove Duplicate Value --------------------
    //  console.log(FinalTuesdayData,'Tuesday Final Data Array..........................');
    FinalTuesdayData.sort((x: any, y: any) => x.id - y.id);
    this.Tuejson = FinalTuesdayData;
    // ============================================================================================
    // ============================================================================================
    for (var i = 0; i < this.Wednesday.length; i++) {
      for (var j = 0; j < this.WData.length; j++) {
        if (this.Wednesday[i].name == this.WData[j]) {
          var id = this.Wednesday[i].id;
          var name = this.Wednesday[i].name;
          var check = 1;
          var status = 2;
          this.wed[j] =
          {
            id: id,
            name: name,
            check: check,
            status: status,
          }
        }

      }
    }
    // console.log(this.wed,'Wed Data');
    // ------------------- Filter Commom Sunday Data -------------------------
    for (let i = 0; i < this.Wednesday.length; i++) {
      if (this.Wednesday.lastIndexOf(this.Wednesday[i]) === this.Wednesday.indexOf(this.Wednesday[i])) {
        this.wed.push(this.Wednesday[i]);
      }
    }
    // -------------- Remove Duplicate Sunday Data -----------------------
    var FinalWednesdayData = this.wed.reduce((accumalator: any, current: any) => {
      if (
        !accumalator.some(
          (item: any) => item.id === current.id && item.name === current.name
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    // -------------- Remove Duplicate Value --------------------
    //  console.log(FinalWednesdayData,'Wednesday Final Data Array..........................');
    FinalWednesdayData.sort((x: any, y: any) => x.id - y.id);
    this.Wedjson = FinalWednesdayData;
    // ============================================================================================
    // ============================================================================================
    for (var i = 0; i < this.Thursday.length; i++) {
      for (var j = 0; j < this.ThData.length; j++) {
        if (this.Thursday[i].name == this.ThData[j]) {
          var id = this.Thursday[i].id;
          var name = this.Thursday[i].name;
          var check = 1;
          var status = 2;
          this.thu[j] =
          {
            id: id,
            name: name,
            check: check,
            status: status,
          }
        }

      }
    }
    // console.log(this.thu,'Thu Data');
    // ------------------- Filter Commom Sunday Data -------------------------
    for (let i = 0; i < this.Thursday.length; i++) {
      if (this.Thursday.lastIndexOf(this.Thursday[i]) === this.Thursday.indexOf(this.Thursday[i])) {
        this.thu.push(this.Thursday[i]);
      }
    }
    // -------------- Remove Duplicate Sunday Data -----------------------
    var FinalThursdayData = this.thu.reduce((accumalator: any, current: any) => {
      if (
        !accumalator.some(
          (item: any) => item.id === current.id && item.name === current.name
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    // -------------- Remove Duplicate Value --------------------
    // console.log(FinalThursdayData,'Thursday Final Data Array..........................');
    FinalThursdayData.sort((x: any, y: any) => x.id - y.id);
    this.Thujson = FinalThursdayData;
    // ============================================================================================
    // ============================================================================================
    for (var i = 0; i < this.Friday.length; i++) {
      for (var j = 0; j < this.FData.length; j++) {
        if (this.Friday[i].name == this.FData[j]) {
          var id = this.Friday[i].id;
          var name = this.Friday[i].name;
          var check = 1;
          var status = 2;
          this.fri[j] =
          {
            id: id,
            name: name,
            check: check,
            status: status,
          }
        }

      }
    }
    // console.log(this.fri,'Fri Data');
    // ------------------- Filter Commom Sunday Data -------------------------
    for (let i = 0; i < this.Friday.length; i++) {
      if (this.Friday.lastIndexOf(this.Friday[i]) === this.Friday.indexOf(this.Friday[i])) {
        this.fri.push(this.Friday[i]);
      }
    }
    // -------------- Remove Duplicate Sunday Data -----------------------
    var FinalFridayData = this.fri.reduce((accumalator: any, current: any) => {
      if (
        !accumalator.some(
          (item: any) => item.id === current.id && item.name === current.name
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    // -------------- Remove Duplicate Value --------------------
    // console.log(FinalFridayData,'Friday Final Data Array..........................');
    FinalFridayData.sort((x: any, y: any) => x.id - y.id);
    this.Frijson = FinalFridayData;
    // ============================================================================================
    // ============================================================================================
    for (var i = 0; i < this.Saturday.length; i++) {
      for (var j = 0; j < this.SaData.length; j++) {
        if (this.Saturday[i].name == this.SaData[j]) {
          var id = this.Saturday[i].id;
          var name = this.Saturday[i].name;
          var check = 1;
          var status = 2;
          this.sat[j] =
          {
            id: id,
            name: name,
            check: check,
            status: status,
          }
        }

      }
    }
    // console.log(this.sat,'Sat Data');
    // ------------------- Filter Commom Sunday Data -------------------------
    for (let i = 0; i < this.Saturday.length; i++) {
      if (this.Saturday.lastIndexOf(this.Saturday[i]) === this.Saturday.indexOf(this.Saturday[i])) {
        this.sat.push(this.Saturday[i]);
      }
    }
    // -------------- Remove Duplicate Sunday Data -----------------------
    var FinalSaturdayData = this.sat.reduce((accumalator: any, current: any) => {
      if (
        !accumalator.some(
          (item: any) => item.id === current.id && item.name === current.name
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    // -------------- Remove Duplicate Value --------------------
    // console.log(FinalSaturdayData,'Saturday Final Data Array..........................');
    FinalSaturdayData.sort((x: any, y: any) => x.id - y.id);
    this.Satjson = FinalSaturdayData;
    // ============================================================================================
  }

  Onvideo() {
    this.video = true;
    this.intro = false;
    this.calendar = false;
  }
  Onintro() {
    this.video = false;
    this.intro = true;
    this.calendar = false;
  }
  Oncalendar(_id: any, email: any) {
    this.video = false;
    this.intro = false;
    this.calendar = true;
    this.httpService.ShiftData({ email }).subscribe(
      (res: any) => {
        this.shiftdata = res;
        this.ResData = this.shiftdata[0];
        // console.log(this.ResData);
        this.Sunday = this.ResData.sun;
        this.Monday = this.ResData.mon;
        this.Tuesday = this.ResData.tue;
        this.Wednesday = this.ResData.wed;
        this.Thursday = this.ResData.thu;
        this.Friday = this.ResData.fri;
        this.Saturday = this.ResData.sat;
        this.BookStatusdata();
      });
    for (var i = 0; i <= 6; i++) {
      this.nextDate = new Date;
      this.nextFullDate = this.nextDate.setDate(this.nextDate.getDate() + i);

      this.nextDateValue = this.datepipe.transform((this.nextFullDate), 'dd/MMM');
      this.nextDayValue = this.datepipe.transform((this.nextDate), 'ccc');

      this.WeekDate[i] = this.nextDateValue;
      this.WeekDay[i] = this.nextDayValue;
    }
  }

  BookAppointment(content: any, email: any) {
    // console.log(email);
    this.httpService.PriceData({ email }).subscribe(
      (res: any) => {
        this.Pricedata = res;
        this.Price = this.Pricedata[0];
        if (this.Price.ta_value == 1) {
          this.ta_value = true;
        }
        if (this.Price.v_value == 'true') {
          this.v_value = true;
        }
        if (this.Price.vr_value == 'true') {
          this.vr_value = true;
        }
        if (this.Price.txt_value == 'true') {
          this.txt_value = true;
        }
        this.httpService.ShiftData({ email }).subscribe(
          (res: any) => {
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
            this.BookStatusdata();
          });
        for (var i = 0; i <= 6; i++) {
          this.nextDate = new Date;
          this.nextFullDate = this.nextDate.setDate(this.nextDate.getDate() + i);

          this.nextDateValue = this.datepipe.transform((this.nextFullDate), 'dd/MMM');
          this.nextDayValue = this.datepipe.transform((this.nextDate), 'ccc');

          this.WeekDate[i] = this.nextDateValue;
          this.WeekDay[i] = this.nextDayValue;
          this.WeekData[i] = this.nextDayValue + this.nextDateValue;
        }
        this.model.open(content, { size: 'xl', backdropClass: 'backdrop-color' });
      });
  }
  // =======================================================================================
  openXl(edit: any) {
    this.model.open(edit, { size: 'xl', backdropClass: 'backdrop-color' });
  }
  reload() {
    window.location.reload();
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
