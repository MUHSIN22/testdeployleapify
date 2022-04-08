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
    this.answer.id = this.data._id;
    this.answer.index = this.elemAt;
  }
  handleCheckbox = (event:any) => {
    if(this.answer.answers.indexOf(event.target.value) === -1){
      this.answer.answers.push(event.target.value)
    }else{
      let index = this.answer.answers.indexOf(event.target.value);
      this.answer.answers.splice(index,1);
    }
    this.answerEmitter.emit(this.answer)
  }

}
