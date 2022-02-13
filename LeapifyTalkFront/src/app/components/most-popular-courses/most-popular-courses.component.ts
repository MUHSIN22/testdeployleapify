import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-most-popular-courses',
  templateUrl: './most-popular-courses.component.html',
  styleUrls: ['./most-popular-courses.component.css']
})
export class MostPopularCoursesComponent implements OnInit {
  public sliderMargin: string = "0";
  public sliderWidth: any = '';
  public cardDetails: any = ["","","","","",""]
  public isMobile: boolean = false;
  @Input() courses: any ;
  public splittedCourses:any = [];

  constructor() { }

  ngOnInit(): void {
    
    this.sliderWidth = document.querySelector('.slider-section')?.clientWidth
    window.innerWidth > 1000 ? this.isMobile = false : this.isMobile = true;
    if(this.isMobile){
      this.splittedCourses.push(this.courses.splice(0,3),this.courses)
    }
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    margin: 20,
    navText: [`<i class="fas fa-arrow-left"></i>`,`<i class="fas fa-arrow-right"></i>`],
    responsive: {
      0:{
        items: 1
      },
      1000: {
        items: 3 
      },
      
    },
    nav: true
  }

}
