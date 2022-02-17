import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-blog',
  templateUrl: './patient-blog.component.html',
  styleUrls: ['./patient-blog.component.css']
})
export class PatientBlogComponent implements OnInit {

  blogs:boolean = true;
  courses!:boolean;

  constructor() { }

  ngOnInit(): void {
  }
Blog()
{
  this.blogs = true;
  this.courses = false;
}
Course()
{
  this.blogs = false;
  this.courses = true;
}
}
