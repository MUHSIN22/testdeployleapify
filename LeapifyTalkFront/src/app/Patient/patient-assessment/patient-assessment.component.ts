import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-patient-assessment',
  templateUrl: './patient-assessment.component.html',
  styleUrls: ['./patient-assessment.component.css']
})
export class PatientAssessmentComponent implements OnInit {

  loggedInUser: any;
  Userdata: any;
  Result: any;

  constructor(private httpService: HttpService,) { }

  ngOnInit(): void {
    this.httpService.userSubject.subscribe(
      (user) => {
        this.loggedInUser = user;
      })
  // ================== Get User Data Start =====================================
    var Email = { email: this.loggedInUser.email }
    console.log(Email,"Email");
    this.httpService.UserData(Email).subscribe(
      (res: any) => {
        this.Userdata = res;
        this.Result = this.Userdata.result;
        // console.log(this.Result);
      })
  // ======================= Get User Data End =====================================
  }

}
