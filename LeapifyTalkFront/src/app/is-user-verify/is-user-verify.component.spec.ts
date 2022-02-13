import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsUserVerifyComponent } from './is-user-verify.component';

describe('IsUserVerifyComponent', () => {
  let component: IsUserVerifyComponent;
  let fixture: ComponentFixture<IsUserVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsUserVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsUserVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
