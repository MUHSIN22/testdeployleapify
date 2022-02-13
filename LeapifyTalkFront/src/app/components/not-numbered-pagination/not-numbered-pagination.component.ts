import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-numbered-pagination',
  templateUrl: './not-numbered-pagination.component.html',
  styleUrls: ['./not-numbered-pagination.component.css']
})
export class NotNumberedPaginationComponent implements OnInit {
  @Input() totalPages:number = 0;
  @Output() changePage = new EventEmitter<number>()
  public page = 1;
  constructor(public router:ActivatedRoute,public route:Router) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(param => {
      if(param.page < 1){
        this.page = 1
      }else{
        this.page = parseInt(param.page)
      }
    })
  }

  switchToNextPage = () => {
    if(this.page<this.totalPages){
      this.changePage.emit(this.page + 1)
    }
  }

  switchToPreviousPage = () => {
    if(this.page>1){
      this.changePage.emit(this.page - 1)
    }
  }

}
