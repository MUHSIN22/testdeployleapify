import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionDashboardComponent } from './companion-dashboard.component';

describe('CompanionDashboardComponent', () => {
  let component: CompanionDashboardComponent;
  let fixture: ComponentFixture<CompanionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
