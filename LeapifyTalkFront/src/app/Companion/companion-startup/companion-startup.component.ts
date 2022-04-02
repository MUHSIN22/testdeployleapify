import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companion-startup',
  templateUrl: './companion-startup.component.html',
  styleUrls: ['./companion-startup.component.css']
})
export class CompanionStartupComponent implements OnInit {
  questionAndAnswers = [
    {
      question: 'Issues you’re comfortable providing support',
      answers: ["Managing Emotions","Men’s Issues","Obsessive compulsive disorder","Panic Attacks","Parenting"],
      description: 'Optional: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      question: 'Issues you don’t want to discuss',
      answers: ["ADHD","Alcohol","Anxiety","Bipolar","Breakups","BPD"],
      description: "Optional: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      question: 'Issues you have direct lived experience',
      answers: ["ADHD","Alcohol","Anxiety","Bipolar","Breakups","BPD"],
      description: "Optional: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      question: 'Language(s)',
      answers: ["English","Akan","Amharic","Albanion","Hindi","Marathi"]
    }
  ];

  flags:any = {
    0:true,
    1:true,
    2:true,
    3:true,
  }
  active:any = 0;
  btnInput:String = "Submit";
  answers:any = []
  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth <= 800){
      this.flags = {
        0:true,
        1:false,
        2:false,
        3:false
      };
      this.btnInput = "Next"
    }
  }

  handleNextClick = () => {
    if(window.innerWidth <= 800){
      this.mobileQuestionNavgation();
    }else{
      this.questionSubmit();
    }
  }

  mobileQuestionNavgation = () => {
    for(let i=0;i<4;i++){
      if(this.flags[i]){
        if(i===2){
          this.btnInput = "Submit"
        }
        if(i!==3){
          this.flags[i] = false;
          this.flags[i+1] = true
          break;
        }
      }
    }
  }

  questionSubmit = () =>{
    console.log(this.answers);
  }

  getAnswer = (answer:any) => {
    this.answers[answer.questionId] = answer;
  }

}
