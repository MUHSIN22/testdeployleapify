import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpHandlingComponent } from './otp-handling.component';

describe('OtpHandlingComponent', () => {
  let component: OtpHandlingComponent;
  let fixture: ComponentFixture<OtpHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpHandlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
