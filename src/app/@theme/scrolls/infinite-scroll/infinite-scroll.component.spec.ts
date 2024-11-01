import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollComponent } from './infinite-scroll.component';
import { PLATFORM_ID } from '@angular/core';

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteScrollComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: '' },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
