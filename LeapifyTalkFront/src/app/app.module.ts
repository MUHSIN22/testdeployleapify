import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button'
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { WebcamModule } from 'ngx-webcam';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TherapyComponent } from './components/therapy/therapy.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ProviderComponent } from './components/provider/provider.component';
import { TAndCComponent } from './components/t-and-c/t-and-c.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CounselorJobComponent } from './components/counselor-job/counselor-job.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChoosePricingComponent } from './components/choose-pricing/choose-pricing.component';
import { InitialStartupComponent } from './components/initial-startup/initial-startup.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { GroupsComponent } from './components/groups/groups.component';
import { MessageComponent } from './components/message/message.component';
import { TypeMessageComponent } from './components/type-message/type-message.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SigninComponent } from './components/signin/signin.component';
import { AudioRecordService } from './services/audio-record.service';
import { ToastComponent } from './components/toast/toast.component';
import { HttpService } from './services/http.service';
import { CaptureImageComponent } from './components/capture-image/capture-image.component';
import { ReportAbuseComponent } from './components/report-abuse/report-abuse.component';
import { InspiredComponent } from './components/inspired/inspired.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { SubCategoryListComponent } from './components/sub-category-list/sub-category-list.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SquareCourseCardComponent } from './components/square-course-card/square-course-card.component';
import { MostPopularCoursesComponent } from './components/most-popular-courses/most-popular-courses.component';
import { RatingSectionComponent } from './components/rating-section/rating-section.component';
import { CardLabelComponent } from './components/card-label/card-label.component';
import { LongCourseCardComponent } from './components/long-course-card/long-course-card.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { PaginatedCoursesComponent } from './components/paginated-courses/paginated-courses.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { CourseComponent } from './components/course/course.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { DashboardNavigationComponent } from './components/dashboard-navigation/dashboard-navigation.component';
import { StudentDashboardCourseCardComponent } from './components/student-dashboard-course-card/student-dashboard-course-card.component';
import { TherapistSigninComponent } from './components/therapist-signin/therapist-signin.component';
import { TherapistNewPasswordComponent } from './components/therapist-new-password/therapist-new-password.component';
import { TherapistRegistrationTemplateComponent } from './components/therapist-registration-template/therapist-registration-template.component';
import { TherapistPasswordChangedComponent } from './components/therapist-password-changed/therapist-password-changed.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentProfileEditComponent } from './components/student-profile-edit/student-profile-edit.component';
import { TherapistDashboardComponent } from './components/therapist-dashboard/therapist-dashboard.component';
import { TherapistHomeComponent } from './components/therapist-home/therapist-home.component';
import { TherapistAnalyticsCardComponent } from './components/therapist-analytics-card/therapist-analytics-card.component';
import { TherapistProfileEditComponent } from './components/therapist-profile-edit/therapist-profile-edit.component';
import { TherapistCourseUploadComponent } from './components/therapist-course-upload/therapist-course-upload.component';
import { DragAndUploadComponent } from './components/drag-and-upload/drag-and-upload.component';
import { TherapistLessonUploadComponent } from './components/therapist-lesson-upload/therapist-lesson-upload.component';
import { CourseSearchingBarComponent } from './components/course-searching-bar/course-searching-bar.component';
import { TherapistCoursesComponent } from './components/therapist-courses/therapist-courses.component';
import { NotNumberedPaginationComponent } from './components/not-numbered-pagination/not-numbered-pagination.component';
import { TherapistFilesUploadProgressComponent } from './components/therapist-files-upload-progress/therapist-files-upload-progress.component';
import { NumberedPaginationComponent } from './components/numbered-pagination/numbered-pagination.component';
import { LoadingComponent } from './components/loading/loading.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { TherapistResetPasswordComponent } from './components/therapist-reset-password/therapist-reset-password.component';
import { ReviewComponent } from './components/review/review.component';
import { OtpHandlingComponent } from './components/otp-handling/otp-handling.component';
import { DoctorSignupComponent } from './Doctor/doctor-signup/doctor-signup.component';
import { DoctorProfileComponent } from './Doctor/doctor-profile/doctor-profile.component';
import { IsUserVerifyComponent } from './is-user-verify/is-user-verify.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DoctorPatientsComponent } from './Doctor/doctor-patients/doctor-patients.component';
import { DoctorAppointmentComponent } from './Doctor/doctor-appointment/doctor-appointment.component';
import { DoctorBlogComponent } from './Doctor/doctor-blog/doctor-blog.component';
import { DoctorCalendarComponent } from './Doctor/doctor-calendar/doctor-calendar.component';
import { DoctorFaqComponent } from './Doctor/doctor-faq/doctor-faq.component';
import { DoctorFeedbackComponent } from './Doctor/doctor-feedback/doctor-feedback.component';
import { DoctorTaskComponent } from './Doctor/doctor-task/doctor-task.component';
import { DoctorDashboardComponent } from './Doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorNewPatientComponent } from './Doctor/doctor-new-patient/doctor-new-patient.component';
import { PatientProfileComponent } from './Patient/patient-profile/patient-profile.component';
import { PatientAppointmentComponent } from './Patient/patient-appointment/patient-appointment.component';
import { PatientAssessmentComponent } from './Patient/patient-assessment/patient-assessment.component';
import { PatientBlogComponent } from './Patient/patient-blog/patient-blog.component';
import { PatientFaqComponent } from './Patient/patient-faq/patient-faq.component';
import { PatientPaymentComponent } from './Patient/patient-payment/patient-payment.component';
import { PatientFeedbackComponent } from './Patient/patient-feedback/patient-feedback.component';
import { DatePipe } from '@angular/common';
import { PatientDashboardComponent } from './Patient/patient-dashboard/patient-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TherapyComponent,
    PricingComponent,
    ReviewsComponent,
    FaqsComponent,
    ProviderComponent,
    TAndCComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    CounselorJobComponent,
    GetStartedComponent,
    FooterComponent,
    OurServicesComponent,
    ChoosePricingComponent,
    InitialStartupComponent,
    AddImageComponent,
    ChatRoomComponent,
    GroupsComponent,
    MessageComponent,
    TypeMessageComponent,
    NotificationComponent,
    CommentsComponent,
    SigninComponent,
    ToastComponent,
    CaptureImageComponent,
    ReportAbuseComponent,
    InspiredComponent,
    CategoryBarComponent,
    SubCategoryListComponent,
    CoursesComponent,
    SquareCourseCardComponent,
    MostPopularCoursesComponent,
    RatingSectionComponent,
    CardLabelComponent,
    LongCourseCardComponent,
    PaginatedCoursesComponent,
    InstructorComponent,
    CourseComponent,
    StudentDashboardComponent,
    StudentCoursesComponent,
    DashboardNavigationComponent,
    StudentDashboardCourseCardComponent,
    TherapistSigninComponent,
    TherapistNewPasswordComponent,
    TherapistRegistrationTemplateComponent,
    TherapistPasswordChangedComponent,
    StudentProfileEditComponent,
    TherapistDashboardComponent,
    TherapistHomeComponent,
    TherapistAnalyticsCardComponent,
    TherapistProfileEditComponent,
    TherapistCourseUploadComponent,
    DragAndUploadComponent,
    TherapistLessonUploadComponent,
    CourseSearchingBarComponent,
    TherapistCoursesComponent,
    NotNumberedPaginationComponent,
    TherapistFilesUploadProgressComponent,
    NumberedPaginationComponent,
    LoadingComponent,
    VideoViewComponent,
    VideoPlayerComponent,
    LessonComponent,
    TherapistResetPasswordComponent,
    ReviewComponent,
    OtpHandlingComponent,
    // ---------------------------------
    DoctorSignupComponent,
    DoctorProfileComponent,
    DoctorPatientsComponent,
    DoctorAppointmentComponent,
    DoctorBlogComponent,
    DoctorCalendarComponent,
    DoctorFaqComponent,
    DoctorFeedbackComponent,
    DoctorNewPatientComponent,
    DoctorDashboardComponent,
    DoctorTaskComponent,
    // ==========================
    PatientProfileComponent,
    PatientAppointmentComponent,
    PatientAssessmentComponent,
    PatientBlogComponent,
    PatientFaqComponent,
    PatientFeedbackComponent,
    PatientPaymentComponent,
    // ==========================
    IsUserVerifyComponent,
    SidebarComponent,
    PageNotFoundComponent,
    PatientDashboardComponent,
    // ----------------------------------
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    PickerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatIconModule,
    MatBadgeModule,
    WebcamModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CarouselModule,
  ],
  providers: [
    AudioRecordService,
    HttpService,
    DatePipe,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' } },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }