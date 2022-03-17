import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionHomeComponent } from './companion-home.component';

describe('CompanionHomeComponent', () => {
  let component: CompanionHomeComponent;
  let fixture: ComponentFixture<CompanionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanionHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
