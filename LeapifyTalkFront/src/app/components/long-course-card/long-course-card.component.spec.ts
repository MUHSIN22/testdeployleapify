import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongCourseCardComponent } from './long-course-card.component';

describe('LongCourseCardComponent', () => {
  let component: LongCourseCardComponent;
  let fixture: ComponentFixture<LongCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongCourseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
