import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionProfileComponent } from './companion-profile.component';

describe('CompanionProfileComponent', () => {
  let component: CompanionProfileComponent;
  let fixture: ComponentFixture<CompanionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanionProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
