import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment-timezone';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-doctor-calendar',
  templateUrl: './doctor-calendar.component.html',
  styleUrls: ['./doctor-calendar.component.css']
})
export class DoctorCalendarComponent implements OnInit {

  zone_name = moment.tz.guess();
  timezone_local = moment.tz(this.zone_name).zoneName();

  listview: boolean = true;
  calendarview: boolean = false;

  CurrentDate = this.datepipe.transform((new Date),'dd/MMM');
  CurrentDay = this.datepipe.transform((new Date), 'cccc');

  nextDate: any;
  nextDateValue: any;
  nextDayValue: any;
  nextFullDate: any;
  WeekDate: any = [];
  WeekDay: any = [];

  Sunday: any = [];
  Monday: any = [];
  Tuesday: any = [];
  Wednesday: any = [];
  Thursday: any = [];
  Friday: any = [];
  Saturday: any = [];

  shiftdata: any;

  SundayValue: any;
  MondayValue: any;
  TuesdayValue: any;
  WednesdayValue: any;
  ThursdayValue: any;
  FridayValue: any;
  SaturdayValue: any;

  DayTimingForm!: FormGroup;
  timePeriod!: FormGroup;
  loggedInUser: any;
  
  Fvalue: any = [];
  Lvalue: any = [];
  
  ResData: any = [];

  sun: any = [];
  mon: any = [];
  tue: any = [];
  wed: any = [];
  thu: any = [];
  fri: any = [];
  sat: any = [];

  Farr: any = [];
  Larr: any = [];
  Marr: any = [];

  Fhr: any = [];
  Lhr: any = [];

  Sunjson: any = [];
  Monjson: any = [];
  Tuejson: any = [];
  Wedjson: any = [];
  Thujson: any = [];
  Frijson: any = [];
  Satjson: any = [];

  max_array: any = [];
  min_array: any = [];
  Findex: any = [];
  Lindex: any = [];
  SelectTime: any;
  SelectedPeriod: any;
  DaysTimeData: any = [];
  PeriodData: any = [];
  DaysData: any = [];
  bookingdata: any = [];
  Slot:any = [];
  SData:any = [];
  MData:any = [];
  TData:any = [];
  WData:any = [];
  ThData:any = [];
  FData:any = [];
  SaData:any = [];

  constructor(private fb: FormBuilder, private datepipe: DatePipe, private httpService: HttpService,) {

  }

  ngOnInit(): void {
    this.httpService.userSubject.subscribe(
      (user: any) => {
        this.loggedInUser = user;
      })

      this.timePeriod = this.fb.group({
        StartTime: ['', [Validators.required]],
        EndTime: ['', [Validators.required]]
      });

    this.DayTimingForm = this.fb.group({
      sunShift: this.fb.array([]),
      monShift: this.fb.array([]),
      tueShift: this.fb.array([]),
      wedShift: this.fb.array([]),
      thuShift: this.fb.array([]),
      friShift: this.fb.array([]),
      satShift: this.fb.array([]),
    });

    this.ShiftData();

  }

