import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData:any = {
    email: '',
    password: ''
  };
  constructor(private httpService:HttpService, private toastr:NbToastrService, private router:Router) { }

  ngOnInit(): void {
    this.httpService.isLoggedIn.subscribe((isLoggedIn:boolean) => {
      if(isLoggedIn) {
        // this.router.navigate(['/pages/dashboard'])
      }
    })
  }

  onSubmit = () => {
    this.httpService.loginAdmin(this.loginData).subscribe((res:any) => {
      console.log(res);
      if(res.status === 'ok') { 
        this.toastr.warning("Checking the credential")
        this.httpService.setUser(res.token)
        setTimeout(()=>{
          this.toastr.success(res.message,"Congrats")     
          this.router.navigate(['/pages/dashboard'])
        },1000)
      }else{
        this.toastr.danger(res.msg,"Error")
      }
    })
  }

}
