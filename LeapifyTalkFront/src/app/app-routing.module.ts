import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChoosePricingComponent } from './components/choose-pricing/choose-pricing.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CounselorJobComponent } from './components/counselor-job/counselor-job.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { GroupsComponent } from './components/groups/groups.component';
import { HomeComponent } from './components/home/home.component';
import { InitialStartupComponent } from './components/initial-startup/initial-startup.component';
import { InspiredComponent } from './components/inspired/inspired.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { LoadingComponent } from './components/loading/loading.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ProviderComponent } from './components/provider/provider.component';
import { ReportAbuseComponent } from './components/report-abuse/report-abuse.component';
import { SigninComponent } from './components/signin/signin.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentProfileEditComponent } from './components/student-profile-edit/student-profile-edit.component';
import { TAndCComponent } from './components/t-and-c/t-and-c.component';
import { TherapistCourseUploadComponent } from './components/therapist-course-upload/therapist-course-upload.component';
import { TherapistCoursesComponent } from './components/therapist-courses/therapist-courses.component';
import { TherapistDashboardComponent } from './components/therapist-dashboard/therapist-dashboard.component';
import { TherapistHomeComponent } from './components/therapist-home/therapist-home.component';
import { TherapistLessonUploadComponent } from './components/therapist-lesson-upload/therapist-lesson-upload.component';
import { TherapistNewPasswordComponent } from './components/therapist-new-password/therapist-new-password.component';
import { TherapistPasswordChangedComponent } from './components/therapist-password-changed/therapist-password-changed.component';
import { TherapistProfileEditComponent } from './components/therapist-profile-edit/therapist-profile-edit.component';
import { TherapistRegistrationTemplateComponent } from './components/therapist-registration-template/therapist-registration-template.component';
import { TherapistResetPasswordComponent } from './components/therapist-reset-password/therapist-reset-password.component';
import { TherapistSigninComponent } from './components/therapist-signin/therapist-signin.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { DoctorNewPatientComponent } from './Doctor/doctor-new-patient/doctor-new-patient.component';
import { DoctorAppointmentComponent } from './Doctor/doctor-appointment/doctor-appointment.component';
import { DoctorBlogComponent } from './Doctor/doctor-blog/doctor-blog.component';
import { DoctorCalendarComponent } from './Doctor/doctor-calendar/doctor-calendar.component';
import { DoctorFaqComponent } from './Doctor/doctor-faq/doctor-faq.component';
import { DoctorFeedbackComponent } from './Doctor/doctor-feedback/doctor-feedback.component';
import { DoctorPatientsComponent } from './Doctor/doctor-patients/doctor-patients.component';
import { DoctorProfileComponent } from './Doctor/doctor-profile/doctor-profile.component';
import { DoctorSignupComponent } from './Doctor/doctor-signup/doctor-signup.component';
import { DoctorTaskComponent } from './Doctor/doctor-task/doctor-task.component';
import { AuthGuard } from './guards/auth.guard';
import { TherapistAuthGuard } from './guards/therapist-auth.guard';
import { IsUserVerifyComponent } from './is-user-verify/is-user-verify.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DoctorDashboardComponent } from './Doctor/doctor-dashboard/doctor-dashboard.component';
import { PatientProfileComponent } from './Patient/patient-profile/patient-profile.component';
import { PatientFeedbackComponent } from './Patient/patient-feedback/patient-feedback.component';
import { PatientAppointmentComponent } from './Patient/patient-appointment/patient-appointment.component';
import { PatientPaymentComponent } from './Patient/patient-payment/patient-payment.component';
import { PatientFaqComponent } from './Patient/patient-faq/patient-faq.component';
import { PatientBlogComponent } from './Patient/patient-blog/patient-blog.component';
import { PatientAssessmentComponent } from './Patient/patient-assessment/patient-assessment.component';
import { PatientDashboardComponent } from './Patient/patient-dashboard/patient-dashboard.component';
import { CompanionSignupComponent } from './Companion/companion-signup/companion-signup.component';
import { CompanionListComponent } from './components/companion-list/companion-list.component';
import { CompanionExamComponent } from './Companion/companion-exam/companion-exam.component';
<<<<<<< HEAD
import { CompanionProfileComponent } from './components/companion-profile/companion-profile.component';
=======
import { CompanionStartupComponent } from './Companion/companion-startup/companion-startup.component';
import { CompanionDashboardComponent } from './Companion/companion-dashboard/companion-dashboard.component';
import { CompanionHomeComponent } from './Companion/companion-home/companion-home.component';
import { CompanionExamResultComponent } from './Companion/companion-exam-result/companion-exam-result.component';
>>>>>>> e59f2b9b612b84bae0dfdc06e571763d3fdad0da

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'counselor-job', component: CounselorJobComponent },
  { path: 'provider', component: ProviderComponent },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'our-services', component: OurServicesComponent },
  { path: 'terms-and-conditions', component: TAndCComponent },
  { path: 'startup', component: InitialStartupComponent },
  { path: 'comments/:id', component: CommentsComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'reset-password/:id', component: SigninComponent },
  { path: 'choose-pricing', component: ChoosePricingComponent },
  { path: 'inspired', component: InspiredComponent },
  { path: 'courses', component: CoursesComponent  },
  { path: 'instructor/:id', component: InstructorComponent},
  { path: 'therapist-signin', component: TherapistSigninComponent},
  { path: 'course/:id', component: CourseComponent },
  { path: 'therapist/reset-password/:id', component: TherapistNewPasswordComponent},
  { path: 'therapist-signup', component: TherapistRegistrationTemplateComponent },
  { path: 'therapist-password-changed', component: TherapistPasswordChangedComponent},
  { path: 'course-view/:id', component:VideoViewComponent},
  { path: 'forgot-password',component: TherapistResetPasswordComponent},
  { path: 'show-companions',component: CompanionListComponent},
  { path: 'student', component: StudentDashboardComponent,
    children: [
      { path: 'course', component: StudentCoursesComponent },
      { path: 'edit-profile', component: StudentProfileEditComponent},
      { path: 'group', component: GroupsComponent, children: [
        { path: ':id', component: ChatRoomComponent }
      ]}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'therapist', component: TherapistDashboardComponent,
    children: [
      { path: 'dashboard', component: TherapistHomeComponent },
      { path: 'edit-profile', component: TherapistProfileEditComponent },
      { path: 'upload-course', component: TherapistCourseUploadComponent },
      { path: 'upload-lesson/:id', component: TherapistLessonUploadComponent },
      { path: 'courses', component: TherapistCoursesComponent },
      { path: 'edit-course/:id', component: TherapistCourseUploadComponent},
      { path: 'group', component: GroupsComponent, children: [
        { path: ':id', component: ChatRoomComponent }
      ]},
    ],
    canActivate: [TherapistAuthGuard]
  },
  {
    path: 'groups', component: GroupsComponent,
    children: [
      { path: ':id', component: ChatRoomComponent },
    ], canActivate: [AuthGuard]
  },

 // -----------------------------------------------------------------------------------------------------
  // ================== Doctor SideMenu Start ==================
  { path: 'doctor-profile', component: DoctorProfileComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'doctor-calendar', component: DoctorCalendarComponent },
  { path: 'doctor-faq', component: DoctorFaqComponent },
  { path: 'doctor-feedback', component: DoctorFeedbackComponent },
  { path: 'doctor-patients', component: DoctorPatientsComponent },
  { path: 'doctor-task', component: DoctorTaskComponent },
  { path: 'doctor-appointment', component: DoctorAppointmentComponent },
  { path: 'doctor-new-patient', component: DoctorNewPatientComponent },
  { path: 'doctor-blog', component: DoctorBlogComponent },
  { path: 'doctor-signup', component: DoctorSignupComponent },
  // ================= Doctor SideMenu End =====================
  { path: 'user-verify', component: IsUserVerifyComponent },
  // ================= Patient SideMenu Start ==================
  { path: 'patient-dashboard', component: PatientDashboardComponent },
  { path: 'patient-profile', component: PatientProfileComponent },
  { path: 'patient-feedback', component: PatientFeedbackComponent },
  { path: 'book-appointment', component: PatientAppointmentComponent },
  { path: 'payment', component: PatientPaymentComponent },
  { path: 'patient-faq', component: PatientFaqComponent },
  { path: 'patient-blog', component: PatientBlogComponent },
  { path: 'patient-assessment', component: PatientAssessmentComponent },
  // ================= Patient SideMenu Start ==================
  


  // Companion Routes Start-------------------------------------------------------------------------------
  { path: 'companion-signup', component: CompanionSignupComponent },
  { path: 'companion-exam', component: CompanionExamComponent },
<<<<<<< HEAD
  { path: 'companion-profile/:id', component: CompanionProfileComponent},

=======
  { path: 'companion-startup',component: CompanionStartupComponent},
  { path: 'companion-result/:state',component: CompanionExamResultComponent},
  { path: 'companion', component: CompanionDashboardComponent,
    children: [
      { path: 'home', component: CompanionHomeComponent}
    ]
  },
>>>>>>> e59f2b9b612b84bae0dfdc06e571763d3fdad0da
  
  { path: '**', component: PageNotFoundComponent },
  // -----------------------------------------------------------------------------------------------------

  // { path: '**', redirectTo: '' },

];

const options: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, options)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
