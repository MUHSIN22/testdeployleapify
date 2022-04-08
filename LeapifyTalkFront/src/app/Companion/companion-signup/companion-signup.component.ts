import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { CompanionService } from 'src/app/services/companion.service';
import { HttpService } from 'src/app/services/http.service';
import { TherapistAuthService } from 'src/app/services/therapist-auth.service';

@Component({
  selector: 'app-companion-signup',
  templateUrl: './companion-signup.component.html',
  styleUrls: ['./companion-signup.component.css']
})
export class CompanionSignupComponent implements OnInit {
  public data:any = {
    email: '',
    password: '',
    name: ''
  };

  public phone:any;
  public isMobileRegistration: boolean = false;
  public isLoading:boolean = false;
  public popOtp:boolean = false

  constructor(
    public _snackBar:MatSnackBar,
    public httpService: HttpService,
    public route:Router,
    public companionService: CompanionService ) { }

  ngOnInit(): void {
    this.httpService.userSubject.subscribe((res:any) => {
      console.log(res);
      
    })
  }

  onSubmit = (): void => {
    this.companionService.companionSignup(this.data).subscribe((res:any) => {
      if(res.status === "ok"){
        this._snackBar.openFromComponent(ToastComponent,{data:{type: "success", message:res.msg}})
        this.route.navigate(['/signin'])
      }else{
        this._snackBar.openFromComponent(ToastComponent,{data:{type: "error", message:res.msg}})
      }
    })
  }

}
