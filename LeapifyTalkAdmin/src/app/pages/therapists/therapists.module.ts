import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TherapistsComponent } from './therapists.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TherapistsComponent
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbCardModule,
    NgbPaginationModule
  ]
})
export class TherapistsModule { }
