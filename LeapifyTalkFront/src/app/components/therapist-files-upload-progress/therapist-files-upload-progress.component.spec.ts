import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistFilesUploadProgressComponent } from './therapist-files-upload-progress.component';

describe('TherapistFilesUploadProgressComponent', () => {
  let component: TherapistFilesUploadProgressComponent;
  let fixture: ComponentFixture<TherapistFilesUploadProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistFilesUploadProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistFilesUploadProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
