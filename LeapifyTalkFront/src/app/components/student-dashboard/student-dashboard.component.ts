import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  public expandNav: boolean = false;
  public navLinks:any = {
    dashboard: '/student/course',
    learning: '/courses', 
    edit: '/student/edit-profile',
    group: '/student/group/id'
  }
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.groupSubject.subscribe((res:any) => {
      
    })
  }

}
