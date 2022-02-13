import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginated-courses',
  templateUrl: './paginated-courses.component.html',
  styleUrls: ['./paginated-courses.component.css']
})
export class PaginatedCoursesComponent implements OnInit {
  @Input() courseCategory:String = "";
  @Input() coursesData:any;
  @Output() pageChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {

  }

  changePage = (page:number) => {
    this.pageChange.emit(page)
  }

}
