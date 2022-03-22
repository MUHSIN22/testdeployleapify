import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionExamResultComponent } from './companion-exam-result.component';

describe('CompanionExamResultComponent', () => {
  let component: CompanionExamResultComponent;
  let fixture: ComponentFixture<CompanionExamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanionExamResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
