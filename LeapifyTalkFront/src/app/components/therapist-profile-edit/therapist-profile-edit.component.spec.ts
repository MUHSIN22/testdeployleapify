import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistProfileEditComponent } from './therapist-profile-edit.component';

describe('TherapistProfileEditComponent', () => {
  let component: TherapistProfileEditComponent;
  let fixture: ComponentFixture<TherapistProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistProfileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
