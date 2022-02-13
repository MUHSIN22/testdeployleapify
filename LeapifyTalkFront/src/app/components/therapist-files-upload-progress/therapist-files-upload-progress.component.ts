import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-therapist-files-upload-progress',
  templateUrl: './therapist-files-upload-progress.component.html',
  styleUrls: ['./therapist-files-upload-progress.component.css']
})
export class TherapistFilesUploadProgressComponent implements OnInit {
  public isVisible: boolean = true;
  @Input() uploadData:any;
  @Output() removeFile:any = new EventEmitter();
  public icon:String = '';
  public fileName:String = '';
  constructor() { }

  ngOnInit(): void {


    this.fileName = this.uploadData.file.name || this.uploadData.type + " file"
    if(this.uploadData.type === "image"){
      this.icon = "/assets/icons/image-file.svg"
    }else if(this.uploadData.type === "video"){
      this.icon = "/assets/icons/video-file.png"
    }else if(this.uploadData.type === "document"){
      this.icon = "/assets/icons/document-file.png"
    }else if(this.uploadData.type === "pdf"){
      this.icon = "/assets/icons/pdf-file.png"
    }
  }
  closeProgress = () => {
    this.removeFile.emit(this.uploadData)
    // this.isVisible = false
    
  }
}
