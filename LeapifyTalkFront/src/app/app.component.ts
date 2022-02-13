import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './Animations';
import { HttpService } from './services/http.service';

declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent {
  title = 'LeapifyTalk';
  isLoggedIn: boolean = false;

  constructor(
    private httpService: HttpService,
  ) {
   }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated? outlet.activatedRoute: '';
  }

  ngOnInit(): void {
    this.httpService.isloggedIn.asObservable().subscribe(
      (data)=>{
        this.isLoggedIn = data;
        if(this.isLoggedIn == true)
        {
          $("#mid").ready(function(){
            $(".mid").addClass("midsize");
          });
        }
        if(this.isLoggedIn == false)
        {
          $("#mid").ready(function(){
            $(".mid").removeClass("midsize");
          });
        }
      }
    )
  }

}
