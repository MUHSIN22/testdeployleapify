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
  rating! : FormGroup; 
  currentRating :any = 0;
  Alldata : any;
  Feedback : any;

  constructor(rating: NgbRatingConfig, private fb:FormBuilder, private httpService: HttpService, private router: Router) 
  {
    rating.max = 5;
    rating.readonly = true;
   }

  ngOnInit(): void {

    this.rating=this.fb.group({
      Rate : ['',[]],
      Message : ['',[]]
    });

    this.FeedBackData();
  }

  Rating(rating : any)
{
  if (rating.valid)
  {
    // console.log(this.FeedbackData,'Feedback Data');
    var Feedback = {
      D_email: this.FeedbackData.D_email,
      P_email: this.FeedbackData.P_email,
      D_name: this.FeedbackData.D_name,
      P_name: this.FeedbackData.P_name,
      C_Date : this.FeedbackData.C_Date,
      Rating : this.rating.value.Rate,
      Message : this.rating.value.Message,
      Status : '0',
    }
    // console.log(Feedback,'Feedback Submit');
    this.httpService.Feedback(Feedback).subscribe(
      (post:any) => {
        alert(post.msg);
        window.location.reload();
      });
  }
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
