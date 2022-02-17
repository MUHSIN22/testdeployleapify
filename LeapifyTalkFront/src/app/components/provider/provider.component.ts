import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

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
