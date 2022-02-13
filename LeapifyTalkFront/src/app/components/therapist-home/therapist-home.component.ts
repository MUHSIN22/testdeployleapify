import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TherapistService } from 'src/app/services/therapist.service';

@Component({
  selector: 'app-therapist-home',
  templateUrl: './therapist-home.component.html',
  styleUrls: ['./therapist-home.component.css']
})
export class TherapistHomeComponent implements OnInit {
  public stats:any;
  public students:any;
  public totalCount:number = 0;

  constructor(private therapistService:TherapistService, public route: Router, public router:ActivatedRoute) { }
  ngOnInit(): void {
    this.therapistService.getDashboardStudents().subscribe((res:any) => {
      if(res.status === "ok"){
        this.students = res.msg.courses.courses
        this.totalCount = Math.ceil(res.msg.len/8)
        this.students.forEach((student:any)=> {
          student.createdAt = new Date(student.createdAt).toLocaleDateString()
        })
      }
      this.changePage(1)
    })

    this.therapistService.getDashboardStats().subscribe((res:any) => {
      this.stats = res;
    })
    
  }

  changePage = (page:number) =>{
    this.route.navigate(
      [],
      {
        relativeTo: this.router,
        queryParams:{page:page},
        queryParamsHandling: 'merge',
      }
    )
  }

}
