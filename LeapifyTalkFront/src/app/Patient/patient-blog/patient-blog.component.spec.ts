import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBlogComponent } from './patient-blog.component';

describe('PatientBlogComponent', () => {
  let component: PatientBlogComponent;
  let fixture: ComponentFixture<PatientBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
