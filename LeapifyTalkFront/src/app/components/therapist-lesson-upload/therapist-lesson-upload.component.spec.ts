import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistLessonUploadComponent } from './therapist-lesson-upload.component';

describe('TherapistLessonUploadComponent', () => {
  let component: TherapistLessonUploadComponent;
  let fixture: ComponentFixture<TherapistLessonUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistLessonUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistLessonUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
