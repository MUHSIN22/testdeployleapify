import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/Notification';
import { ChatService } from 'src/app/services/chat.service';
import { HttpService } from 'src/app/services/http.service';
import { TherapistAuthService } from 'src/app/services/therapist-auth.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('toggle') toggle!: MatButton;

  isLoggedIn: boolean = false;
  loggedInUser: any;
  getStarted: boolean = false;
  notifications: string[] = []; 
  isSlideNav:boolean = false
  navigation:any ;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private chatService: ChatService,
    private _snackBar: MatSnackBar,
    private theapistAuthService:TherapistAuthService
  ) {
   }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (this.router.url.startsWith("/get-started") || this.router.url.startsWith("/startup"))
        this.getStarted = true;
      else
        this.getStarted = false;
    }
    )
    this.httpService.isloggedIn.asObservable().subscribe(
      (data)=>{
        this.isLoggedIn = data;
      }
    )

    this.httpService.userSubject.subscribe(
      (user)=>{
        this.loggedInUser = user;
      }
    )
    this.chatService.notificationSubject.subscribe(
      (not)=>{
        this.notifications = not;
      }
    )

    if(this.httpService.loggedInUser.user&&this.httpService.loggedInUser.user === "therapist"){
      this.navigation = {
        dashboard: "/therapist/dashboard",
        learning: '/courses', 
        edit: '/therapist/edit-profile',
        group: '/therapist/group/id'
      }
    }else if(this.httpService.loggedInUser.user&&this.httpService.loggedInUser.user === "companion"){
      this.navigation = {
        dashboard: '/companion/home',
        learning: '/courses', 
        edit: '/student/edit-profile',
        group: '/student/group/id'
      }
    }else{
      this.navigation = {
        dashboard: '/student/course',
        learning: '/courses', 
        edit: '/student/edit-profile',
        group: '/student/group/id'
      }
    }
  }

  hide() {
    if (window.innerWidth < 976)
      this.toggle._elementRef.nativeElement.click();;
  }

  logout() {
    let isConfirmed = window.confirm('Are you sure to logout?')
    if(isConfirmed){
      if(this.httpService.loggedInUser.user&&this.httpService.loggedInUser.user === "therapist"){
        this.theapistAuthService.logout().then((res:any) => {
          this.httpService.resetUser()
          this.openSnackBar("Logged out successfully", "success");
          this.router.navigate(['/inspired'])
        })
      }else{
        this.httpService.logout().then(
          (res) => {
            this.openSnackBar(res.data.msg, "success");
            this.router.navigate(['/signin'])
          }
        );
      }
    }
  }

  navigateToDashboard = () => {
    if(this.loggedInUser && this.loggedInUser.user === 'therapist'){
      this.router.navigate(['/therapist/dashboard'])
    }else if(this.loggedInUser && this.loggedInUser.role === "companion"){

    }else{
      this.router.navigate(['/student/course'])
    }
  }

  toggleNavSlide = () => {
    this.isSlideNav = !this.isSlideNav
  }

  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(ToastComponent, { data: { type: type, message: message } })
  }
}
