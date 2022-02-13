import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspiredComponent } from './inspired.component';

describe('InspiredComponent', () => {
  let component: InspiredComponent;
  let fixture: ComponentFixture<InspiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
