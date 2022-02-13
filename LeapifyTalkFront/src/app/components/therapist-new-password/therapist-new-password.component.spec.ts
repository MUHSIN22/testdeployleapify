import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistNewPasswordComponent } from './therapist-new-password.component';

describe('TherapistNewPasswordComponent', () => {
  let component: TherapistNewPasswordComponent;
  let fixture: ComponentFixture<TherapistNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistNewPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
