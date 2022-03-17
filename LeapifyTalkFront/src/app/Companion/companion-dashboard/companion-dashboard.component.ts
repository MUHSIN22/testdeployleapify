import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companion-dashboard',
  templateUrl: './companion-dashboard.component.html',
  styleUrls: ['./companion-dashboard.component.css']
})
export class CompanionDashboardComponent implements OnInit {
  public navLinks:any = {
    dashboard: "/therapist/dashboard",
    learning: '/courses', 
    edit: '/therapist/edit-profile',
    group:'/therapist/group/id'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
