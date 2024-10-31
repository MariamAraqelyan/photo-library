import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateDataComponent } from './animate-data.component';

describe('AnimateDataComponent', () => {
  let component: AnimateDataComponent;
  let fixture: ComponentFixture<AnimateDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimateDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
