import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-startup-question',
  templateUrl: './startup-question.component.html',
  styleUrls: ['./startup-question.component.css']
})
export class StartupQuestionComponent implements OnInit {
  @Input() data:any;
  @Input() elemAt:any;
  @Output() answerEmitter = new EventEmitter();
  
  answer:any = {
    answers: []
  };
  constructor() { }

  ngOnInit(): void {
    this.answer.questionId = this.elemAt;
  }
  handleCheckbox = (event:any) => {
    this.answer.answers.push(event.target.value)
    this.answerEmitter.emit(this.answer)
  }

}