  Bookingdata()
  {
    var D_email = this.loggedInUser.email;
    this.httpService.BookingData({D_email}).subscribe(
      (res : any) => {
        this.bookingdata = res;
        // console.log(this.bookingdata,'Booking Data');
        for(var i=0; i<this.bookingdata.length; i++)
        {
          for(var k=0; k<this.WeekDate.length; k++)
          {
            if(this.WeekDate[k] == this.bookingdata[i].SelectDate)
            {
              if(this.bookingdata[i].Day == 'Mon'  && this.bookingdata[i].Status == '1')
              {
                this.MData[i] = this.bookingdata[i].Slot;
              }
              if(this.bookingdata[i].Day == 'Tue'  && this.bookingdata[i].Status == '1')
              {
                this.TData[i] = this.bookingdata[i].Slot;
              }
              if(this.bookingdata[i].Day == 'Wed'  && this.bookingdata[i].Status == '1')
              {
                this.WData[i] = this.bookingdata[i].Slot;
              }
              if(this.bookingdata[i].Day == 'Thu'  && this.bookingdata[i].Status == '1')
              {
                this.ThData[i] = this.bookingdata[i].Slot;
              }
              if(this.bookingdata[i].Day == 'Fri'  && this.bookingdata[i].Status == '1')
              {
                this.FData[i] = this.bookingdata[i].Slot;
              }
              if(this.bookingdata[i].Day == 'Sat'  && this.bookingdata[i].Status == '1')
              {
                this.SaData[i] = this.bookingdata[i].Slot;
              }
              if(this.bookingdata[i].Day == 'Sun'  && this.bookingdata[i].Status == '1')
              {
                this.SData[i] = this.bookingdata[i].Slot;
              }
            }
          }
        }
        // ============================================================================================
        for(var i=0; i<this.Sunday.length; i++)
        {
          for(var j=0; j<this.SData.length; j++)
          {
            if(this.Sunday[i].name == this.SData[j])
            {
              var id = this.Saturday[i].id;
              var name = this.Saturday[i].name;
              var check = 1;
              var status = 2;
              this.sun[j] =
                  {
                    id : id,
                    name : name,
                    check : check,
                    status : status,
                  }
            }

          }
        }
        // console.log(this.sun,'Sun Data');
        // ------------------- Filter Commom Sunday Data -------------------------
        for (let i = 0; i < this.Sunday.length; i++) {
          if (this.Sunday.lastIndexOf(this.Sunday[i]) === this.Sunday.indexOf(this.Sunday[i])) 
          {
            this.sun.push(this.Sunday[i]);
          }
        }
        // -------------- Remove Duplicate Sunday Data -----------------------
        var FinalSundayData = this.sun.reduce((accumalator : any, current : any) => {
          if (
            !accumalator.some(
              (item : any) => item.id === current.id && item.name === current.name
            )
          ) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
        // -------------- Remove Duplicate Value --------------------
          // console.log(FinalSundayData,'Sunday Final Data Array..........................');
          FinalSundayData.sort((x:any, y:any) => x.id - y.id);
        this.Sunjson = FinalSundayData;
        // ============================================================================================
        // ===================================================================================
        for(var i=0; i<this.Monday.length; i++)
        {
          for(var j=0; j<this.MData.length; j++)
          {
            if(this.Monday[i].name == this.MData[j])
            {
              var id = this.Monday[i].id;
              var name = this.Monday[i].name;
              var check = 1;
              var status = 2;
              this.mon[j] =
                  {
                    id : id,
                    name : name,
                    check : check,
                    status : status,
                  }
            }

          }
        }
        // console.log(this.mon,'Mon Data');
        // ------------------- Filter Commom Monday Data -------------------------
        for (let i = 0; i < this.Monday.length; i++) {
          if (this.Monday.lastIndexOf(this.Monday[i]) === this.Monday.indexOf(this.Monday[i])) 
          {
            this.mon.push(this.Monday[i]);
          }
        }
        // -------------- Remove Duplicate Monday Data -----------------------
        var FinalMondayData = this.mon.reduce((accumalator : any, current : any) => {
          if (
            !accumalator.some(
              (item : any) => item.id === current.id && item.name === current.name
            )
          ) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
        // -------------- Remove Duplicate Value --------------------
        //  console.log(FinalMondayData,'Monday Final Data Array..........................');
         FinalMondayData.sort((x:any, y:any) => x.id - y.id);
        this.Monjson = FinalMondayData;
        // ============================================================================================
        for(var i=0; i<this.Tuesday.length; i++)
        {
          for(var j=0; j<this.TData.length; j++)
          {
            if(this.Tuesday[i].name == this.TData[j])
            {
              var id = this.Tuesday[i].id;
              var name = this.Tuesday[i].name;
              var check = 1;
              var status = 2;
              this.tue[j] =
                  {
                    id : id,
                    name : name,
                    check : check,
                    status : status,
                  }
            }

          }
        }
        // console.log(this.tue,'Tue Data');
        // ------------------- Filter Commom Tuesday Data -------------------------
        for (let i = 0; i < this.Tuesday.length; i++) {
          if (this.Tuesday.lastIndexOf(this.Tuesday[i]) === this.Tuesday.indexOf(this.Tuesday[i])) 
          {
            this.tue.push(this.Tuesday[i]);
          }
        }
        // -------------- Remove Duplicate Tuesday Data -----------------------
        var FinalTuesdayData = this.tue.reduce((accumalator : any, current : any) => {
          if (
            !accumalator.some(
              (item : any) => item.id === current.id && item.name === current.name
            )
          ) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
        // -------------- Remove Duplicate Value --------------------
        //  console.log(FinalTuesdayData,'Tuesday Final Data Array..........................');
         FinalTuesdayData.sort((x:any, y:any) => x.id - y.id);
        this.Tuejson = FinalTuesdayData;
        // ============================================================================================
        // ============================================================================================
        for(var i=0; i<this.Wednesday.length; i++)
        {
          for(var j=0; j<this.WData.length; j++)
          {
            if(this.Wednesday[i].name == this.WData[j])
            {
              var id = this.Wednesday[i].id;
              var name = this.Wednesday[i].name;
              var check = 1;
              var status = 2;
              this.wed[j] =
                  {
                    id : id,
                    name : name,
                    check : check,
                    status : status,
                  }
            }

          }
        }
        // console.log(this.wed,'Wed Data');
        // ------------------- Filter Commom Wednesday Data -------------------------
        for (let i = 0; i < this.Wednesday.length; i++) {
          if (this.Wednesday.lastIndexOf(this.Wednesday[i]) === this.Wednesday.indexOf(this.Wednesday[i])) 
          {
            this.wed.push(this.Wednesday[i]);
          }
        }
        // -------------- Remove Duplicate Wednesday Data -----------------------
        var FinalWednesdayData = this.wed.reduce((accumalator : any, current : any) => {
          if (
            !accumalator.some(
              (item : any) => item.id === current.id && item.name === current.name
            )
          ) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
        // -------------- Remove Duplicate Value --------------------
        //  console.log(FinalWednesdayData,'Wednesday Final Data Array..........................');
         FinalWednesdayData.sort((x:any, y:any) => x.id - y.id);
        this.Wedjson = FinalWednesdayData;
        // ============================================================================================
        // ============================================================================================
        for(var i=0; i<this.Thursday.length; i++)
        {
          for(var j=0; j<this.ThData.length; j++)
          {
            if(this.Thursday[i].name == this.ThData[j])
            {
              var id = this.Thursday[i].id;
              var name = this.Thursday[i].name;
              var check = 1;
              var status = 2;
              this.thu[j] =
                  {
                    id : id,
                    name : name,
                    check : check,
                    status : status,
                  }
            }

          }
        }
        // console.log(this.thu,'Thu Data');
        // ------------------- Filter Commom Thursday Data -------------------------
        for (let i = 0; i < this.Thursday.length; i++) {
          if (this.Thursday.lastIndexOf(this.Thursday[i]) === this.Thursday.indexOf(this.Thursday[i])) 
          {
            this.thu.push(this.Thursday[i]);
          }
        }
        // -------------- Remove Duplicate Thursday Data -----------------------
        var FinalThursdayData = this.thu.reduce((accumalator : any, current : any) => {
          if (
            !accumalator.some(
              (item : any) => item.id === current.id && item.name === current.name
            )
          ) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
        // -------------- Remove Duplicate Value --------------------
          // console.log(FinalThursdayData,'Thursday Final Data Array..........................');
          FinalThursdayData.sort((x:any, y:any) => x.id - y.id);
        this.Thujson = FinalThursdayData;
        // ============================================================================================
        // ============================================================================================
        for(var i=0; i<this.Friday.length; i++)
        {
          for(var j=0; j<this.FData.length; j++)
          {
            if(this.Friday[i].name == this.FData[j])
            {
              var id = this.Friday[i].id;
              var name = this.Friday[i].name;
              var check = 1;
              var status = 2;
              this.fri[j] =
                  {
                    id : id,
                    name : name,
                    check : check,
                    status : status,
                  }
            }

          }
        }
        // console.log(this.fri,'Fri Data');
        // ------------------- Filter Commom Friday Data -------------------------
        for (let i = 0; i < this.Friday.length; i++) {
          if (this.Friday.lastIndexOf(this.Friday[i]) === this.Friday.indexOf(this.Friday[i])) 
          {
            this.fri.push(this.Friday[i]);
          }
        }
        // -------------- Remove Duplicate Friday Data -----------------------
        var FinalFridayData = this.fri.reduce((accumalator : any, current : any) => {
          if (
            !accumalator.some(
              (item : any) => item.id === current.id && item.name === current.name
            )
          ) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
        // -------------- Remove Duplicate Value --------------------
          // console.log(FinalFridayData,'Friday Final Data Array..........................');
          FinalFridayData.sort((x:any, y:any) => x.id - y.id);
        this.Frijson = FinalFridayData;
        // ============================================================================================
        // ============================================================================================
        for(var i=0; i<this.Saturday.length; i++)
        {
          for(var j=0; j<this.SaData.length; j++)
          {
            if(this.Saturday[i].name == this.SaData[j])
            {
              var id = this.Saturday[i].id;
              var name = this.Saturday[i].name;
              var check = 1;
              var status = 2;
              this.sat[j] =
                  {
                    id : id,
                    name : name,
                    check : check,
                    status : status,
                  }
            }

          }
        }
        // console.log(this.sat,'Sat Data');
        // ------------------- Filter Commom Saturday Data -------------------------
        for (let i = 0; i < this.Saturday.length; i++) {
          if (this.Saturday.lastIndexOf(this.Saturday[i]) === this.Saturday.indexOf(this.Saturday[i])) 
          {
            this.sat.push(this.Saturday[i]);
          }
        }
        // -------------- Remove Duplicate Sunday Data -----------------------
        var FinalSaturdayData = this.sat.reduce((accumalator : any, current : any) => {
          if (
            !accumalator.some(
              (item : any) => item.id === current.id && item.name === current.name
            )
          ) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
        // -------------- Remove Duplicate Value --------------------
          // console.log(FinalSaturdayData,'Saturday Final Data Array..........................');
          FinalSaturdayData.sort((x:any, y:any) => x.id - y.id);
        this.Satjson = FinalSaturdayData;
        // ============================================================================================
      })
  }

  ListView() {
    this.listview = true;
    this.calendarview = false;
  }

  CalendarView() {
    this.calendarview = true;
    this.listview = false;
    this.Bookingdata();
    for (var i = 0; i <= 6; i++) {
      this.nextDate = new Date;
      this.nextFullDate = this.nextDate.setDate(this.nextDate.getDate() + i);

      this.nextDateValue = this.datepipe.transform((this.nextFullDate),'dd/MMM');
      this.nextDayValue = this.datepipe.transform((this.nextDate), 'cccc');

      this.WeekDate[i] = this.nextDateValue;
      this.WeekDay[i] = this.nextDayValue;
    }
    // =================================================================================
    this.ShiftData();
    for (var j = 0; j < this.WeekDay.length; j++) {
      // -----------------------------------------------------------------------------
      if(this.WeekDay[j] == 'Sunday')
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

  hoursvalue = [
     { id: 7, name: "07:00" }, { id: 8, name: "08:00" }, { id: 9, name: "09:00" }, { id: 10, name: "10:00" }, { id: 11, name: "11:00" }, { id: 12, name: "12:00" }, { id: 13, name: "13:00" }, { id: 14, name: "14:00" }, { id: 15, name: "15:00" }, { id: 16, name: "16:00" }, { id: 17, name: "17:00" }, { id: 18, name: "18:00" }, { id: 19, name: "19:00" }, { id: 20, name: "20:00" }, { id: 21, name: "21:00" }, { id: 22, name: "22:00" }, { id: 23, name: "23:00" }, { id: 24, name: "24:00" }, { id: 1, name: "01:00" }, { id: 2, name: "02:00" }, { id: 3, name: "03:00" }, { id: 4, name: "04:00" }, { id: 5, name: "05:00" }, { id: 6, name: "06:00" },
  ]

  halfhourset = [
    { id: 7, name: "07:00 - 08:00" }, { id: 8, name: "08:00 - 09:00" }, { id: 9, name: "09:00 - 10:00" }, { id: 10, name: "10:00 - 11:00" }, { id: 11, name: "11:00 - 12:00" }, { id: 12, name: "12:00 - 13:00" }, { id: 13, name: "13:00 - 14:00" }, { id: 14, name: "14:00 - 15:00" }, { id: 15, name: "15:00 - 16:00" }, { id: 16, name: "16:00 - 17:00" }, { id: 17, name: "17:00 - 18:00" }, { id: 18, name: "18:00 - 19:00" }, { id: 19, name: "19:00 - 20:00" }, { id: 20, name: "20:00 - 21:00" }, { id: 21, name: "21:00 - 22:00" }, { id: 22, name: "22:00 - 23:00" }, { id: 23, name: "23:00 - 24:00" }, { id: 24, name: "24:00 - 01:00" }, { id: 1, name: "01:00 - 02:00" }, { id: 2, name: "02:00 - 03:00" }, { id: 3, name: "03:00 - 04:00" }, { id: 4, name: "04:00 - 05:00" }, { id: 5, name: "05:00 - 06:00" }, { id: 6, name: "06:00 - 07:00" },
 ]

// ---------------- Select Time Period Function Start-----------------------
TimePeriod(timePeriod:any)
{
 if(timePeriod.valid)
 {
   this.SelectTime = this.timePeriod.value;
    var i=0;
    this.Farr[i] = this.SelectTime.StartTime;
    this.Larr[i] = this.SelectTime.EndTime;    
    this.Marr = this.Farr.concat(this.Larr);
    var max_array = Math.max.apply(Math, this.Marr);
    var min_array = Math.min.apply(Math, this.Marr);
    for (var i = 0; i < this.halfhourset.length; i++) {
      if (this.halfhourset[i].id == min_array) {
        this.Fhr = this.halfhourset[i];
      }
      if (this.halfhourset[i].id == max_array) {
        this.Lhr = this.halfhourset[i];
      }
    }
    var Findex = this.halfhourset.indexOf(this.Fhr);
    var Lindex = this.halfhourset.indexOf(this.Lhr);
    this.SelectedPeriod = this.halfhourset.slice(Findex, Lindex);
    for(var i=0; i<this.SelectedPeriod.length; i++)
    {
      var AddData = {
        id : this.SelectedPeriod[i].id,
        name : this.SelectedPeriod[i].name,
        check : 0,
        status : 0,
      }
      this.PeriodData[i] = AddData;
    }
 }
 var shift = {
      email: this.loggedInUser.email,
      sun : this.PeriodData,
      mon : this.PeriodData,
      tue : this.PeriodData,
      wed : this.PeriodData,
      thu : this.PeriodData,
      fri : this.PeriodData,
      sat : this.PeriodData,
      start : this.SelectTime.StartTime,
      end : this.SelectTime.EndTime
    }
    // console.log(shift, "ShiftData")

    this.httpService.TimePeriod(shift).subscribe(
      (post: any) => {
        var shifts = post;
        // alert("Your Blog Posted");
        // console.log(shifts, 'ShiftData');
        this.ShiftData();
      });
}
// ---------------- Select Time Period Function End-----------------------

// --------------------------------------------------------------------------------
onSundayTime(event : any) {
  const sunShift: FormArray = this.DayTimingForm.get('sunShift') as FormArray;
 
  if (event.target.checked) {
    sunShift.push(new FormControl(event.target.value));
  } else {
    const index = sunShift.controls.findIndex(x => x.value === event.target.value);
    sunShift.removeAt(index);
} 
  // console.log(this.DayTimingForm.value);
}
// ------------------------------------------------------------------------------
onMondayTime(event : any) {
  const monShift: FormArray = this.DayTimingForm.get('monShift') as FormArray;
 
  if (event.target.checked) {
    monShift.push(new FormControl(event.target.value));
  } else {
      const index = monShift.controls.findIndex(x => x.value === event.target.value);
      monShift.removeAt(index);
  }
  // console.log(this.DayTimingForm.value);
}
// -------------------------------------------------------------------------------
onTuesdayTime(event : any) {
  const tueShift: FormArray = this.DayTimingForm.get('tueShift') as FormArray;
  if (event.target.checked) {
    tueShift.push(new FormControl(event.target.value));
  } else {
     const index = tueShift.controls.findIndex(x => x.value === event.target.value);
     tueShift.removeAt(index);
  }
  // console.log(this.DayTimingForm.value);
}
// ---------------------------------------------------------------------------------
onWednesdayTime(event : any) {
  const wedShift: FormArray = this.DayTimingForm.get('wedShift') as FormArray;
 
  if (event.target.checked) {
    wedShift.push(new FormControl(event.target.value));
  } else {
     const index = wedShift.controls.findIndex(x => x.value === event.target.value);
     wedShift.removeAt(index);
  }
  // console.log(this.DayTimingForm.value);
}
// ---------------------------------------------------------------------------------
onThursdayTime(event : any) {
  const thuShift: FormArray = this.DayTimingForm.get('thuShift') as FormArray;
 
  if (event.target.checked) {
    thuShift.push(new FormControl(event.target.value));
  } else {
     const index = thuShift.controls.findIndex(x => x.value === event.target.value);
     thuShift.removeAt(index);
  }
  // console.log(this.DayTimingForm.value);
}
// ---------------------------------------------------------------------------------
onFridayTime(event : any) {
  const friShift: FormArray = this.DayTimingForm.get('friShift') as FormArray;
 
  if (event.target.checked) {
    friShift.push(new FormControl(event.target.value));
  } else {
     const index = friShift.controls.findIndex(x => x.value === event.target.value);
     friShift.removeAt(index);
  }
  console.log(this.DayTimingForm.value);
}
// ---------------------------------------------------------------------------------
onSaturdayTime(event : any) {
  const satShift: FormArray = this.DayTimingForm.get('satShift') as FormArray;
 
  if (event.target.checked) {
    satShift.push(new FormControl(event.target.value));
  } else {
     const index = satShift.controls.findIndex(x => x.value === event.target.value);
     satShift.removeAt(index);
  }
  // console.log(this.DayTimingForm.value);
}
// -----------------------------------------------------------------------------------

// -------------------------------------------------------------------------

TimingForm(DayTimingForm : any) {
// --------------------- Sunday Shift Timming Start -----------------------
for(var i=0; i<this.Sunday.length; i++)
{
  for(var j=0; j<this.DayTimingForm.value.sunShift.length; j++)
  {
    if(this.DayTimingForm.value.sunShift[j] == this.Sunday[i].id)
    {
      var id = this.Sunday[i].id;
      var name = this.Sunday[i].name;
      var check = 1;
      var status = 1;
      this.sun[j] =
          {
            id : id,
            name : name,
            check : check,
            status : status,
          }
    }
  }
}
// ------------------- Filter Commom Sunday Data -------------------------
 for (let i = 0; i < this.Sunday.length; i++) {
   if (this.Sunday.lastIndexOf(this.Sunday[i]) === this.Sunday.indexOf(this.Sunday[i])) 
   {
     this.sun.push(this.Sunday[i]);
   }
 }
 // -------------- Remove Duplicate Sunday Data -----------------------
 var FinalSundayData = this.sun.reduce((accumalator : any, current : any) => {
   if (
     !accumalator.some(
       (item : any) => item.id === current.id && item.name === current.name
     )
   ) {
     accumalator.push(current);
   }
   return accumalator;
 }, []);
 // -------------- Remove Duplicate Value --------------------
//  console.log(FinalSundayData,'Sunday Final Data Array..........................');
 FinalSundayData.sort((x:any, y:any) => x.id - y.id);
 this.Sunjson = FinalSundayData;
// -------------------------- Sunday Shift Timming End --------------------------------

// --------------------- Monday Shift Timming Start -----------------------
for(var i=0; i<this.Monday.length; i++)
{
  for(var j=0; j<this.DayTimingForm.value.monShift.length; j++)
  {
    if(this.DayTimingForm.value.monShift[j] == this.Monday[i].id)
    {
      var id = this.Monday[i].id;
      var name = this.Monday[i].name;
      var check = 1;
      var status = 1;
      this.mon[j] =
          {
            id : id,
            name : name,
            check : check,
            status : status,
          }
    }
  }
}
// ------------------- Filter Commom Sunday Data -------------------------
 for (let i = 0; i < this.Monday.length; i++) {
   if (this.Monday.lastIndexOf(this.Monday[i]) === this.Monday.indexOf(this.Monday[i])) 
   {
     this.mon.push(this.Monday[i]);
   }
 }
 // -------------- Remove Duplicate Sunday Data -----------------------
 var FinalMondayData = this.mon.reduce((accumalator : any, current : any) => {
   if (
     !accumalator.some(
       (item : any) => item.id === current.id && item.name === current.name
     )
   ) {
     accumalator.push(current);
   }
   return accumalator;
 }, []);
 // -------------- Remove Duplicate Value --------------------
//  console.log(FinalMondayData,'Monday Final Data Array..........................');
 FinalMondayData.sort((x:any, y:any) => x.id - y.id);
 this.Monjson = FinalMondayData;
// -------------------------- Monday Shift Timming End --------------------------------

// --------------------- Tuesday Shift Timming Start -----------------------
for(var i=0; i<this.Tuesday.length; i++)
{
  for(var j=0; j<this.DayTimingForm.value.tueShift.length; j++)
  {
    if(this.DayTimingForm.value.tueShift[j] == this.Tuesday[i].id)
    {
      var id = this.Tuesday[i].id;
      var name = this.Tuesday[i].name;
      var check = 1;
      var status = 1;
      this.tue[j] =
          {
            id : id,
            name : name,
            check : check,
            status : status,
          }
    }
  }
}
// ------------------- Filter Commom Sunday Data -------------------------
 for (let i = 0; i < this.Tuesday.length; i++) {
   if (this.Tuesday.lastIndexOf(this.Tuesday[i]) === this.Tuesday.indexOf(this.Tuesday[i])) 
   {
     this.tue.push(this.Tuesday[i]);
   }
 }
 // -------------- Remove Duplicate Sunday Data -----------------------
 var FinalTuesdayData = this.tue.reduce((accumalator : any, current : any) => {
   if (
     !accumalator.some(
       (item : any) => item.id === current.id && item.name === current.name
     )
   ) {
     accumalator.push(current);
   }
   return accumalator;
 }, []);
 // -------------- Remove Duplicate Value --------------------
//  console.log(FinalTuesdayData,'Tuesday Final Data Array..........................');
 FinalTuesdayData.sort((x:any, y:any) => x.id - y.id);
 this.Tuejson = FinalTuesdayData;
// -------------------------- Tuesday Shift Timming End --------------------------------

// --------------------- Wednesday Shift Timming Start -----------------------
for(var i=0; i<this.Wednesday.length; i++)
{
  for(var j=0; j<this.DayTimingForm.value.wedShift.length; j++)
  {
    if(this.DayTimingForm.value.wedShift[j] == this.Wednesday[i].id)
    {
      var id = this.Wednesday[i].id;
      var name = this.Wednesday[i].name;
      var check = 1;
      var status = 1;
      this.wed[j] =
          {
            id : id,
            name : name,
            check : check,
            status : status,
          }
    }
  }
}
// ------------------- Filter Commom Sunday Data -------------------------
 for (let i = 0; i < this.Wednesday.length; i++) {
   if (this.Wednesday.lastIndexOf(this.Wednesday[i]) === this.Wednesday.indexOf(this.Wednesday[i])) 
   {
     this.wed.push(this.Wednesday[i]);
   }
 }
 // -------------- Remove Duplicate Sunday Data -----------------------
 var FinalWednesdayData = this.wed.reduce((accumalator : any, current : any) => {
   if (
     !accumalator.some(
       (item : any) => item.id === current.id && item.name === current.name
     )
   ) {
     accumalator.push(current);
   }
   return accumalator;
 }, []);
 // -------------- Remove Duplicate Value --------------------
//  console.log(FinalWednesdayData,'Wednesday Final Data Array..........................');
 FinalWednesdayData.sort((x:any, y:any) => x.id - y.id);
 this.Wedjson = FinalWednesdayData;
// -------------------------- Wednesday Shift Timming End --------------------------------

// --------------------- Thursday Shift Timming Start -----------------------
for(var i=0; i<this.Thursday.length; i++)
{
  for(var j=0; j<this.DayTimingForm.value.thuShift.length; j++)
  {
    if(this.DayTimingForm.value.thuShift[j] == this.Thursday[i].id)
    {
      var id = this.Thursday[i].id;
      var name = this.Thursday[i].name;
      var check = 1;
      var status = 1;
      this.thu[j] =
          {
            id : id,
            name : name,
            check : check,
            status : status,
          }
    }
  }
}
// ------------------- Filter Commom Sunday Data -------------------------
 for (let i = 0; i < this.Thursday.length; i++) {
   if (this.Thursday.lastIndexOf(this.Thursday[i]) === this.Thursday.indexOf(this.Thursday[i])) 
   {
     this.thu.push(this.Thursday[i]);
   }
 }
 // -------------- Remove Duplicate Sunday Data -----------------------
 var FinalThursdayData = this.thu.reduce((accumalator : any, current : any) => {
   if (
     !accumalator.some(
       (item : any) => item.id === current.id && item.name === current.name
     )
   ) {
     accumalator.push(current);
   }
   return accumalator;
 }, []);
 // -------------- Remove Duplicate Value --------------------
//  console.log(FinalThursdayData,'Thursday Final Data Array..........................');
 FinalThursdayData.sort((x:any, y:any) => x.id - y.id);
 this.Thujson = FinalThursdayData;
// -------------------------- Thursday Shift Timming End --------------------------------

// --------------------- Friday Shift Timming Start -----------------------
for(var i=0; i<this.Friday.length; i++)
{
  for(var j=0; j<this.DayTimingForm.value.friShift.length; j++)
  {
    if(this.DayTimingForm.value.friShift[j] == this.Friday[i].id)
    {
      var id = this.Friday[i].id;
      var name = this.Friday[i].name;
      var check = 1;
      var status = 1;
      this.fri[j] =
          {
            id : id,
            name : name,
            check : check,
            status : status,
          }
    }
  }
}
// ------------------- Filter Commom Sunday Data -------------------------
 for (let i = 0; i < this.Friday.length; i++) {
   if (this.Friday.lastIndexOf(this.Friday[i]) === this.Friday.indexOf(this.Friday[i])) 
   {
     this.fri.push(this.Friday[i]);
   }
 }
 // -------------- Remove Duplicate Sunday Data -----------------------
 var FinalFridayData = this.fri.reduce((accumalator : any, current : any) => {
   if (
     !accumalator.some(
       (item : any) => item.id === current.id && item.name === current.name
     )
   ) {
     accumalator.push(current);
   }
   return accumalator;
 }, []);
 // -------------- Remove Duplicate Value --------------------
//  console.log(FinalFridayData,'Friday Final Data Array..........................');
 FinalFridayData.sort((x:any, y:any) => x.id - y.id);
 this.Frijson = FinalFridayData;
// -------------------------- Friday Shift Timming End --------------------------------

// --------------------- Saturday Shift Timming Start -----------------------
for(var i=0; i<this.Saturday.length; i++)
{
  for(var j=0; j<this.DayTimingForm.value.satShift.length; j++)
  {
    if(this.DayTimingForm.value.satShift[j] == this.Saturday[i].id)
    {
      var id = this.Saturday[i].id;
      var name = this.Saturday[i].name;
      var check = 1;
      var status = 1;
      this.sat[j] =
          {
            id : id,
            name : name,
            check : check,
            status : status,
          }
    }
  }
}
// ------------------- Filter Commom Sunday Data -------------------------
 for (let i = 0; i < this.Saturday.length; i++) {
   if (this.Saturday.lastIndexOf(this.Saturday[i]) === this.Saturday.indexOf(this.Saturday[i])) 
   {
     this.sat.push(this.Saturday[i]);
   }
 }
 // -------------- Remove Duplicate Sunday Data -----------------------
 var FinalSaturdayData = this.sat.reduce((accumalator : any, current : any) => {
   if (
     !accumalator.some(
       (item : any) => item.id === current.id && item.name === current.name
     )
   ) {
     accumalator.push(current);
   }
   return accumalator;
 }, []);
 // -------------- Remove Duplicate Value --------------------
//  console.log(FinalSaturdayData,'Saturday Final Data Array..........................');
 FinalSaturdayData.sort((x:any, y:any) => x.id - y.id);
 this.Satjson = FinalSaturdayData;
// -------------------------- Saturday Shift Timming End --------------------------------

  // ------------------------------------------------------------------------------
    var shift = {
      email: this.loggedInUser.email,
      sun: this.Sunjson == '' ? this.Sunday : this.Sunjson,
      mon: this.Monjson == '' ? this.Monday : this.Monjson,
      tue: this.Tuejson == '' ? this.Tuesday : this.Tuejson,
      wed: this.Wedjson == '' ? this.Wednesday : this.Wedjson,
      thu: this.Thujson == '' ? this.Thursday : this.Thujson,
      fri: this.Frijson == '' ? this.Friday : this.Frijson,
      sat: this.Satjson == '' ? this.Saturday : this.Satjson,
    }
    // console.log(shift, "ShiftData");
    this.httpService.UpdateTimePeriod(shift).subscribe(
      (post: any) => {
        var shifts = post;
        this.CalendarView();
        // console.log(shifts, 'ShiftData');
      });
}
// --------------------------------------------------------------------------------

  ShiftData() {
    var Email = this.loggedInUser.email;
    this.httpService.ShiftData({ email: Email }).subscribe(
      (res: any) => {
        this.shiftdata = res;
        this.ResData = this.shiftdata[0];
        this.Sunday = this.ResData.sun;
        this.Monday = this.ResData.mon;
        this.Tuesday = this.ResData.tue;
        this.Wednesday = this.ResData.wed;
        this.Thursday = this.ResData.thu;
        this.Friday = this.ResData.fri;
        this.Saturday = this.ResData.sat;        
        ///////////////////////////////////////////////////////////////////
        this.timePeriod.controls["StartTime"].setValue(this.shiftdata[0].start);
        this.timePeriod.controls["EndTime"].setValue(this.shiftdata[0].end);
        // this.DayTimingForm.controls['sunShift'].setValue(this.Sunday);
        // this.DayTimingForm.controls['monShift'].setValue(this.Monday);
        // this.DayTimingForm.controls['tueShift'].setValue(this.Tuesday);
        // this.DayTimingForm.controls['wedShift'].setValue(this.Wednesday);
        // this.DayTimingForm.controls['thuShift'].setValue(this.Thursday);
        // this.DayTimingForm.controls['friShift'].setValue(this.Friday);
        // this.DayTimingForm.controls['satShift'].setValue(this.Saturday);
        /////////////////////////////////////////////////////////////////////
      })
  }

}
