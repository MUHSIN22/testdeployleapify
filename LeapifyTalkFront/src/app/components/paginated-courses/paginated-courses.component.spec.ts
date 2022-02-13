import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedCoursesComponent } from './paginated-courses.component';

describe('PaginatedCoursesComponent', () => {
  let component: PaginatedCoursesComponent;
  let fixture: ComponentFixture<PaginatedCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatedCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
