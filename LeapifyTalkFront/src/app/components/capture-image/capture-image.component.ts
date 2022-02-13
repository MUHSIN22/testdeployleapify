import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-capture-image',
  templateUrl: './capture-image.component.html',
  styleUrls: ['./capture-image.component.css']
})
export class CaptureImageComponent implements OnInit {

  constructor() { }

  webcamImage: WebcamImage | null = null;
  trigger: Subject<void> = new Subject<void>()
  @Output() handleCapturedImage = new EventEmitter();
  @Output() error = new EventEmitter();
  @Output() cancel = new EventEmitter();
  height: number = 380;

  ngOnInit(): void {
    this.resize();
  }

  public handleImage(webcamImage: any): void {
    this.dataUrlToFile(webcamImage._imageAsDataUrl,"Capture.png").then(
      (file) =>{
        this.handleCapturedImage.emit(
          {
            sender: 'You',
            type: "image",
            base64: webcamImage._imageAsDataUrl,
            file: file,
            message: "",
          });
      }
    )
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  resize(){
    if(window.innerWidth > 992)
      this.height = 380;
    else if(window.innerWidth >576 )
    this.height = 320
    else if(window.innerWidth >360 )
    this.height = 260
    else if(window.innerWidth <360 )
    this.height = 230
  }

  async dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
}
}
