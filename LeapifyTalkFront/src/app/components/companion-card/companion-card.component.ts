import { Component, OnInit } from '@angular/core';
import { faComment, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-companion-card',
  templateUrl: './companion-card.component.html',
  styleUrls: ['./companion-card.component.css']
})
export class CompanionCardComponent implements OnInit {
  faComment: any = faComment;
  faStar:any = faStar
  descriptionLess:string = "Simple solution for all the complicated problem is just to face them and think Simple solution for all the complicated problem is just to face them and think"
  descriptionMore:string = ""
  isLessDescription:boolean = true;
  constructor() { 
    
  }

  ngOnInit(): void {
    this.splitDescription(this.descriptionLess);
    
  }

  splitDescription = (description:string) =>{
    let splitIndex:number = 78;
    for(let i=78;i<=90;i++){
      if(description[i] && description[i] === " "){
        splitIndex = i;
        break;
      }
    }
    let less = description.substring(0,splitIndex)
    let more = description.substring(splitIndex)
    this.descriptionLess = less;
    this.descriptionMore = more;
  }


  showMore = () => {
    this.isLessDescription = !this.isLessDescription
  }
}
