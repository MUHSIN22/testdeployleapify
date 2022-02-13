import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

declare var $ : any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  DoctorMenu : boolean = false;
  PatientMenu : boolean = false;
  loggedInUser: any;

  constructor(private httpService: HttpService,) { }

  ngOnInit(): void {

    this.httpService.userSubject.subscribe(
      (user : any)=>{
        this.loggedInUser = user;
      }
    )
    // console.log(this.loggedInUser);
    if(this.loggedInUser.role == 'Doctor')
    {
      this.DoctorMenu = true;
    }
    if(this.loggedInUser.role == 'Patient')
    {
      this.PatientMenu = true;
    }

    $("#icon").mouseover(function(){
      $(".sidebar").addClass("size_sidebar");
      $(".nav").addClass("size_sidebar");
      $(".title").addClass("show");
    });
    $("#icon").mouseout(function(){
      $(".sidebar").removeClass("size_sidebar");
      $(".nav").removeClass("size_sidebar");
      $(".title").removeClass("show");
    });
  }

}
