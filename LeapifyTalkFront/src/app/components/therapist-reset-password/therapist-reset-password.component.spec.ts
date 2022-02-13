import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistResetPasswordComponent } from './therapist-reset-password.component';

describe('TherapistResetPasswordComponent', () => {
  let component: TherapistResetPasswordComponent;
  let fixture: ComponentFixture<TherapistResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
