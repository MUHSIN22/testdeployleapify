import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-therapist-lesson-upload',
  templateUrl: './therapist-lesson-upload.component.html',
  styleUrls: ['./therapist-lesson-upload.component.css']
})
export class TherapistLessonUploadComponent implements OnInit {
  public filesData:any = {};
  public isNotFile:boolean = false;
  private docFileTypes:String[] = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.ms-powerpoint","application/vnd.oasis.opendocument.spreadsheet","application/msword"]
  private pdfType:String = "application/pdf"
  private videoTypes: String[] = ["video/mp4", "video/mpeg", "video/mov"]
  public isFilesAreClear:boolean = false;
  public refinedFiles:any = {
    video: [],
    document: [],
    pdf: []
  };
  public videoDuration:any;
  public isLoading:boolean = false;
  public courseId:any;

  public data = {
    description: "", 
    lesson_name: '',
    lesson_section: '',
  }
  constructor(public _snackBar:MatSnackBar, public courseServices:CoursesService,public router:ActivatedRoute, public route:Router) { }

  ngOnInit(): void {
    this.courseId = this.router.snapshot.paramMap.get('id')
  }

  getFiles = (files:any) => {
    this.checkFiles(files);

    if(this.isFilesAreClear){
      this.filesData.files = this.refinedFiles
    }
  }

  checkFiles = (files:any) => {
    let filteredFiles = this.refinedFiles;
    if(files.length > 3 || 
      (files.length > 2 && filteredFiles['video'||'document'||'pdf'].length > 0) || 
      (files.length > 1 && ((filteredFiles.video.length > 0 && filteredFiles.document.length >0) || (filteredFiles.video.length>0 && filteredFiles.pdf.length > 0) || (filteredFiles.pdf.length> 0 && filteredFiles.document.length > 0)))) {
        this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message:"Maximum of 1 video, 1 document and 1 pdf are allowed"}})
        this.isFilesAreClear = false    
    }else{
      for(var i = 0; i < files.length; i++){
        if(this.videoTypes.includes(files[i].type)){
          if(this.refinedFiles.video.length > 0){
            this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message:"Can't upload more than 1 video"}})
          }else{
            this.refinedFiles.video.push(files[i])
            this.isFilesAreClear = true
            this.getFilesDurationAndPages()
          }
        }else if(this.docFileTypes.includes(files[i].type)){
          if(this.refinedFiles.document.length > 0){
            this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message:"Can't upload more than 1 document"}})
          }else{
            this.refinedFiles.document.push(files[i])
            this.isFilesAreClear = true
          }
        }else if(this.pdfType === files[i].type){
          if(this.refinedFiles.pdf.length > 0){
            this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message:"Can't upload more than 1 PDF"}})
          }else{
            this.refinedFiles.pdf.push(files[i])
            this.isFilesAreClear = true
          }
        }else{
          this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message:"Allowed files are video,document and PDF"}})
        }
      }
    }
  }

  fileRemove = (file:any) => {

    if(file.type === "pdf"){
      this.refinedFiles.pdf = []
      this.filesData.files = this.refinedFiles
    }else if(file.type === "video"){
      this.refinedFiles.video = []
      this.filesData.files = this.refinedFiles
    }else if(file.type === "document"){
      this.refinedFiles.document = []
    }
    
  }

  getFilesDurationAndPages = () => {
    var video = document.createElement("video");
    video.preload = "metadata"
    video.src = URL.createObjectURL(this.refinedFiles.video[0])
    video.onloadedmetadata = () => {
      var date = new Date(video.duration * 1000)
      this.videoDuration = date.toISOString().substr(14,5)
      console.log(this.videoDuration);
    }
    
  }
  onFormSubmit = () =>{
    if(this.refinedFiles.video.length < 1){
      this._snackBar.openFromComponent(ToastComponent,{data:{type:"error",message:"Please upload a video!"}})
    }else{
      this.isLoading = true;
      this._snackBar.openFromComponent(ToastComponent,{data:{type:"warning",message:"Please wait while section is being uploaded"}})
      let formData = new FormData();
      formData.append('lesson_section',this.data.lesson_section)
      formData.append('lesson_name',this.data.lesson_name)
      formData.append('video_duration',this.videoDuration)
      formData.append('description',this.data.description)
      formData.append('video',this.refinedFiles.video[0])
      formData.append('doc',this.refinedFiles.document[0] && this.refinedFiles.document[0])
      formData.append('pdf',this.refinedFiles.pdf[0] && this.refinedFiles.pdf[0])
      

      this.courseServices.addNewSection(this.courseId,formData).subscribe(res => {
        if(res.status === "ok"){
          this._snackBar.openFromComponent(ToastComponent,{data:{type:"success",message:"Section uploaded successfully"}})
          this.route.navigateByUrl('/therapist/courses')
        }else{
          this._snackBar.openFromComponent(ToastComponent,{data:{type:"error",message:res.msg}})
        }
        this.isLoading = false
      })
      
    }
  }
}
