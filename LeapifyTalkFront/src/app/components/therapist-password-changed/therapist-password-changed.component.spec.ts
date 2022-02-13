import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistPasswordChangedComponent } from './therapist-password-changed.component';

describe('TherapistPasswordChangedComponent', () => {
  let component: TherapistPasswordChangedComponent;
  let fixture: ComponentFixture<TherapistPasswordChangedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistPasswordChangedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistPasswordChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
