import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-inspired',
  templateUrl: './inspired.component.html',
  styleUrls: ['./inspired.component.css']
})
export class InspiredComponent implements OnInit {
  public results = {
    courses: [],
    instructors: [],
    categories: [],
    message: false,
  };
  constructor(private courseSevices:CoursesService ) { }

  ngOnInit(): void {
  }

  searchInput = (input:any) => {
    this.courseSevices.searchAll(input).subscribe((res:any) => {
      this.results.courses = [],
      this.results.instructors = [],
      this.results.categories = []
      if(res.msg){
        this.results.message = res.msg
      }else{
        this.results.message = false
        this.saveResultToVariable(this.results.courses,res.response.getCourses);
        this.saveResultToVariable(this.results.instructors,res.response.getInstructors)
        this.saveResultToVariable(this.results.categories,res.response.getCategory)
      }
      
    })

    
  }

  saveResultToVariable = (saveTo:any,res:any) => {
    for(let i=0;i<3;i++){
      if(res[i]){
        saveTo[i] = res[i]
      }
    }
  }

}
