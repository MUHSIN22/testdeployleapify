import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-doctor-blog',
  templateUrl: './doctor-blog.component.html',
  styleUrls: ['./doctor-blog.component.css']
})
export class DoctorBlogComponent implements OnInit {

  addblog! : FormGroup;
  addblogs! : boolean;
  showErrormsg! : boolean;
  blogsdata : any;
  short_date : any;
  Userdata : any;
  ProfilePic : any;

  filetoupload! : File;
  imageUrl! : string;
  SplitImage : any;
  ImgName : any;
  ImgExtension : any;
  loggedInUser: any;

  constructor(private fb: FormBuilder, private httpService:HttpService, private datepipe: DatePipe,) { }

  ngOnInit(): void {
    this.httpService.userSubject.subscribe(
      (user)=>{
        this.loggedInUser = user;
      })
      
    this.addblog = this.fb.group({
      Title: ['', []],
      BlogContent: ['', []],
      image: ['', []]
    });

    this.BlogData();
  }

  OpenAddBlog()
  {
    this.addblogs = !this.addblogs;
  }

  BlogData()
  {
    var Email = this.loggedInUser.email;
    this.httpService.BlogData({email : Email}).subscribe(
      (blogdata : any) => {
        this.blogsdata = blogdata;
        console.log(this.blogsdata,"BlogData");
      })
  }

  DeleteBlog(_id : any)
  {
    if(window.confirm('Are sure you want to delete this item ?')){
      this.httpService.DeleteBlog({id : _id}).subscribe(
        (deleteblog : any) => {
          deleteblog;
          console.log(this.blogsdata,"BlogData");
          window.location.reload();
        })
     }
  }

  ////////////////////////////////////////////////////////////////
onFileSelected(event : any)
{
  if (event.target.files.length > 0) 
  {
    this.filetoupload = event.target.files.item(0);
    
    this.ImgName = this.filetoupload.name;
    this.SplitImage = this.ImgName.split(".");
    this.ImgExtension = this.SplitImage[1];
    // ============================================
    if( this.ImgExtension == "jpg" || this.ImgExtension == "png")
    {
      // Show Image 
      var reader = new FileReader();
      reader.onload = (event:any) => 
      {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.filetoupload);
    }
    else if(this.ImgExtension != "jpg" || this.ImgExtension != "png")
    {
      this.ImgName = null;
     alert('Only jpg, png files are allowed');
    }
    // ============================================
  }
}
////////////////////////////////////////////////////////////////

  AddBlog(addblog : any)
  {
    var c_date=new Date();
    this.short_date = this.datepipe.transform(c_date, 'dd-MM-yyy');
    this.showErrormsg = true;
  if (addblog.valid)
  {
      var fd = new FormData();
      fd.append('email', this.loggedInUser.email),
      fd.append('name', this.loggedInUser.dname),
      fd.append('date', this.short_date),
      fd.append('blogtitle', this.addblog.value.Title),
      fd.append('blogcontent', this.addblog.value.BlogContent),
      fd.append('file', this.filetoupload)

      // console.log(fd,'formdata');
      this.httpService.Blog(fd).subscribe(
        (post : any) => {
          console.log(post,'BlogPost');
          window.location.reload();
        });
  }

  }

}
