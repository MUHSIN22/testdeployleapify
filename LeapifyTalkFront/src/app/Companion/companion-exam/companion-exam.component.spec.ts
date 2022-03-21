import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionExamComponent } from './companion-exam.component';

describe('CompanionExamComponent', () => {
  let component: CompanionExamComponent;
  let fixture: ComponentFixture<CompanionExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanionExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
