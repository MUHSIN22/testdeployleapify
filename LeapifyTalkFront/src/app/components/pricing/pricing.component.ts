import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  isSmall: boolean = false;



  constructor() { }

  ngOnInit(): void {
    this.resize();
  }

  resize() {
    $('.carousel').carousel(0);
    if (window.innerWidth > 992)
      this.isSmall = false;
    else
      this.isSmall = true;
  }

}
