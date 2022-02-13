import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedTherapistsComponent } from './approved-therapists.component';

describe('ApprovedTherapistsComponent', () => {
  let component: ApprovedTherapistsComponent;
  let fixture: ComponentFixture<ApprovedTherapistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedTherapistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedTherapistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
