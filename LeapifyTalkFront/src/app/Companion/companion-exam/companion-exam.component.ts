import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ToastComponent } from 'src/app/components/toast/toast.component';
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
    this.prepareForNewQuestion();
    if (this.currentIndex < this.totalQuestions-1) {
      this.currentIndex++;
      this.setParams();
      this.setTimer();
    }else{
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
      })
      // this.router.navigate(['/companion/home'],{
      //   queryParams:{
      //     sts:'success'
      //   }
      // })
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

  // startTimer = (limit: number) => {
  //   this.timer = limit;
  //   this.timeOutFlag = false;
  //   const interval = setInterval(() => {
  //     if (this.timer <= 0) {
  //       this.timeOutFlag = true;
  //       this.companionService.checkAnswer(this.questions[this.currentIndex]._id, null).subscribe(res => {
  //         if (this.currentIndex < (this.questions.length - 2)) {
  //           this.currentIndex++;
  //           this.question = this.questions[this.currentIndex]
  //           clearInterval(interval)
  //           this.startTimer(30)
  //           this.setProgress();
  //           console.log(this.currentIndex);
  //           this.setParams()
  //         } else {
  //           clearInterval(interval)
  //           this.isLastQuestion = true;
  //           this.setProgress(100);
  //         }
  //       })
  //     } else {
  //       this.timer--;
  //     }
  //   }, 1000)

  // }


  // handleAnswerSelection = (event: any) => {
  //   if (event.target.className === "option") {
  //     if (this.noOfAttempt < 2) {
  //       this.optionSelected = event.target.id;
  //       this.companionService.checkAnswer(this.questions[this.currentIndex]._id, this.optionSelected).subscribe(res => {
  //         this.optionSelected = null
  //         if (res.status === "ok") {
  //           if (res.msg === "correct answer") {
  //             event.target.style.backgroundColor = " #00B879";
  //             event.target.querySelector(".option-true").hidden = false;
  //             event.target.classList.add('selected')
  //           } else {
  //             event.target.style.backgroundColor = " #FF6273";
  //             event.target.querySelector(".option-false") ? event.target.querySelector(".option-false").hidden = false : null;
  //             event.target.classList.add('selected')
  //           }
  //         }
  //       })
  //       this.noOfAttempt++;
  //     } else {
  //       this.currentIndex++;
  //       this.noOfAttempt = 0;
  //       this.setParams();
  //       this.setProgress();
  //       this.startTimer(30);
  //       this.radioRef?.forEach(radio => {
  //         radio.nativeElement.checked = false
  //       })
  //       this.optionRef?.forEach(option => {
  //         option.nativeElement.querySelector('.option-true') ? option.nativeElement.querySelector('.option-true').hidden = true : null;
  //         option.nativeElement.querySelector('.option-false') ? option.nativeElement.querySelector('.option-false').hidden = true : null;
  //         option.nativeElement.style.backgroundColor = "var(--bg-primary)"
  //         console.log(option.nativeElement);
  //       })
  //     }
  //   }
  //   console.log(this.noOfAttempt);

  // }

}
