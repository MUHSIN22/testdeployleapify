import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-otp-handling',
  templateUrl: './otp-handling.component.html',
  styleUrls: ['./otp-handling.component.css']
})
export class OtpHandlingComponent implements OnInit {
  public data:any  = {
    otp:''
  };
  public timeOut:number = 60;
  @Output() otpEmitter = new EventEmitter();
  @Output() resendEmitter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    setInterval(() => this.timeOut > 0 && this.timeOut--, 1000)
  }

  onSubmit = () => {
    this.otpEmitter.emit(this.data.otp)
  }

  resendOtp = () => {
    if(this.timeOut === 0){
      this.resendEmitter.emit()
      this.timeOut = 180
    }
  }

}
