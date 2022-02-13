import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistSigninComponent } from './therapist-signin.component';

describe('TherapistSigninComponent', () => {
  let component: TherapistSigninComponent;
  let fixture: ComponentFixture<TherapistSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
