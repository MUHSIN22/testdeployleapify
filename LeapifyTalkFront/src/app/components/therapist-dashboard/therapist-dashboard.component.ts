import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-therapist-dashboard',
  templateUrl: './therapist-dashboard.component.html',
  styleUrls: ['./therapist-dashboard.component.css']
})
export class TherapistDashboardComponent implements OnInit {
  public expandNav: boolean = false;
  public navLinks:any = {
    dashboard: "/therapist/dashboard",
    learning: '/courses', 
    edit: '/therapist/edit-profile',
    group:'/therapist/group/id'
  }
  constructor(private chatService:ChatService) { 
    
  }

  ngOnInit(): void {
    this.chatService.groupSubject.subscribe((res:any) => {
    })
  }

}
