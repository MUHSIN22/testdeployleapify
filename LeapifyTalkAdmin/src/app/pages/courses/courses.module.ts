import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NbCardModule } from '@nebular/theme';



@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NgbPaginationModule,
    NbCardModule
  ]
})
export class CoursesModule { }
