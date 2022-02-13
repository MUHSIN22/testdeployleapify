import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Questions } from 'src/app/models/Questions';
import { ToastComponent } from '../toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var $: any;

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  questions = Questions;
  progress: number = 0;
  started: boolean = false;
  questionNo: number = 0;
  currentQuestion: any;
  selections: any = [];
  currentSelection: any = [];
  radioChoice = "";

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(window.innerWidth<1400)
    setTimeout(()=>{
      document.documentElement.scrollTop = 130;
    },100)
  }

  startNow() {
    this.started = true;
    this.currentQuestion = Questions[0];
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
      this.progress = Math.round(((this.questionNo + 1) / Questions.length) * 100);
      this.animationfunc();
      setTimeout(() => {
        this.currentSelection = [];
        this.radioChoice = "";
        this.questionNo += 1;
        this.currentQuestion = Questions[this.questionNo];
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
      this.currentQuestion = this.questions[this.questionNo];
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
    if (this.selections.length == Questions.length) {
      this.router.navigate(['/choose-pricing'])
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
