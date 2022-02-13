import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-is-user-verify',
  templateUrl: './is-user-verify.component.html',
  styleUrls: ['./is-user-verify.component.css']
})
export class IsUserVerifyComponent implements OnInit {

  otpform!: FormGroup;
  resetpass!: FormGroup;
  otp_form: boolean = true;
  resetpass_form: boolean = false;
  post: any;
  showErrormsg: boolean = false;
  GOTP: string = '00000';
  userSignUp: any = localStorage.getItem("UserSignUp");
  userLogIn: any = localStorage.getItem("UserLogIn");
  recoverPassword: any = localStorage.getItem("RecoverPassword");
  // doctorSignUp: any = localStorage.getItem("DoctorSignUp");
  resdata: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private service: HttpService) { }

  ngOnInit(): void {

    this.otpform = this.fb.group({
      OTP: ['', [Validators.required]]
    },
      {
        validators: this.MustMatch('GOTP', 'OTP')
      }
    );

  }
  // OTP Match Start
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMach) {
        return
      }
      if (this.GOTP !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      }
    }
  }
  // OTP Match End
  // ============================= OTP Verify Function Start =================================
  UserVerify(otpform: any) {
    // debugger;
    this.showErrormsg = true;
    if (otpform.valid && this.otpform.value.OTP == this.GOTP) {
      // debugger;
      // =================== Client SignUp Start ==========================
      if (this.userSignUp != null) {
        var UserData = JSON.parse(localStorage.getItem("UserSignUp")!);
        // console.log(UserData, "UserSignUp");
        this.service.UserReg(UserData).subscribe(
          (post : any) => {
            this.resdata = post;
            // console.log(this.resdata,'Post');
            alert(this.resdata.msg);
            localStorage.removeItem("UserSignUp");
            this.router.navigate(['/signin']);
          });
      }
      // =================== Client SignUp End ===============================
    }
  }
  // ========================= Otp Verify Function End =========================================

}
