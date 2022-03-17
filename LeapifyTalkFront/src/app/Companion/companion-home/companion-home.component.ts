import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companion-home',
  templateUrl: './companion-home.component.html',
  styleUrls: ['./companion-home.component.css']
})
export class CompanionHomeComponent implements OnInit {
  course:any  = {
    courses:{
      photo: 'https://www.geeksforgeeks.org/web-thumbnail/',
      course_title: 'Therapy course for test',
      instructorDetails:[{name:"Muhsin"}],
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}
