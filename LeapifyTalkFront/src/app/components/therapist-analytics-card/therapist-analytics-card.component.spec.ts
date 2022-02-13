import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistAnalyticsCardComponent } from './therapist-analytics-card.component';

describe('TherapistAnalyticsCardComponent', () => {
  let component: TherapistAnalyticsCardComponent;
  let fixture: ComponentFixture<TherapistAnalyticsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistAnalyticsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistAnalyticsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
