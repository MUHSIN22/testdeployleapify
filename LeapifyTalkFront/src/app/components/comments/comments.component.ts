import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @ViewChild('commentDiv') commentDiv!: ElementRef;

  history = history;
  message!: Message;
  messageId!: string;
  comments: any[] = [];
  loaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (route) => {
        this.messageId = route.id;
        this.chatService.getSingleChat(this.messageId).then(
          (res) => {
            this.message = res.data.chat;
            this.comments = res.data.chat.comments;
            this.loaded = true;
            this.scrollDown();
          }
        )
      }
    )
    this.chatService.newComment.subscribe(
      (comment: any) => {
        if (this.loaded) {
          if (comment.chatId == this.message._id) {
            this.comments.push(comment);
            this.scrollDown();
          }
        }
      }
    )

  }

  addComment(comment: string) {
    this.chatService.addComment(this.messageId, comment, this.message.roomId);
    this.scrollDown();
  }

  scrollDown() {
    setTimeout(() => {
      if (this.commentDiv) {
        this.commentDiv.nativeElement.scrollTop = this.commentDiv.nativeElement.scrollHeight;
      }
    },
      200)
  }

}
