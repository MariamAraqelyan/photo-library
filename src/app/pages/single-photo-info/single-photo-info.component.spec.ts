import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePhotoInfoComponent } from './single-photo-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SinglePhotoInfoComponent', () => {
  let component: SinglePhotoInfoComponent;
  let fixture: ComponentFixture<SinglePhotoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SinglePhotoInfoComponent,
        HttpClientModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePhotoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
