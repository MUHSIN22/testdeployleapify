import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TherapistAuthService } from 'src/app/services/therapist-auth.service';
import { RegCredentials } from 'src/interfaces';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-therapist-registration-template',
  templateUrl: './therapist-registration-template.component.html',
  styleUrls: ['./therapist-registration-template.component.css']
})
export class TherapistRegistrationTemplateComponent implements OnInit {
  public credentials: RegCredentials = {
    name: '',
    password: '',
    otp: '',
    credential: '',
  }
  public phone:any;
  public isMobileRegistration: boolean = false;
  public mobilePattern: any = '(^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$)|(^[0-9]+$)';
  public isLoading: boolean = false;
  public popOtp: boolean = false;

  constructor(public authService: TherapistAuthService,public _snackBar:MatSnackBar, public route:Router ) { }

  ngOnInit(): void {
    
  }

  handleRegFormSubmission = ():void => {
    let data = {
      name: this.credentials.name,
      password: this.credentials.password,
      email: this.credentials.credential
    }
    this.authService.regitsterUser(data).subscribe((res:any)=>{
      if(res.status === 'ok'){
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"success",message:res.msg}})
        this.route.navigateByUrl('/therapist-signin');
      }else{
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"error", message: res.msg}})
      }
    })
  }

  checkWhetherPhoneOrEmail = () => {
    var mobileRegex = /^[0-9]+$/
    if(this.credentials.credential.match(mobileRegex)){
      this.isMobileRegistration = true;
    }else{
      this.isMobileRegistration = false;
    }
  }

  sendOTP = () =>{
    let data = {
      name: this.credentials.name,
      phone: this.credentials.credential
    }
    this.phone = data.phone
    this.authService.sendOtpToUser(data).subscribe((res:any) => {
      if(res.status === "error"){
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"error",message: res.msg}})
      }else{
        this.popOtp = true
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"success",message: "OTP sent successfully."}})
      }
    })
  }

  resendOTP = () => {
    let data = {
      phone: this.credentials.credential
    }
    this.authService.resendOtp(data).subscribe((res:any) => {
      if(res.status === "error"){
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"error",message: res.msg}})
      }else{
        this.popOtp = true
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"success",message: "OTP sent successfully."}})
      }
    })

  }

  handleOtp = (otp:any) => {
    this.credentials.otp = otp
    this.verifyOtp()
  }

  verifyOtp = () => {
    this.isLoading = true
    let data = {
      phone : this.phone,
      otp: this.credentials.otp
    }
    
    this.authService.verifyOtp(data).subscribe((res) => {
      if(res.status === "ok"){
        this.popOtp = true
        this.route.navigateByUrl('/therapist-signin')
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"success",message:res.msg}})
      }else{
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"error", message: res.msg}})
      }
      this.isLoading = false
    })
  }
}
