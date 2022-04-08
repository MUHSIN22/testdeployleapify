import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { CompanionService } from 'src/app/services/companion.service';

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
  answers:any = {
    data: []
  }

  constructor(
    private companionServices:CompanionService,
    private _snackBar:MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.companionServices.getPreferences().subscribe((res:any) => {
      console.log(res);
      this.answers.id = res.sendQuiz._id;
      this.questionAndAnswers = res.sendQuiz.questions
      console.log(this.questionAndAnswers);
      
    })
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
    if(this.answers.data.length === 4){
      this.companionServices.uploadPreferences(this.answers).subscribe((res:any) => {
        if(res.status === 'ok'){
          this.openToast('success',res.msg)
          this.router.navigateByUrl('/companion/home')
        }else{
          this.openToast('error',res.msg)
        }
      })
    }else{
      this.openToast('error',"Please answer all the questions!!");
    }
  }

  getAnswer = (answer:any) => {
    if(answer.answers.length === 0){
      this.answers.data.splice(answer.index,1)
    }else{
      this.answers.data[answer.index] = {
        id: answer.id,
        answers: answer.answers
      }
    }
  }

  openToast = (type:string,message:string) => {
    this._snackBar.openFromComponent(ToastComponent,{data:{type:type,message:message}})
  }
}
