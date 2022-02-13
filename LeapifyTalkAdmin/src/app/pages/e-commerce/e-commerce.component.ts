import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {

  public statics:any[] = [];
  public courseCounts:any[] = [];
  public transactionPage:number = 1
  public totalTransactions:number = 0
  public coursePage:number = 1
  public totalCourses:number = 0

  courseSettings = {
    actions: {
      edit: false,
      delete: false,
      add: false
    },
    pager: {
      display: false
    },
    columns: {
      course_title: {
        title: 'Course',
        type: 'string',
        filter: false
      },
      instructorName: {
        title: 'Instructor',
        type: 'string',
        filter: false,
        valuePrepareFunction : (instructor) =>{
          return instructor.name
        }
      },
      student_count: {
        title: 'No. of time purchased',
        type: 'string',
        filter: false,
        
      },
    },
  };

  transactionSettings = {
    actions:{
      add: false,
      delete: false, 
      edit: false
    },
    pager: {
      display: false
    },
    columns: {
      userID: {
        title: 'Student',
        type: 'string',
        filter: false,
        valuePrepareFunction : (student) => {
          return student.name
        }
      },
      courseID: {
        title: 'Course',
        type: 'string',
        filter: false,
        valuePrepareFunction : (course) => {
          return course.course_title
        }
      },
      price: {
        title: 'Price',
        type: 'string',
        filter: false
      },
      instructorID: {
        title: 'Instructor',
        type: 'string',
        filter: false,
        valuePrepareFunction : (instructor) => {
          return instructor.name
        }
      },
      createdAt: {
        title: 'Date of purchase',
        type: 'number',
        filter: false,
        valuePrepareFunction : (date) =>{
          return new Date(date).toLocaleDateString()
        }
      },
    },
  };

  transactions: LocalDataSource = new LocalDataSource();
  courses: LocalDataSource = new LocalDataSource();

  constructor( private httpService: HttpService) {

  }

  ngOnInit(){
    this.getStatisticsCount();
    this.getCourseCounts();
    this.getTransactions();
    this.getCourses();
  }

  getStatisticsCount = () => {
    this.httpService.getStatisticsCount().subscribe((res:any) => {
      this.statics = [
        {
          title: "Total Courses",
          value: res.msg.totalCourses,
          activeProgress: res.msg.coursePercent
        },
        {
          title: "Total Therapists",
          value: res.msg.totalTherapist,
          activeProgress: res.msg.therapistPercent
        },
        {
          title: "Total Students",
          value: res.msg.totalUsers,
          activeProgress: res.msg.userPercent
        }
      ];
      
    })
  }

  getCourseCounts = () => {
    this.httpService.getCourseCount().subscribe((res:any) => {
      this.courseCounts = [
        {
          title: "Approved Courses",
          value: res.msg.totalApproved,
          border: '2rem solid #32db81',
          isCourse: true,
          link: 'approved-courses'
        },
        {
          title: "Rejected courses",
          value: res.msg.totalrejected,
          border: '2rem solid #ef233c',
          isCourse: true, 
          link: 'rejected-courses'
        },
        {
          title: "Onhold courses",
          value: res.msg.totalOnhold,
          border: '2rem solid #fca311',
          isCourse: true,
          link: 'courses'
        }
      ];
      
    })
  }

  getTransactions = () => {
    this.httpService.getTransactions(this.transactionPage).subscribe((res:any) => {
      this.transactions.load(res.msg.courses)
      this.totalTransactions = res.msg.total
    })
  }

  getCourses = () => {
    this.httpService.getMostPurchasedCourse(this.coursePage).subscribe((res:any) => {
      this.courses.load(res.msg.courses)
      this.totalCourses = res.msg.total
    })
  }

  onTransactionPageChange = (page:number) => {
    this.getTransactions()
  }

  onCoursePageChange = (page:number) => {
    this.getCourses()
  }
  
}
