import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareCourseCardComponent } from './square-course-card.component';

describe('SquareCourseCardComponent', () => {
  let component: SquareCourseCardComponent;
  let fixture: ComponentFixture<SquareCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareCourseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
