import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistCoursesComponent } from './therapist-courses.component';

describe('TherapistCoursesComponent', () => {
  let component: TherapistCoursesComponent;
  let fixture: ComponentFixture<TherapistCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
