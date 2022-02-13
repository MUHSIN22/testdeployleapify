import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndUploadComponent } from './drag-and-upload.component';

describe('DragAndUploadComponent', () => {
  let component: DragAndUploadComponent;
  let fixture: ComponentFixture<DragAndUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
