import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/services/http.service';
import { TherapistService } from 'src/app/services/therapist.service';
import { LoadingComponent } from '../loading/loading.component';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-therapist-profile-edit',
  templateUrl: './therapist-profile-edit.component.html',
  styleUrls: ['./therapist-profile-edit.component.css']
})
export class TherapistProfileEditComponent implements OnInit {
  public instructorId:any;
  public instructor:any = {
    name: '',
    headline: '',
    about: '',
    email: '',
    phone: '',
    link: '',
    photo_url: ''
  }
  public mobilePattern: any = '(^[0-9]+$)';
  public emailPattern: any = '(^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$)'
  public photoPreview:any = '';
  public hasPhoto:boolean = false;
  public isLoading:boolean = false;
  constructor(public httpService:HttpService, public therapistService:TherapistService, public _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.instructorId = this.httpService.loggedInUser.id
    this.isLoading = true
    this.therapistService.getInstructorById(this.instructorId).subscribe((res:any) => {
      let {name,phone,link,headline,photo_url,email,about_instructor} = res.oneInst

      
      if(photo_url === ""){
        this.hasPhoto = false
      }else{
        this.hasPhoto = true
      }
      this.instructor = {
        ...this.instructor,
        name,
        phone,
        link,
        headline,
        photo_url,
        email,
        about: about_instructor
      }
      this.isLoading = false
    })
  }

  onSubmit() {
    let formData = new FormData();
    formData.append('name',this.instructor.name)
    formData.append('phone',"+"+this.instructor.phone)
    formData.append('link',this.instructor.link)
    formData.append('headline',this.instructor.headline)
    formData.append('about_instructor',this.instructor.about)
    formData.append('photo',this.instructor.photo_url)
    formData.append('email',this.instructor.email)
    
    this.therapistService.editInstructorProfile(formData).subscribe((res:any) => {

      if(res.status == "error"){
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"error",message:res.msg}})
      }else{
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"success",message:"Profile updated successfully"}})
      }
    })
  }
  
  handleFile = (event:any ) => {
    this.hasPhoto = false
    this.instructor.photo_url = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => this.photoPreview = reader.result;
    reader.readAsDataURL(event.target.files[0]);
  }
}
