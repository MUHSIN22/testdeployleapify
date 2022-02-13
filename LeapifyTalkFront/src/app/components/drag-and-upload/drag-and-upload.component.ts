import { Component, ElementRef,  Input, OnInit, Output, ViewChild, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-drag-and-upload',
  templateUrl: './drag-and-upload.component.html',
  styleUrls: ['./drag-and-upload.component.css']
})

export class DragAndUploadComponent implements OnInit {
  @Input() itemsVisibilty:boolean = true;
  @Output() files:any = new EventEmitter()
  @Input() filesData: any;
  @Input() isNotFile:boolean = false;
  @Output() fileRemove:any = new EventEmitter()
  @ViewChild('dragUpload') dragElement?:ElementRef;
  public images:any = [];
  public videos:any = [];
  public document:any = [];
  public pdf:any = [];
  public dragArea:any;
  public isDragOver: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    this.dragArea = this.dragElement;

    //For trigger the drag file over the div
    this.dragArea.nativeElement.addEventListener('dragover',(event:any) =>{
      event.preventDefault();
      this.isDragOver = true
    })

    // For trigger the drag file out the div
    this.dragArea.nativeElement.addEventListener('dragleave',() => {
      this.isDragOver = false
    })

    // For trigger the drop file in the div

    this.dragArea.nativeElement.addEventListener('drop',(event:any) => {
      event.preventDefault();
      this.files.emit(event.dataTransfer.files)
      this.isDragOver = false

      this.images = this.filesData.files.image ? this.filesData.files.image : []
      this.videos = this.filesData.files.video ? this.filesData.files.video : []
      this.document = this.filesData.files.document ? this.filesData.files.document : []
      this.pdf = this.filesData.files.pdf ? this.filesData.files.pdf : []
    })
  }  

  handleFile = (event:any) => {
    this.files.emit(event.target.files)
    this.images = this.filesData.files.image
    this.videos = this.filesData.files.video
    
    
  }

  // Emit the file to remove it from the file array
  removeFile = (data:any) => {
    this.filesData.image && this.filesData.files.image.forEach((file:any,index:number) => {
      if(file === data.file){
        this.fileRemove.emit({file,index,type:"image"})
      }
    })

    this.filesData.files.video && this.filesData.files.video.forEach((file:any,index:number) => {
      if(file === data.file){
        this.fileRemove.emit({file,index,type:"video"})
      }
    })
    
    this.filesData.files.document && this.filesData.files.document.forEach((file:any,index:number) => {
      if(file === data.file){
        this.fileRemove.emit({file,index,type:"document"})
      }
    })
    
    this.filesData.files.pdf && this.filesData.files.pdf.forEach((file:any,index:number) => {
      if(file === data.file){
        this.fileRemove.emit({file,index,type:"pdf"})
      }
    })
  }
}
