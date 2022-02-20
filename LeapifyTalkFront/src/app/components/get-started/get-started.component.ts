import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Questions } from 'src/app/models/Questions';
import { ToastComponent } from '../toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/services/http.service';

declare var $: any;

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  // questions = Questions;
  mappingdata: any = [];
  QuestionsMapping:any;
  loggedInUser : any;
  progress: number = 0;
  started: boolean = false;
  questionNo: number = 0;
  currentQuestion: any;
  selections: any = [];
  currentSelection: any = [];
  radioChoice = "";

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    if(window.innerWidth<1400)
    setTimeout(()=>{
      document.documentElement.scrollTop = 130;
    },100)

    this.httpService.Mapping().subscribe(
      (spec : any) => {
        this.mappingdata = spec;
        this.QuestionsMapping = this.mappingdata[0].question;
        // console.log(this.QuestionsMapping,'MappingData');
      })

    this.httpService.userSubject.subscribe(
      (user)=>{
        this.loggedInUser = user;
        // console.log(this.loggedInUser.email);
      })
  }

  startNow() {
    this.started = true;
    // this.currentQuestion = Questions[0];
    this.currentQuestion = this.QuestionsMapping[0];
  }

  //Fired when: 
  // an option is selected for radio Questions
  // next question button is selectedcfor checkbox Questions
  nextQuestion() {
    //If the question type is radio, selection is pushed to selections array
    if (this.currentQuestion.type == "radio")
      this.selections[this.questionNo] = {
        ques: this.currentQuestion.ques,
        type: "radio",
        selection: this.radioChoice
      };
    else {
      // If question type is checkbox check if atleast one option is selected else push to selections arrat
      if (this.currentSelection.length == 0) {
        this.showErrorToast();
      }
      else
        this.selections[this.questionNo] = {
          ques: this.currentQuestion.ques,
          type: "checkbox",
          selection: this.currentSelection
        };
    }
    //Setting next question to view
    if (this.currentSelection.length != 0 || this.radioChoice) {
      this.progress = Math.round(((this.questionNo + 1) / this.QuestionsMapping.length) * 100);
      this.animationfunc();
      setTimeout(() => {
        this.currentSelection = [];
        this.radioChoice = "";
        this.questionNo += 1;
        this.currentQuestion = this.QuestionsMapping[this.questionNo];
        let ele = this.selections[this.questionNo];
        if (ele) {
          if (ele.type == "checkbox")
            this.currentSelection = ele.selection;
          else
            this.radioChoice = ele.selection;
        }
      }, 500)
    }
  }

  //Fired When left arrow button is clicked
  prevQuestion() {
    this.reverseanimationfunc();
    setTimeout(() => {
      this.questionNo -= 1;
      this.currentQuestion = this.QuestionsMapping[this.questionNo];
      let ele = this.selections[this.questionNo];
      if (ele.type == "checkbox")
        this.currentSelection = ele.selection;
      else
        this.radioChoice = ele.selection;
    }, 500)
  }

  //Fired when an option is selected/Deselected
  selectOption(choice: any) {
    //For checkbox, selected options are pushed/removed to currentOptions array
    if (this.currentQuestion.type == 'checkbox') {
      if (choice.target.checked)
        this.currentSelection.push(choice.target.value);
      else {
        let i = this.currentSelection.indexOf(choice.target.value)
        this.currentSelection.splice(i, 1);
      }
    }
    else {
      this.radioChoice = choice;
      this.nextQuestion();
    }
  }

  isChecked(choice: any) {
    if (this.selections[this.questionNo]) {
      return this.selections[this.questionNo].selection.indexOf(choice) >= 0;
    }
    else
      return false;
  }

  //Fired when signup button is clicked
  submit() {
    this.nextQuestion();
    if (this.selections.length == this.QuestionsMapping.length) {
      // this.router.navigate(['/choose-pricing'])
      // console.log(this.selections,'Result');
      var Result = {
        email : this.loggedInUser.email,
        result : this.selections
      }
      // console.log(Result,'Result Json');
      this.httpService.Assessment(Result).subscribe(
        (res : any)=>{
          alert(res.msg); 
          this.router.navigate(['/patient-profile']);
        })
    }
  }

  animationfunc() {
    $("#ques_ans").removeClass("enter-animation").addClass("leave-animation").removeClass("enter-animation_reverse");
    setTimeout(() => {
      $("#ques_ans").removeClass("leave-animation").addClass("enter-animation");
    }, 500);
  }

  reverseanimationfunc() {
    if (this.questionNo < 0) {
      return;
    }
    $("#ques_ans").removeClass("enter-animation_reverse").addClass("leave-animation_reverse");
    setTimeout(() => {
      $("#ques_ans").removeClass("leave-animation_reverse").addClass("enter-animation_reverse");
    }, 500);
  }

  showErrorToast() {
    this._snackBar.openFromComponent(ToastComponent, {data: { type: "warning", message: "Please select atleast one option." }})
    
  }

}
