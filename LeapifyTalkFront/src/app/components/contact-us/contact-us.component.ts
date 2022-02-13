import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  @ViewChild('form') form: any;

  contact: {
    name: string,
    email: string,
    type: number | null,
    message: string
  } = {
      name: "",
      email: "",
      type: null,
      message: ""
    }

  constructor() { }

  ngOnInit(): void {
  }

  submit({ valid, value }: NgForm) {
    if (valid) {
      this.form.reset();
    }
  }

}
