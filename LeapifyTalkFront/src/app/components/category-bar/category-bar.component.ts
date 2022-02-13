import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { SubCategoryObject } from 'src/interfaces';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css']
})
export class CategoryBarComponent implements OnInit {
  public data: SubCategoryObject = {
    visiblity: false,
    subCategories: []
  };
  public courseCategories: any = [];
  public courseCategoryObject: any;
  public activeCategory: number = 0;
  @Output() passCategories = new EventEmitter<SubCategoryObject>()

  constructor(public coursesService: CoursesService) { }

  ngOnInit(): void {
    this.courseCategoryObject = this.coursesService.getCourseCategories();
    this.courseCategoryObject.forEach((category:any)=>{
      this.courseCategories.push(Object.keys(category)[0])
    })
  }

  onMouseOver = (rank:number) => {
    this.data = {
      visiblity: true,
      subCategories: this.courseCategoryObject[rank-1][this.courseCategories[rank-1]],
      rank: rank
    }
    
  }
  onMouseOut = () => {
    this.data.visiblity = false
  }
  setActiveCategory = (rank: number):void => {
    this.activeCategory = rank
  }

}
