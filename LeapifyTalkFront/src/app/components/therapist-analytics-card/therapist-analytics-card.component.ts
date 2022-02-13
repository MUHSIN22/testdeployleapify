import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-therapist-analytics-card',
  templateUrl: './therapist-analytics-card.component.html',
  styleUrls: ['./therapist-analytics-card.component.css']
})
export class TherapistAnalyticsCardComponent implements OnInit {
  @Input() isRevenue:boolean = false;
  @Input() cardData:any;
  constructor() { }

  ngOnInit(): void {
  }

}
