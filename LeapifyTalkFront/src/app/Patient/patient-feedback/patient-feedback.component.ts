import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-patient-feedback',
  templateUrl: './patient-feedback.component.html',
  styleUrls: ['./patient-feedback.component.css']
})
export class PatientFeedbackComponent implements OnInit {

  FeedbackData = JSON.parse(localStorage.getItem("Feedback")!);
   
  currentRating :any = 0;
  Alldata : any;
  Feedback : any;

  constructor(rating: NgbRatingConfig, private fb:FormBuilder, private httpService: HttpService, private router: Router) 
  {
    rating.max = 5;
    rating.readonly = true;
   }

  ngOnInit(): void {
      this.FeedBackData();
  }

FeedBackData()
{
  var Email = this.FeedbackData.P_email;
  // console.log(Email);
    this.httpService.FeedBackData({Email}).subscribe(
      (feedback : any) => {
        this.Feedback = feedback;
        // console.log(this.Feedback,"FeedbackData");
      })
}

// DeleteFeedBack(_id : any)
// {
//   var x = confirm("Are you sure you want to delete?");
//   if (x)
//   {
//     return this.service.DeleteFeedBack({id:_id}).subscribe(
//     (deletefeedback : any) => {
//       // deletefeedback;
//       // console.log(deletefeedback,"Delete By Id");
//       // console.log(_id,"Delete By Id");
//       window.location.reload();
//     })
//     // return true;
//   }
//   else
//   {
//     return false;
//   }

// }

}
