import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-course-searching-bar',
  templateUrl: './course-searching-bar.component.html',
  styleUrls: ['./course-searching-bar.component.css']
})
export class CourseSearchingBarComponent implements OnInit {
  @Output() searchInputEmitter = new EventEmitter()
  @Input() results:any;
  public search:any;
  constructor() { }

  ngOnInit(): void {
  }

  searchInput = (event:any) => {
    this.search = event.target.value
    this.searchInputEmitter.emit(event.target.value)
  }

}
