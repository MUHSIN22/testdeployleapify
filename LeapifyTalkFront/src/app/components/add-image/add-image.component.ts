import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  currentImage: any = "";
  imageInput: any = null;
  @Output() cancelUpload = new EventEmitter()
  @Output() sendImage = new EventEmitter()
  @Input() images: any = [];
  @Output() error = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.currentImage = this.images[0];
  }

  uploadImage(e: any) {
    Array.prototype.forEach.call(e.target.files,
      (file: File) => {
        if (file.size > 26214400) {
          this.error.emit("Maximum file size is 25MB");
        }
        else {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            if (event.target)
              {
                this.images.push({
                  type: file.type.split('/')[0],
                  file: file,
                  message: "",
                  base64: event.target.result as string
                });
              }
          }
         
        }
      });
    this.imageInput = null;
  }

  sendMessage(e: any) {
    this.sendImage.emit(this.images);
  }

  cancel() {
    this.cancelUpload.emit();
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }
}
