import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { TherapistsComponent } from './therapists/therapists.component';
import { CoursesComponent } from './courses/courses.component';
import { ApprovedCoursesComponent } from './approved-courses/approved-courses.component';
import { ApprovedTherapistsComponent } from './approved-therapists/approved-therapists.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: "therapists",
      component: TherapistsComponent
    },
    {
      path: 'courses',
      component: CoursesComponent
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'approved-courses',
      component: ApprovedCoursesComponent
    },
    {
      path: 'rejected-courses',
      component: ApprovedCoursesComponent
    },
    {
      path: 'approved-therapists',
      component: ApprovedTherapistsComponent
    },
    {
      path: 'rejected-therapists',
      component: ApprovedTherapistsComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
