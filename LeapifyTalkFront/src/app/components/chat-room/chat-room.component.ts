import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { Message } from 'src/app/models/Message';
import { ChatService } from 'src/app/services/chat.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  roomId: string = ""
  captureImage: boolean = false;
  newMessage: any;
  groupsLoaded: boolean = false;
  chatsLoaded: boolean = false;

  @ViewChild('chat') chat!: ElementRef;

  message: string = "";
  images: any = [];
  messages: Message[] = [];
  group: Group = {
    _id: "",
    name: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private httpService: HttpService,
    private _snackBar: MatSnackBar,
  ) {

    this.activatedRoute.params.subscribe(
      (route) => {
        this.roomId = route.id;
        this.initialize();
      }
    )
  }
  ngOnInit(): void {
  }

  initialize() {

    this.subscribeMessages()

    this.chatService.getAllgroups(this.httpService.loggedInUser.id).then(
      (res) => {
        console.log(res);
        
        let groups: Group[] = res.data.rooms;
        groups.forEach(
          (group) => {
            if (group._id == this.roomId) {
              this.group = group;
              this.groupsLoaded = true;
            }
          }
        )
      }
    )
  }

  subscribeMessages() {
    if (this.chatService.allMessagesLoaded) {
      this.chatService.allMessagesSubject.subscribe(
        (groups) => {
          groups.forEach(
            (group) => {
              if (group._id == this.roomId) {
                this.messages = group.messages;
                this.chatsLoaded = true;
                this.scrollDown();
              }
            }
          )
        }
      )
    }
    else {
      setTimeout(() => {
        this.subscribeMessages();
      }, 100);
    }
  }

  handleImage(e: any) {
    this.images.push(e);
    this.captureImage = false;
  }

  captureError(e: any) {
    this.openSnackBar(e.message, 'error');
    this.captureImage = false;
  }

  sendMessage(e: any) {
    if (e.message) {
      this.chatService.sendMessaage(
        e.message,
        this.roomId,
        "text",
        this.httpService.loggedInUser.username
      )
      this.scrollDown();
    }
  }

  scrollDown() {
    setTimeout(() => {
      if (this.chat)
        this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
    }, 500)
  }

  uploadImage(e: any) {
    if (e.target.files[0].size > 26214400) {
      this.openSnackBar("Maximum file size is 25MB", 'error');
    }
    else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        if (event.target) {
          {
            this.images.push({
              type: e.target.files[0].type.split('/')[0],
              file: e.target.files[0],
              message: "",
              base64: event.target.result as string
            });
          }
        }
      };
    }
  }

  sendImage(e: any) {
    e.forEach((element: any) => {
      this.chatService.sendImage(
        element.message,
        this.roomId,
        element.type,
        this.httpService.loggedInUser.username,
        element.file
      )
    });
    this.images = [];
  }

  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(ToastComponent, { data: { type: type, message: message } })
  }

  uploadError(e: any) {
    this.openSnackBar(e, 'error');
  }

  sendAudio(e: File) {
    this.chatService.sendAudio(this.roomId, e);
  }

  
}
