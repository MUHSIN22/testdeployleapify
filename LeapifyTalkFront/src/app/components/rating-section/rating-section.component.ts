import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-section',
  templateUrl: './rating-section.component.html',
  styleUrls: ['./rating-section.component.css']
})
export class RatingSectionComponent implements OnInit {
  @Input() ratingDetails:any;
  @Input() isSingleCourse: boolean = false;
  @Input() isReviewer:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setStar = (starNum:number):string =>{
    if(this.ratingDetails.rating >= starNum){
      return 'fas fa-star'
    }else if(this.ratingDetails.rating > starNum-1 && this.ratingDetails.rating < starNum){
      return "fas fa-star-half-alt"
    }else{
      return 'far fa-star'
    }
    // "fas fa-star-half-alt"
  } 

}
