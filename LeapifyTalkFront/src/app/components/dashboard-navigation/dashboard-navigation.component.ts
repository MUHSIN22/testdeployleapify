import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { TherapistAuthService } from 'src/app/services/therapist-auth.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-dashboard-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.css']
})
export class DashboardNavigationComponent implements OnInit {
  @Input() expandNav: boolean = false;
  @Input() navLinks:any;
  @Input() isDashSlide:boolean = false;
  @Output() toggleNav = new EventEmitter();
  constructor(public httpService: HttpService,public _snackbar: MatSnackBar,public router:Router,public therapistAuthService:TherapistAuthService) { }

  ngOnInit(): void {}

  toggleDash = () => {
    this.toggleNav.emit()
    
  }

  logout() {
    let isConfirmed = window.confirm('Are you sure to logout?')
    if(isConfirmed){
      if(this.httpService.loggedInUser.user&&this.httpService.loggedInUser.user === "therapist"){
        this.therapistAuthService.logout().then((res:any) => {
          this.httpService.resetUser()
          this._snackbar.openFromComponent(ToastComponent,{data:{type:"success",message:"Logged out successfully"}})
          this.router.navigate(['/inspired'])
        })
      }else{
        this.httpService.logout().then(
          (res) => {
            this._snackbar.openFromComponent(ToastComponent,{data:{type:"success",message:"Logged out successfully"}})
            this.router.navigate(['/signin'])
          }
        );
      }
    }
  }

}
