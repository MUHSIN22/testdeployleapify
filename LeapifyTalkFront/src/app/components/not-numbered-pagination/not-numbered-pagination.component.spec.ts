import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotNumberedPaginationComponent } from './not-numbered-pagination.component';

describe('NotNumberedPaginationComponent', () => {
  let component: NotNumberedPaginationComponent;
  let fixture: ComponentFixture<NotNumberedPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotNumberedPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotNumberedPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
