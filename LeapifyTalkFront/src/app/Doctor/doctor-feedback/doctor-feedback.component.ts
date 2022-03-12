import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-doctor-feedback',
  templateUrl: './doctor-feedback.component.html',
  styleUrls: ['./doctor-feedback.component.css']
})
export class DoctorFeedbackComponent implements OnInit {

  Feedback : any;
  loggedInUser : any;
  Status: any;

  constructor(rating: NgbRatingConfig, private httpService: HttpService,) 
  {
    rating.max = 5;
    rating.readonly = true;
   }

  ngOnInit(): void {

    this.httpService.userSubject.subscribe(
      (user)=>{
        this.loggedInUser = user;
      })
      // console.log(this.loggedInUser.email);

      this.FeedBackData();
  }


  FeedBackData()
{
  var Email = this.loggedInUser.email;
  // console.log(Email);
    this.httpService.D_FeedBackData({Email}).subscribe(
      (feedback : any) => {
        this.Feedback = feedback;
        // console.log(this.Feedback,"FeedbackData");
        for (var i = 0; i < this.Feedback.length; i++) {
          this.Status = this.Feedback[i];
          // console.log(this.Status._id+' '+this.Status.status);
          }
      })
}

Fav(_id : any)
{
  if(this.Status.Status == '0')
  {
    var fav = {
      _id : _id,
      Status : "1"
    }
  // console.log(fav,"Fav");
  this.httpService.Fav(fav).subscribe(
    (fav : any) => {
      // alert(fav.msg);
      window.location.reload();
    })
  }
  else if(this.Status.Status == '1')
  {
    var unfav = {
      _id : _id,
      Status : "0"
    }
    // console.log(unfav,"UnFav");
    this.httpService.Fav(unfav).subscribe(
      (unfav : any) => {
        // alert(unfav.msg);
        window.location.reload();
      })
  }
}

}
