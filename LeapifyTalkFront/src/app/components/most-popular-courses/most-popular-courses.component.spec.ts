import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularCoursesComponent } from './most-popular-courses.component';

describe('MostPopularCoursesComponent', () => {
  let component: MostPopularCoursesComponent;
  let fixture: ComponentFixture<MostPopularCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
