import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionSignupComponent } from './companion-signup.component';

describe('CompanionSignupComponent', () => {
  let component: CompanionSignupComponent;
  let fixture: ComponentFixture<CompanionSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanionSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
