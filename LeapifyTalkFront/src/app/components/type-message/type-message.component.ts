import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordService } from 'src/app/services/audio-record.service';

@Component({
  selector: 'app-type-message',
  templateUrl: './type-message.component.html',
  styleUrls: ['./type-message.component.css']
})
export class TypeMessageComponent implements OnInit {

  @Input() messageInput?: any;

  @Output() sendTextMessage = new EventEmitter();
  @Output() sendAudioMessage = new EventEmitter();
  @Output() captureImage = new EventEmitter();
  @Output() uploadImage = new EventEmitter();

  isAudioRecording = false;
  audioRecordedTime!: string;
  audioBlobUrl: any;
  audioBlob!: Blob;

  message: string = "";
  showEmojiPicker: boolean = false;

  constructor(
    private audioRecord: AudioRecordService,
    private sanitizer: DomSanitizer,
    private ref: ChangeDetectorRef,
  ) {
    this.audioRecord.recordingFailed().subscribe(() => {
      this.isAudioRecording = false;
      this.ref.detectChanges();
    })

    this.audioRecord.getRecordedTime().subscribe(
      (time) => {
        this.audioRecordedTime = time;
        this.ref.detectChanges();
      }
    )

    this.audioRecord.getRecordedBlob().subscribe(
      (data) => {
        this.audioBlob = data;
        this.audioBlobUrl =
          this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
        this.ref.detectChanges();
      }
    )
  }

  ngOnInit(): void {
  }

  send() {
    this.showEmojiPicker = false;
    this.sendTextMessage.emit({
      sender: 'You',
      type: "text",
      message: this.message,
      time: "Now"
    }
    );
    this.message = "";
  }

  addEmoji(event: any) {
    if (this.messageInput)
      this.messageInput.message += event.emoji.native;
    this.message += event.emoji.native;
  }

  startAudioRecording() {
    if (!this.isAudioRecording) {
      this.isAudioRecording = true;
      this.audioRecord.startRecording();
    }
  }

  abortAudioRecording() {
    if (this.isAudioRecording) {
      this.isAudioRecording = false;
      this.audioRecord.abortRecording();
      this.audioBlobUrl = null;
    }
  }

  stopAudioRecording() {
    if (this.isAudioRecording) {
      this.audioRecord.stopRecording();
      this.isAudioRecording = false;
      this.sendAudio();
    }
  }

  sendAudio() {
    if (this.audioBlobUrl) {
      let audio = new File( [this.audioBlob], "audio.mp3", {
        type: "audio/mp3"
      } )
      this.sendAudioMessage.emit(audio);
      this.audioBlobUrl = null;
    }
    else {
      setTimeout(() => {
        this.sendAudio();
      }, 500);
    }
  }

}