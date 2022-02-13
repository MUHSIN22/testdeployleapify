import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { ChatService } from 'src/app/services/chat.service';
import { ReportAbuseComponent } from '../report-abuse/report-abuse.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  @ViewChild('player') player !: ElementRef;

  @Input() message!: Message;

  playing: boolean = false;
  showReactionPallet: boolean = false;
  loggedInUser: any;
  time: string = "";
  isSusbsribed: boolean = false;
  subscription!: Subscription;

  constructor(
    private chatService: ChatService,
    private dialogRef: MatDialog
  ) {
    if (!this.isSusbsribed) {
      this.isSusbsribed = true;
      this.subscription = this.chatService.newReaction.subscribe(
        (data: any) => {
          if (this.message._id == data.message._id) {
            this.message.reactions.push(data.reaction)
          }
        }
      )
    }
  }
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.loggedInUser = this.chatService.loggedInUser;  }

  control() {
    if (this.playing) {
      this.player.nativeElement.pause();
      this.playing = false;
    }
    else {
      this.player.nativeElement.play();
      this.playing = true;
    }
  }

  react(reaction: any) {
    this.chatService.addRection(this.message, reaction);
    this.showReactionPallet = false;
  }

  limit(i: number) {
    if (this.message.type == 'image')
      return i < 7;
    else
      return i < 2;
  }

  like() {
    this.chatService.likeMessage(this.message._id as string).then(
      () => {
        this.message.likes.push(this.loggedInUser.id);
        this.chatService.socket.emit("like", this.message );
      }
    );
  }
  report() {
    this.dialogRef.open(ReportAbuseComponent, {
      data: {
        chatId: this.message._id
      }
    })
  }
}

