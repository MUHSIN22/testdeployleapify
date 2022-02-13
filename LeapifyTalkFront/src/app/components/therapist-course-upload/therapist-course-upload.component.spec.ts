import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistCourseUploadComponent } from './therapist-course-upload.component';

describe('TherapistCourseUploadComponent', () => {
  let component: TherapistCourseUploadComponent;
  let fixture: ComponentFixture<TherapistCourseUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistCourseUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistCourseUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
