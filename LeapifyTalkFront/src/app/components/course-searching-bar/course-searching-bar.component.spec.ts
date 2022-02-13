import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchingBarComponent } from './course-searching-bar.component';

describe('CourseSearchingBarComponent', () => {
  let component: CourseSearchingBarComponent;
  let fixture: ComponentFixture<CourseSearchingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSearchingBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
