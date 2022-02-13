import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFaqComponent } from './patient-faq.component';

describe('PatientFaqComponent', () => {
  let component: PatientFaqComponent;
  let fixture: ComponentFixture<PatientFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
