import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {

  @ViewChild('serviceNav') serviceNav!: ElementRef;

  template: boolean[] = [false, false, true, false, false]

  constructor() { }

  ngOnInit(): void {
    this.scrollRight()
  }

  switch(no: number) {
    this.template = [false, false, false, false, false]
    this.template[no] = true;
  }

  scrollRight() {
    if (window.innerWidth < 768)
      setTimeout(() => {
        this.serviceNav.nativeElement.scrollLeft = this.serviceNav.nativeElement.scrollWidth / 3.2;
      }, 100);
  }
}
