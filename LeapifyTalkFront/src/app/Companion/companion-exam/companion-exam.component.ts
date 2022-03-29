import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faCheck,faXmark} from '@fortawesome/free-solid-svg-icons'
import { CompanionService } from 'src/app/services/companion.service';
@Component({
  selector: 'app-companion-exam',
  templateUrl: './companion-exam.component.html',
  styleUrls: ['./companion-exam.component.css']
})
export class CompanionExamComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;
  questions: any = [];
  optionSelected: any;

  currentIndex:number = 0;
  constructor(
    private companionService:CompanionService,
    private router:Router  
  ) { }

  ngOnInit(): void {
    
    this.companionService.getExam().subscribe((res:any) => {
      console.log(res);
      this.questions = res.sendQuiz.questions
      this.router.navigate([],{
        queryParams:{
          question:this.currentIndex
        }
      })
    })
  }


  handleAnswerSelection = (event:any) => {
    !this.optionSelected? this.optionSelected = event.target.id : null
    
    console.log(this.questions[this.currentIndex]);
    this.companionService.checkAnswer(this.questions[this.currentIndex].id,this.optionSelected).subscribe(res => {
      console.log(res);
      
    })
    
    if(event.target.id == this.questions[this.currentIndex].correct) {
      event.target.style.backgroundColor = " #00B879";
      event.target.querySelector(".option-true").hidden = false;
    }else{
      event.target.style.backgroundColor = " #FF6273";
      event.target.querySelector(".option-false") ? event.target.querySelector(".option-false").hidden = false:null;
    }
  }

}
