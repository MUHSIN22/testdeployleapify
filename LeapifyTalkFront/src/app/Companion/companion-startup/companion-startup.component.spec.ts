import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionStartupComponent } from './companion-startup.component';

describe('CompanionStartupComponent', () => {
  let component: CompanionStartupComponent;
  let fixture: ComponentFixture<CompanionStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanionStartupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
