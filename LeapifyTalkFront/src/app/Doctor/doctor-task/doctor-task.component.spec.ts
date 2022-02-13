import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTaskComponent } from './doctor-task.component';

describe('DoctorTaskComponent', () => {
  let component: DoctorTaskComponent;
  let fixture: ComponentFixture<DoctorTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
