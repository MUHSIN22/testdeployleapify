import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public starHover: number = 0;
  public currentRating: number = 0;
  public isVisible:boolean = true;
  @Output() reviewEmitter:any = new EventEmitter();
  public data:any = {
    rates: this.starHover,
    review: ''
  };

  constructor(private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onMouseOverStar = (rate:number) => {
    this.starHover = rate
    
  }

  onMouseOutStar = () => {
    if(this.currentRating === 0){
      this.starHover = 0
    }else{
      this.starHover = this.currentRating
    }
  } 

  rateTheCourse = (id:any, rate: number) => {
    this.starHover = rate;
    this.currentRating = rate;
  }

  setVisibility = (event:any) =>{
    if(event.target.classList[0] === "review-wrapper"){
      this.isVisible = false
    }
    
  }

  addReview = () => {
    this.data.rates = this.starHover
    
    if(this.data.rates !== 0){
      this.reviewEmitter.emit(this.data);
      this.isVisible = false
    }else{
      this._snackBar.openFromComponent(ToastComponent, {data:{type:"error",message:"Please rate the course"}})
    }
  }

}
