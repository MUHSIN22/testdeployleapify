import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/services/courses.service';
import { ToastComponent } from '../toast/toast.component';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-therapist-course-upload',
  templateUrl: './therapist-course-upload.component.html',
  styleUrls: ['./therapist-course-upload.component.css']
})
export class TherapistCourseUploadComponent implements OnInit {
  public files: any;
  private imageTypes: String[] = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"]
  private videoTypes: String[] = ["video/mp4", "video/mpeg", "video/mov"]
  public isFilesAreClear: boolean = false;
  public isInitialSelect: boolean = true;
  public refinedFile: any = {
    image: [],
    video: []
  };
  public isNotFile: boolean = false;
  public isNotCategory: boolean = false;
  public filesData: any = {};
  public formData: any = {
    course_title: "",
    sub_heading: '',
    tags: "",
    category: '',
    description: '',
    instructor: '',
    what_youll_learn: '',
    course_price: 5,
    offer_price: '',
  };
  public isEditor: boolean = false;
  public courseId:any;
  @ViewChild('category')  categorySelector?:ElementRef;
  constructor(
    public _snackBar: MatSnackBar,
    public courseService: CoursesService,
    public httpService: HttpService,
    public route: Router,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.url.split('/')[2] === 'edit-course') {
      this.isEditor = true;
      this.getCourseDetails(this.activeRoute.snapshot.paramMap.get("id"))
    }
  }

  getCourseDetails = (id: any) => {
    this.courseId = id
    this.courseService.getCourseById(id).subscribe((data: any) => {
      let course = data.resp.instructorCourse
      
      this.formData = {
        course_title: course.course_title,
        sub_heading: course.sub_heading,
        tags: course.tags,
        category: course.category,
        description: course.description,
        what_youll_learn: course.what_youll_learn,
        course_price: course.original_price,
        offer_price: course.offer_price
      }

      this.formData.tags.forEach((tag: any) => {
        if (typeof this.formData.tags === "object") {
          this.formData.tags = tag
        } else {
          this.formData.tags += "," + tag
        }
      })

      this.formData.what_youll_learn.forEach((point: any) => {
        if (typeof this.formData.what_youll_learn === "object") {
          this.formData.what_youll_learn = point
        } else {
          this.formData.what_youll_learn += "." + point
        }
      })
      this.selectCategory(this.formData.category)
      this.refinedFile = {
        image: [course.photo],
        video: [course.video]
      }
      this.filesData.files = this.refinedFile

    })
  }

  // Function for select a default category 
  selectCategory = (category:String) => {
    for(var i = 0; i < this.categorySelector?.nativeElement.length; i++){
      if(this.categorySelector?.nativeElement[i].value === category){
        this.categorySelector.nativeElement[i].selected = true;
        this.isInitialSelect = false
      }
    }
  }

  getFiles = (files: any): void => {
    this.checkFiles(files)

    if (this.isFilesAreClear) {
      if (this.imageTypes.includes(files[0].type)) {
        this.refinedFile = {
          image: [files[0]],
          video: [files[1]]
        }
      } else {
        this.refinedFile = {
          image: [files[1]],
          video: [files[0]]
        }
      }
    }
    
    this.filesData.files = this.refinedFile
  }

  // select the category and move to formData
  handleCategorySelection = (event: any) => {
    this.formData.category = event.target.value
    this.isInitialSelect = false;
  }

  // Remove the file from the array
  fileRemove = (fileDetails: any) => {
    if (fileDetails.type === "image") {
      this.refinedFile.image.splice(fileDetails.index, 1)
    }
    if (fileDetails.type === "video") {
      this.refinedFile.video.splice(fileDetails.index, 1)
    }
  }

  // Handle the submission of form
  handleFormSubmit = (): void => {
    let uploadData: FormData = new FormData();

    if (this.isInitialSelect || this.formData.category === null) {
      this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message: "No category is selected" } })
      this.isNotCategory = true;
    } else if (this.refinedFile.image.length === 0 || this.refinedFile.video.length === 0) {
      this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message: "Must add 1 video and 1 image" } })
      this.isNotFile = true;
    } else {
      let points = this.formData.what_youll_learn.split(".")

      if (points.length > 4) {
        this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message: "Only 4 points are allowed in What youll learn field" } })
      } else {
        let userId = this.httpService.loggedInUser.id
        this.formData.image = this.refinedFile.image[0]
        this.formData.video = this.refinedFile.video[0]
        uploadData.append('photo', this.refinedFile.image[0])
        uploadData.append('video', this.refinedFile.video[0])
        uploadData.append('course_title', this.formData.course_title)
        uploadData.append('sub_heading', this.formData.sub_heading)
        uploadData.append('category', this.formData.category)
        uploadData.append('description', this.formData.description)
        uploadData.append('tags', this.formData.tags)
        uploadData.append('what_youll_learn', this.formData.what_youll_learn)
        uploadData.append('instructor', userId)
        uploadData.append('course_price', this.formData.course_price)
        uploadData.append('offer_price', this.formData.offer_price)

        if(this.isEditor){
          this._snackBar.openFromComponent(ToastComponent, { data: { type: "warning", message: "Please while the course is being updating" } })
          this.courseService.editCourseById(uploadData,this.courseId).subscribe((res:any) => {
            if(res.status === "ok"){
              this._snackBar.openFromComponent(ToastComponent, { data: { type: "success", message: "Course updated successfully" } })
              this.route.navigateByUrl('/therapist/courses')
            }else{
              this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message: res.msg } })
            }
          })
        }else{
          this._snackBar.openFromComponent(ToastComponent, { data: { type: "warning", message: "Please while the course is being uploaded" } })
          this.courseService.addNewCourse(uploadData).subscribe((res: any) => {
            if (res.status === 'ok') {
              this._snackBar.openFromComponent(ToastComponent, { data: { type: "success", message: "Course uploaded successfully" } })
              this.route.navigateByUrl('/therapist/courses')
            } else {
              this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message: "Something went wrong!" } })
            }
          })
        }
      }
    }
    return;
  }

  // Function for check whether the the price is number
  checkPrice = (event:any) => {
    
  }

  // Function for check the price
  checkFiles = (files: any): void => {

    if (files.length > 2 || (files.length > 1 && (this.refinedFile.image.length === 1 || this.refinedFile.video.length === 1)) || (this.refinedFile.image.length === 1 && this.refinedFile.video.length === 1)) {
      this._snackBar.openFromComponent(ToastComponent, { data: { type: "error", message: "Only 1 video and 1 image are allowed" } })
      this.isFilesAreClear = false
    } else if (files.length < 2) {
      let message = "";
      let error = false

      if (this.imageTypes.includes(files[0].type)) {
        if (this.refinedFile.image.length === 1) {
          message = "Already have 1 image"
          error = true
          // this.refinedFile.image = []
        } else {
          this.refinedFile.video.length !== 1 ? message = "Upload 1 preview video" : null
          this.refinedFile.image.push(files[0])
        }
      } else if (this.videoTypes.includes(files[0].type)) {
        if (this.refinedFile.video.length === 1) {
          error = true;
          message = "Already have 1 video"
          // this.refinedFile.image = []
        } else {
          this.refinedFile.image.length !== 1 ? message = "Upload 1 image for thumbnail" : null
          this.refinedFile.video.push(files[0])
        }
      } else {
        error = true
        message = "Invalid file format"
      }

      message !== "" && this._snackBar.openFromComponent(ToastComponent, { data: { type: error ? 'error' : 'warning', message: message } })

    } else if (files.length === 2) {
      let message = "";

      if (!this.videoTypes.includes(files[0].type || files[1].type) && !this.imageTypes.includes(files[0].type || files[1].type)) {
        message = "Invalid file format"
      } else if (!this.imageTypes.includes(files[0].type)) {
        if (!this.imageTypes.includes(files[1].type)) {
          message = "Must contain 1 image for thumbnail"
        } else {
          if (!this.videoTypes.includes(files[0].type)) {
            if (!this.videoTypes.includes(files[1].type)) {
              message = "Must contain 1 video for preview"
            } else {
              this.isFilesAreClear = true
            }
          } else {
            this.isFilesAreClear = true
          }
        }
      } else if (!this.videoTypes.includes(files[0].type)) {
        if (!this.videoTypes.includes(files[1].type)) {
          message = "Must contain 1 video for preview"
        } else {
          this.isFilesAreClear = true
        }
      } else {
        this.isFilesAreClear = true
      }
      message !== "" && this._snackBar.openFromComponent(ToastComponent, { data: { type: 'error', message: message } })
    }
  }

}
