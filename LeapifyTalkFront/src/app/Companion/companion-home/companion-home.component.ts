import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanionService } from 'src/app/services/companion.service';

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
  popupInfo:string = "";

  constructor(
      private companionServices:CompanionService,
      private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.companionServices.getHomeData().subscribe((res:any)=>{
      console.log('home',res);
    })
    this.companionServices.getCompanionCourse().subscribe((res:any) => {
      console.log(res);
    })
    this.route.queryParams.subscribe((params:any) =>{
      params.sts ? this.popupInfo = params.sts : this.popupInfo = '';
    })
  }

}
