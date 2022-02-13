import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-counselor-job',
  templateUrl: './counselor-job.component.html',
  styleUrls: ['./counselor-job.component.css']
})
export class CounselorJobComponent implements OnInit {

  @ViewChild('form') form: any;

  counselor: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    liscence: string
  } = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      liscence: ""
    }
  accept: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  submit({ valid, value }: NgForm) {
    if (valid) {
      this.form.reset();
    }
  }

}
