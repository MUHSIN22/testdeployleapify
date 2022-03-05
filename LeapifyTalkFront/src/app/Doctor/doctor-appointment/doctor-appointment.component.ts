import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit {

  loggedInUser: any;
  bookingdata : any = [];

  constructor(private httpService: HttpService,) { }

  ngOnInit(): void {
    this.httpService.userSubject.subscribe(
      (user) => {
        this.loggedInUser = user;
      })
    // console.log(this.loggedInUser.email);

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

  AppJoin(_id : any, Link : any)
{
  if(window.confirm('Are sure you want to Join this Appointment ?')){
    // alert(_id+' '+Link);
  }
}

}
