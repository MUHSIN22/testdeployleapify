import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../models/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() text!: string;

  constructor() { }

  ngOnInit(): void {
   
  }

}
