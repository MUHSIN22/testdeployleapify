import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { HttpService } from 'src/app/services/http.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-initial-startup',
  templateUrl: './initial-startup.component.html',
  styleUrls: ['./initial-startup.component.css']
})
export class InitialStartupComponent implements OnInit, AfterViewInit {

  @ViewChild('userForm') form!: NgForm;
  acceptError: boolean = false;
  error: boolean = false;
  cpassword: string = "";
  step = 1;
  user: User = {
    name: "",
    age: 0,
    email: "",
    gender: "",
    password: ""
  }
  accept: boolean = false;
  ageString: string = "";

  constructor(
    private router: Router,
    private httpService: HttpService,
    private _snackbar: MatSnackBar
  ) { }
  ngAfterViewInit(): void {
    if (window.innerWidth > 992)
      document.documentElement.scrollTop = 115;
    else {
      document.documentElement.scrollTop = 80;
    }
  }

  ngOnInit(): void {

  }

  submit({ valid, value }: NgForm) {
    if (!this.accept) this, this.acceptError = true;
    if (valid) {
      value.age = Number.parseInt(this.ageString);
      this.httpService.register(value as User).then((res) => {
        if (res.data.status == 'error') {
          this.openSnackbar(res.data.msg, "error")
        }
        else {
          this.step = 3;
        }
        this.form.resetForm();
      }, (err) => {
        this.openSnackbar('Something went wrong', 'error');
      })
    }
    else {
      this.error = true;
    }

  }

  openSnackbar(msg: string, type: string) {
    this._snackbar.openFromComponent(ToastComponent, { data: { message: msg, type: type } })
  }
}
