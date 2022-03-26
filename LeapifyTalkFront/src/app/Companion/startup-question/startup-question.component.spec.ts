import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupQuestionComponent } from './startup-question.component';

describe('StartupQuestionComponent', () => {
  let component: StartupQuestionComponent;
  let fixture: ComponentFixture<StartupQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
