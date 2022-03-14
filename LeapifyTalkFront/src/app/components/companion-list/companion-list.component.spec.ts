import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionListComponent } from './companion-list.component';

describe('CompanionListComponent', () => {
  let component: CompanionListComponent;
  let fixture: ComponentFixture<CompanionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
