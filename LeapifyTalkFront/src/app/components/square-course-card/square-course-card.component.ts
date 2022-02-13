import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square-course-card',
  templateUrl: './square-course-card.component.html',
  styleUrls: ['./square-course-card.component.css']
})
export class SquareCourseCardComponent implements OnInit {
  @Input() course: any;
  public ratingDetails: any = {
    rating: 0,
    number_of_students_rated: 0
  };
  constructor() { }

  ngOnInit(): void {
  }

}
