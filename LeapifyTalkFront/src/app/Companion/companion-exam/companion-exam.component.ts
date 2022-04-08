import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { CompanionService } from 'src/app/services/companion.service';
import { getAllJSDocTagsOfKind } from 'typescript';
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
  isToggle:boolean = true;
  questions: any = [];
  question: any;
  totalQuestions: number = 0;
  currentScore: number = 0;
  optionSelected: any;
  noOfAttempt: number = 0;
  currentIndex: number = 0;
  timeOutFlag: boolean = false;
  timer: number = 30;
  isLastQuestion: boolean = false;
  progress: number = 0;
  interval: any;
  isCorrect:boolean = false;
  quizID:any;
  constructor(
    private companionService: CompanionService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.companionService.getExam().subscribe((res: any) => {
      this.questions = res.sendQuiz.questions;
      this.quizID = res.sendQuiz._id
      this.totalQuestions = this.questions.length
      this.setParams();
      this.getParams();
      this.setTimer();
    })
  }

  handleAnswerSelection = async (event: any) => {
    if (event.target.className === "option") {
      if (this.noOfAttempt < 2) {
        if(!this.isCorrect){
          this.optionSelected = event.target.id;
          this.checkAnswer(event.target.id)
          .then((res: any) => {
            if (res.msg === "correct answer") {
              this.isCorrect = true;
              event.target.style.backgroundColor = " #00B879";
              event.target.querySelector(".option-true").hidden = false;
              event.target.classList.add('selected')
            } else {
              event.target.style.backgroundColor = " #FF6273";
              event.target.querySelector(".option-false") ? event.target.querySelector(".option-false").hidden = false : null;
              event.target.classList.add('selected')
            }
          })
          .catch(err => {
            this._snackBar.openFromComponent(ToastComponent, { data: { status: 'error', message: err.msg } })
          })
          this.noOfAttempt++;
        }else{
          this.radioRef?.map((radio:any) => {
              radio.nativeElement.disabled = true;
          })
        }
      }else{
        this._snackBar.openFromComponent(ToastComponent,{data:{type:'error',message: 'Your limit for this question exceeded got to next question'}})
      }
    }
    
    if(this.isCorrect){
      event.target.checked = false;
    }
  }

  getNextQuestion = () => {    
    if (this.currentIndex < this.totalQuestions-1) {
      this.prepareForNewQuestion();
      this.currentIndex++;
      this.setParams();
      this.setTimer();
    }else{
      this.setTimer();
      this.progress = 100;
      this.isLastQuestion = true;
    }
  }

  prepareForNewQuestion = () => {
    this.isToggle = false;
    this.isCorrect = false;
      setTimeout(() => {
        this.isToggle = true;
    }, 200)
    this.noOfAttempt = 0;
    this.radioRef?.map((radio:any) => {
      radio.nativeElement.disabled = false;
  })
  }

  handleNextQuestion = () => {
    if(this.noOfAttempt === 0 && !this.isLastQuestion){
      this._snackBar.openFromComponent(ToastComponent,{data:{type:"error",message:"Please attempt the question"}})
    }else if(this.isLastQuestion){
      this.companionService.finishQuiz(this.quizID)
      .subscribe((res:any) => {
        console.log(res);
        if(res.status === 'ok'){
          this._snackBar.openFromComponent(ToastComponent,{data:{type:'success',message:res.msg}})
          this.router.navigate(['/companion/home'],{
            queryParams:{
              sts:'success'
            }
          })
        }else{
          this._snackBar.openFromComponent(ToastComponent,{data:{type:'error',message:res.msg}})
          this.router.navigate(['/companion/home'],{
            queryParams:{
              sts:'failed'
            }
          })
        }
      })
      clearInterval(this.interval)
      
    }else{
      this.getNextQuestion()
    }
  }

  setParams = () => {
    this.router.navigate([], {
      queryParams: {
        question: this.currentIndex
      }
    })
  }

  getParams = () => {
    this.route.queryParamMap.subscribe((res: any) => {
      let index = res.params.question
      this.question = this.questions[index];
      this.progress = (index / this.totalQuestions) * 100
    })
  }

  checkAnswer = (answer: any) => {
    return new Promise((resolve, reject) => {
      this.companionService.checkAnswer(this.questions[this.currentIndex]._id, answer).subscribe((res: any) => {
        if (res.status === "ok") {
          resolve(res)
          console.log(res);
          this.currentScore = res.currentScore;
        } else {
          reject(res)
        }
      })
    })
  }

  setTimer = () => {
    this.timer = 30;
    clearInterval(this.interval);
    this.interval = setInterval(()=>{
      if(this.timer>0){
        this.timer--;
      }else{
        clearInterval(this.interval);
        this.checkAnswer(null)
        .then((res:any) => {
          this._snackBar.openFromComponent(ToastComponent,{data:{type:'warning',message:res.msg}})
          this.getNextQuestion();
        }).catch(err => {
          this._snackBar.openFromComponent(ToastComponent,{data:{type:'error',message:err.msg}})
        })
      }
    },1000)
  }
}
