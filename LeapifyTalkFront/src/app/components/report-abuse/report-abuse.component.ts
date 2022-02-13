import { Component, Inject, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-report-abuse',
  templateUrl: './report-abuse.component.html',
  styleUrls: ['./report-abuse.component.css']
})
export class ReportAbuseComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: { chatId: string },
    private dialog: MatDialogRef<ReportAbuseComponent>
  ) { }
  text: string = ""
  ngOnInit(): void {
  }

  submit(){
    if(this.text.length !== 0){
      this.chatService.reportSpam( this.data.chatId, this.text ).then(
        (res)=>{
          this.dialog.close();
        }
      );
    }
  }

}
