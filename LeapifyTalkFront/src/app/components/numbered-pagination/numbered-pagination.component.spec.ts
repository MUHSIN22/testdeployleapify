import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberedPaginationComponent } from './numbered-pagination.component';

describe('NumberedPaginationComponent', () => {
  let component: NumberedPaginationComponent;
  let fixture: ComponentFixture<NumberedPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberedPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberedPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
