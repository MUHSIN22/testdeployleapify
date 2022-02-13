import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TherapistAuthService } from 'src/app/services/therapist-auth.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-therapist-new-password',
  templateUrl: './therapist-new-password.component.html',
  styleUrls: ['./therapist-new-password.component.css']
})
export class TherapistNewPasswordComponent implements OnInit {
  public data:any = {
    password: '',
    c_password: ''
  }
  public token:any;
  public arePasswordsEqual:boolean = false
  passwordPattern: string = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'

  constructor(private route:ActivatedRoute, private router:Router, public authService:TherapistAuthService,private _snackBar:MatSnackBar ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res:any) => {
      this.token = res.params.id
    })
  }

  onSubmit = () => {
    if(this.arePasswordsEqual){
      let pass = {
        new_password: this.data.password,
        confirm_password: this.data.c_password
      }
      this.authService.changePassword(pass,this.token).subscribe((res:any) => {

        if(res.status === "ok"){
          this.router.navigateByUrl('/therapist-password-changed')
        }else{
          this._snackBar.openFromComponent(ToastComponent, { data: { type:"error", message: res.msg}})
        }
      })
    }else{
      this._snackBar.openFromComponent(ToastComponent, { data: { type:"error", message:"Something went wrong!"}})
    }
  }

  checkPassword = () => {
    if(this.data.password === this.data.c_password) {
      this.arePasswordsEqual = true
    }
  }
}
