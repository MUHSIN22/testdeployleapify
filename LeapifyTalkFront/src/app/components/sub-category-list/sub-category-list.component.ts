import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubCategoryObject } from 'src/interfaces';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {
  
  @Output() categoryActiveness = new EventEmitter<number>();
  @Input() data: SubCategoryObject = {
    visiblity: false,
    subCategories: []
  }
  constructor() { 
  }

  ngOnInit(): void {
  }
  onMouseOver = () => {
    this.categoryActiveness.emit(this.data.rank)
  }
  onMouseOut = () => {
    this.categoryActiveness.emit(0)
  }

}
