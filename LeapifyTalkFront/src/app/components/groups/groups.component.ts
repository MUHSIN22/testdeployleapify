import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { Message } from 'src/app/models/Message';
import { ChatService } from 'src/app/services/chat.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastComponent } from '../toast/toast.component';
import { Notification } from 'src/app/models/Notification';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  notifications: string[] = [];
  chat: boolean = true;
  groups: Group[] = [];
  loggedInUser: any;
  lastMessages: {
    _id: string,
    message: Message
  }[] = [];
  lastLoaded: boolean  = false;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.httpService.userSubject.asObservable().subscribe(
      (user) => {
        this.loggedInUser = user;
      }
    )
    this.subscribeGroups();
    this.subscribeLastmessages();

    this.chatService.notificationSubject.subscribe(
      (e)=>{
        this.notifications = e;
      }
    )
  }

  subscribeGroups() {
    if (this.chatService.groupsLoaded) {
      this.chatService.groupSubject.subscribe(
        (groups) => {
          this.groups = groups;
          if (window.innerWidth > 768)
            this.router.navigate(['/groups/' + this.groups[0]._id])
        }
      )
      this.chatService.lastMessagesSubject.asObservable().subscribe(
        (data) => {
          this.lastMessages = data;
        }
      )
    }
    else {
      setTimeout(() => {
        this.subscribeGroups();
      }, 500)
    }
  }

  subscribeLastmessages() {
    if (this.chatService.lastMesssagesLoaded) {
            this.chatService.lastMessagesSubject.subscribe(
        (data) => {
          this.lastMessages = data;
          this.lastLoaded = true;
        }
      )
    }
    else {
      setTimeout(() => {
        this.subscribeLastmessages();
      }, 500)
    }
  }

  hasRoute(url: string) {
    if (this.router.url.startsWith(url))
      return true;
    else
      return false;
  }

  logout() {
    this.httpService.logout().then(
      (res) => {
        this.openSnackBar(res.data.msg, "success");
        this.router.navigate(['/signin'])
      }
    );
  }

  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(ToastComponent, { data: { type: type, message: message } })
  }

}
