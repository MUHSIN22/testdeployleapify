import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TherapistAuthService } from 'src/app/services/therapist-auth.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-therapist-reset-password',
  templateUrl: './therapist-reset-password.component.html',
  styleUrls: ['./therapist-reset-password.component.css']
})
export class TherapistResetPasswordComponent implements OnInit {
  public data:any = {
    email: ''
  }
  public emailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  constructor(
    private therapistService: TherapistAuthService, 
    private _snackBar: MatSnackBar,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit = () => {
    this.therapistService.forgotPassword(this.data).subscribe((res:any) => {

      if(res.status === "ok"){
        this._snackBar.openFromComponent(ToastComponent,{data:{type:"success",message:res.msg}})
        this.router.navigate(['/therapist-signin'])
      }else{
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"error",message:res.msg}})
      }
    })
  }
}


