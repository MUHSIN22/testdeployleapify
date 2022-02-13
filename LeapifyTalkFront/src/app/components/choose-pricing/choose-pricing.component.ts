import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-choose-pricing',
  templateUrl: './choose-pricing.component.html',
  styleUrls: ['./choose-pricing.component.css']
})
export class ChoosePricingComponent implements OnInit {

  isSmall: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.resize();
    if (window.innerWidth > 992)
      document.documentElement.scrollTop = 115;
    else {
      document.documentElement.scrollTop = 80;
    }
  }

  resize() {
    $('.carousel').carousel(0);
    if (window.innerWidth > 1270)
      this.isSmall = false;
    else
      this.isSmall = true;
  }

}
