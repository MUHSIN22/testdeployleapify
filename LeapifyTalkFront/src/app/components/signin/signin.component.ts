import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';
import { TherapistAuthService } from 'src/app/services/therapist-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loggedInUser: any;
  emailReset: string = "";
  forgotRequestSent: boolean = false;
  forgotPasswordFlag: boolean = false;
  forgotEmail: string = "";
  error: boolean = false;
  errorText: string = "";
  user: {
    email: string,
    password: string
  } = {
      email: "",
      password: ""
    };

  reset_password = {
    new_password: "",
    confirm_password: "",
    token: ""
  };
  public data: any = {
    credential: '',
    password: '',
    otp: ''
  };

  constructor(
    private router: Router,
    private httpService: HttpService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public auth: TherapistAuthService,
  ) { }

  ngOnInit(): void {
    if (this.router.url.startsWith("/reset-password")) {
      this.emailReset = this.activatedRoute.snapshot.paramMap.get("id") as string;
    }
  }

  submit({ valid, value }: NgForm) {
    if (valid) {
      this.httpService.login(value).then(
        (res) => {
          if (res.data.status == 'error')
            this.openSnackBar(res.data.msg, "error");
          else {
            this.openSnackBar(res.data.msg, "success");
            localStorage.setItem('id_token', res.data.token)
            this.httpService.setUser(res.data.token)
            // this.router.navigate(['/student/course']);
            this.httpService.userSubject.subscribe(
              (user) => {
                this.loggedInUser = user;
                console.log(this.loggedInUser);
                
              }
            )
            if (this.loggedInUser.role == 'Doctor') {
              this.router.navigate(['/doctor-profile']);
            }
            if (this.loggedInUser.role == 'Patient') {
              this.router.navigate(['/patient-dashboard']);
            }
            if (this.loggedInUser.role == 'therapist') {
              this.router.navigate(['/therapist/dashboard']);
            }
            if (this.loggedInUser.role == 'companion') {
              this.router.navigate(['/companion/home']);
            }
          }
        },
        (err) => {
          this.openSnackBar('Something went wrong', 'error');
        }
      );
    }
    else {
      this.error = true;
    }
  }

  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(ToastComponent, { data: { type: type, message: message } })
  }

  forgotPassword({ valid, value }: NgForm) {

    if (valid) {
      this.httpService.forgotPassword(value).then(
        (res) => {
          this.forgotRequestSent = true;
          this.forgotEmail = "";
        }
      )
    }
  }

  changePassword({ value, valid }: NgForm) {
    if (valid) {
      this.reset_password.token = this.emailReset;
      this.httpService.verifyEmailToken(this.reset_password.token).then(
        () => {
          this.httpService.resetPassword(this.reset_password).then(
            (res) => {
              if (res.data.status == "error") {
                this.openSnackBar(res.data.msg, "error");
              }
              else {
                this.openSnackBar("Password changed Successfully", "success");
                this.router.navigate(['/signin']);
              }
            }
          )

        }
      )
    }
  }

  hasRoute(url: string) {
    return this.router.url.startsWith(url);
  }

}
