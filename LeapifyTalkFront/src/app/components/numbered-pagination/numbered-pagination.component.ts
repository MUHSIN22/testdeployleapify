import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-numbered-pagination',
  templateUrl: './numbered-pagination.component.html',
  styleUrls: ['./numbered-pagination.component.css']
})
export class NumberedPaginationComponent implements OnInit {
  @Output() changePage = new EventEmitter();
  @Input() totalPages = 0;
  public page:number = 1;
  constructor(public router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(param => {
      if(param.page < 1){
        this.page = 1
      }else{
        this.page = parseInt(param.page)
      }
    })
  }

  handlePageNumber = (operand: any) => {
    this.page = this.page+operand;
    this.changePage.emit(this.page)
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
