import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { HttpService } from 'src/app/services/http.service';
import { TherapistAuthService } from 'src/app/services/therapist-auth.service';

@Component({
  selector: 'app-companion-signup',
  templateUrl: './companion-signup.component.html',
  styleUrls: ['./companion-signup.component.css']
})
export class CompanionSignupComponent implements OnInit {
  public data:any = {
    credential: '',
    password: '',
    otp: ''
  };

  public phone:any;
  public isMobileRegistration: boolean = false;
  public isLoading:boolean = false;
  public popOtp:boolean = false

  constructor(public _snackBar:MatSnackBar,public auth:TherapistAuthService, public httpService: HttpService, public route:Router) { }

  ngOnInit(): void {
    this.httpService.userSubject.subscribe((res:any) => {
      
      if(res.user && res.user === "therapist"){
        this.route.navigateByUrl('/therapist/dashboard')
      }
    })
  }

  onSubmit = (): void => {
    let isNavigate = false;
    if(this.isMobileRegistration){

    }else{
      let newData = {
        password: this.data.password,
        email: this.data.credential
      };
      this.auth.signin(newData).subscribe(async(res:any)=>{
        if(res.status === "error"){
          this._snackBar.openFromComponent(ToastComponent,{data:{type:"error",message:res.msg}})
        }else if(res.status === "ok"){
          await localStorage.setItem('id_token',res.token)
          this.httpService.setUser(res.token)
          this.route.navigateByUrl('therapist/dashboard')
        }
      })
    }
  }

  storeItemInLocal = (name:string,item:any) => {
    return new Promise((resolve, reject) => {
      try{
        localStorage.setItem(name,item);
        resolve("Added")
      }catch(err){
        reject(err);
      }
      
    })
  }
  checkWhetherPhoneOrEmail = () => {
    var mobileRegex = /^[0-9]+$/
    if(this.data.credential.match(mobileRegex)){
      this.isMobileRegistration = true;
    }else{
      this.isMobileRegistration = false;
    }
  }

  sendOtp = () =>{
    this.isLoading = true
    let data = {
      phone: this.data.credential
    }
    this.phone = data.phone
    this.auth.loginOtp(data).subscribe((res:any) => {
      console.log(res);
      
      if(res.status === "ok"){
        this.popOtp = true;
        this._snackBar.openFromComponent(ToastComponent, {data: { type:"success",message:"OTP sent successfully"}})
      }else{
        this._snackBar.openFromComponent(ToastComponent, {data: { type:"error",message:res.msg}})
      }
      this.isLoading = false;
    })
  }

  resendOTP = () => {
    let data = {
      phone: this.data.credential
    }
    this.auth.resendOtp(data).subscribe((res:any) => {

      if(res.status === "error"){
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"error",message: res.msg}})
      }else{
        this.popOtp = true
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"success",message: "OTP sent successfully."}})
      }
    })

  }

  handleOtp = (otp:any) => {

    this.data.otp = otp
    this.verifyOtp();
  }

  verifyOtp = () => {
 
    let field = {
      phone: this.data.credential,
      otp: this.data.otp
    }
    this.auth.verifyLoginOtp(field).subscribe((res:any) => {
      if(res.status === 'ok'){
        localStorage.setItem('id_token',res.token)
        this.httpService.setUser(res.token)
        this.route.navigateByUrl('/therapist/dashboard')
        this._snackBar.openFromComponent(ToastComponent, {data: { type:"success",message:"OTP verified successfully"}})
      }else{
        this._snackBar.openFromComponent(ToastComponent, {data: { type:"error",message:res.msg}})
      }
    })
  }

}
