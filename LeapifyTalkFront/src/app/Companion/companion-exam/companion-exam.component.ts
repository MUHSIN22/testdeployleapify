import { Component, OnInit } from '@angular/core';
import {faCheck,faXmark} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-companion-exam',
  templateUrl: './companion-exam.component.html',
  styleUrls: ['./companion-exam.component.css']
})
export class CompanionExamComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;
  questions: any = [
    {
      scenario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit lectus ac vestibulum. Auctor et leo non nisi tempor vitae nibh eu mauris. Tincidunt mauris et in tempus volutpat. Pellentesque senectus ultrices venenatis senectus vulputate nec. Arcu, nullam mauris ut consectetur scelerisque ipsum.",
      question: "This is question one",
      options: ['Wrong1','Wrong2','Right','Wrong3'], 
      correct: 2
    },
    {
      scenario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit lectus ac vestibulum. Auctor et leo non nisi tempor vitae nibh eu mauris. Tincidunt mauris et in tempus volutpat. Pellentesque senectus ultrices venenatis senectus vulputate nec. Arcu, nullam mauris ut consectetur scelerisque ipsum.",
      question: "This is question 2",
      options: ['Right','Wrong2','Wrong1','Wrong3'], 
      correct: 1
    },
    {
      scenario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit lectus ac vestibulum. Auctor et leo non nisi tempor vitae nibh eu mauris. Tincidunt mauris et in tempus volutpat. Pellentesque senectus ultrices venenatis senectus vulputate nec. Arcu, nullam mauris ut consectetur scelerisque ipsum.",
      question: "This is question 3",
      options: ['Wrong1','Wrong2','Wrong3','Right'], 
      correct: 3
    },
    {
      scenario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit lectus ac vestibulum. Auctor et leo non nisi tempor vitae nibh eu mauris. Tincidunt mauris et in tempus volutpat. Pellentesque senectus ultrices venenatis senectus vulputate nec. Arcu, nullam mauris ut consectetur scelerisque ipsum.",
      question: "This is question 4",
      options: ['Right','Wrong2','Wrong1','Wrong3'], 
      correct: 0
    },
    {
      scenario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit lectus ac vestibulum. Auctor et leo non nisi tempor vitae nibh eu mauris. Tincidunt mauris et in tempus volutpat. Pellentesque senectus ultrices venenatis senectus vulputate nec. Arcu, nullam mauris ut consectetur scelerisque ipsum.",
      question: "This is question 5",
      options: ['Wrong1','Wrong2','Right','Wrong3'], 
      correct: 2
    }
  ];

  currentIndex:number = 0;
  constructor() { }

  ngOnInit(): void {
  }


  handleAnswerSelection = (event:any) => {
    console.log(event.target.id,this.questions[this.currentIndex].correct);
    if(event.target.id == this.questions[this.currentIndex].correct) {
      event.target.style.backgroundColor = " #00B879";
      event.target.querySelector(".option-true").hidden = false;
    }else{
      event.target.style.backgroundColor = " #FF6273";
      event.target.querySelector(".option-false") ? event.target.querySelector(".option-false").hidden = false:null;
    }
  }
}
