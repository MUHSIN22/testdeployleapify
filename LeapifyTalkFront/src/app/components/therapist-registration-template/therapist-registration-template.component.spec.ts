import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistRegistrationTemplateComponent } from './therapist-registration-template.component';

describe('TherapistRegistrationTemplateComponent', () => {
  let component: TherapistRegistrationTemplateComponent;
  let fixture: ComponentFixture<TherapistRegistrationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistRegistrationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistRegistrationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
