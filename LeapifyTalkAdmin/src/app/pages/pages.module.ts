import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TherapistsModule } from './therapists/therapists.module';
import { CoursesModule } from './courses/courses.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ApprovedCoursesComponent } from './approved-courses/approved-courses.component';
import { ApprovedCoursesModule } from './approved-courses/approved-courses.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ApprovedTherapistsComponent } from './approved-therapists/approved-therapists.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ECommerceModule,
    MiscellaneousModule,
    TherapistsModule,
    CoursesModule,
    ApprovedCoursesModule,
    FormsModule,
    NgbPaginationModule,
    Ng2SmartTableModule,
    NbCardModule
  ],
  declarations: [
    PagesComponent,
    LoginComponent,
    ApprovedCoursesComponent,
    ApprovedTherapistsComponent,
  ],
})
export class PagesModule {
}
