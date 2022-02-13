import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-student-profile-edit',
  templateUrl: './student-profile-edit.component.html',
  styleUrls: ['./student-profile-edit.component.css']
})
export class StudentProfileEditComponent implements OnInit {
  public profileData:any = {
    name: '',
    email: '',
    phone: '',
    photo:''
  };
  public photoPreview:any;
  public isLoading:boolean = false;
  constructor(private studentService: StudentService,private _snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.isLoading = true
    this.studentService.getStudentDetails().subscribe((res:any) => {
      if(res.status === "ok"){
        let data = res.response
        this.profileData = {
          name: data.name,
          email:data.email,
          phone:data.phone,
          photo:data.photo
        }
      }else{
        this._snackBar.openFromComponent(ToastComponent, { data: { type:"error", message: res.msg}})
      }
      this.isLoading = false
    })
  }

  handleFile = (event:any) => {
    this.profileData.photo = event.target.files[0]

    let reader = new FileReader();
    reader.onload = (e) => this.photoPreview = reader.result;
    reader.readAsDataURL(event.target.files[0]);
    
  }

  onSubmit = () => {
    let formData = new FormData();
    formData.append('name',this.profileData.name);
    formData.append('email',this.profileData.email);
    formData.append('phone',this.profileData.phone);
    formData.append('photo',this.profileData.photo);

    this.studentService.editStudentProfile(formData).subscribe((res:any) => {
      if(res.status === "ok"){
        this.router.navigateByUrl('/student/course')
        this._snackBar.openFromComponent(ToastComponent,{data:{type: "success", message: "Profile updated successfully"}})
      }else{
        this._snackBar.openFromComponent(ToastComponent,{data:{type: "error",message:res.msg}})
      }
    })
  }
}
