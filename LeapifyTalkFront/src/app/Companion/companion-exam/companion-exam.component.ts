import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { CompanionService } from 'src/app/services/companion.service';
@Component({
  selector: 'app-companion-exam',
  templateUrl: './companion-exam.component.html',
  styleUrls: ['./companion-exam.component.css']
})
export class CompanionExamComponent implements OnInit {
  @ViewChildren("radio") radioRef?: QueryList<any>;
  @ViewChildren('option') optionRef?: QueryList<any>;

  faCheck = faCheck;
  faXmark = faXmark;
  questions: any = [];
  question: any;
  optionSelected: any;
  noOfAttempt: number = 0;
  currentIndex: number = 0;
  timeOutFlag: boolean = false;
  timer: number = 30;
  isLastQuestion: boolean = false;
  progress: number = 0;
  constructor(
    private companionService: CompanionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setParams();
    this.getExam();
    this.setProgress();

  }

  getExam(): void {
    this.companionService.getExam().subscribe((res: any) => {
      this.questions = res.sendQuiz.questions
      this.question = this.questions[this.currentIndex];
    })
    this.startTimer(30);
  }

  setProgress = (progress?: any) => {
    this.progress = progress ? progress : (this.currentIndex / (this.questions.length - 1)) * 100
  }

  setParams = () => {
    this.router.navigate([], {
      queryParams: {
        question: this.currentIndex
      }
    })
  }

  startTimer = (limit: number) => {
    this.timer = limit;
    this.timeOutFlag = false;
    const interval = setInterval(() => {
      if (this.timer <= 0) {
        this.timeOutFlag = true;
        this.companionService.checkAnswer(this.questions[this.currentIndex]._id, null).subscribe(res => {
          if (this.currentIndex < (this.questions.length - 2)) {
            this.currentIndex++;
            this.question = this.questions[this.currentIndex]
            clearInterval(interval)
            this.startTimer(30)
            this.setProgress();
            console.log(this.currentIndex);
            this.setParams()
          } else {
            clearInterval(interval)
            this.isLastQuestion = true;
            this.setProgress(100);
          }
        })
      } else {
        this.timer--;
      }
    }, 1000)

  }


  handleAnswerSelection = (event: any) => {
    if (event.target.className === "option") {
      if (this.noOfAttempt < 2) {
        this.optionSelected = event.target.id;
        this.companionService.checkAnswer(this.questions[this.currentIndex]._id, this.optionSelected).subscribe(res => {
          this.optionSelected = null
          if (res.status === "ok") {
            if (res.msg === "correct answer") {
              event.target.style.backgroundColor = " #00B879";
              event.target.querySelector(".option-true").hidden = false;
              event.target.classList.add('selected')
            } else {
              event.target.style.backgroundColor = " #FF6273";
              event.target.querySelector(".option-false") ? event.target.querySelector(".option-false").hidden = false : null;
              event.target.classList.add('selected')
            }
          }
        })
        this.noOfAttempt++;
      } else {
        this.currentIndex++;
        this.noOfAttempt = 0;
        this.setParams();
        this.setProgress();
        this.startTimer(30);
        this.radioRef?.forEach(radio => {
          radio.nativeElement.checked = false
        })
        this.optionRef?.forEach(option => {
          option.nativeElement.querySelector('.option-true') ? option.nativeElement.querySelector('.option-true').hidden = true : null;
          option.nativeElement.querySelector('.option-false') ? option.nativeElement.querySelector('.option-false').hidden = true : null;
          option.nativeElement.style.backgroundColor = "var(--bg-primary)"
          console.log(option.nativeElement);
        })
      }
    }
    console.log(this.noOfAttempt);
    
  }

}
