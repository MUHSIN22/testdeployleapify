import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionCardComponent } from './companion-card.component';

describe('CompanionCardComponent', () => {
  let component: CompanionCardComponent;
  let fixture: ComponentFixture<CompanionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
