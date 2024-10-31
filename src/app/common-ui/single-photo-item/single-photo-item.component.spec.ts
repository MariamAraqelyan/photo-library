import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePhotoItemComponent } from './single-photo-item.component';

describe('SinglePhotoItemComponent', () => {
  let component: SinglePhotoItemComponent;
  let fixture: ComponentFixture<SinglePhotoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePhotoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePhotoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
