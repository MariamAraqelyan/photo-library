import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';
import { DebugElement, PLATFORM_ID } from '@angular/core';
import SpyObj = jasmine.SpyObj;

import { GalleryComponent } from './gallery.component';
import { PhotosService } from '@services/photos.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let el: DebugElement;
  let photoStore: any;
  let router: any;

  let photosServiceSpy: SpyObj<PhotosService>;

  beforeEach(async () => {
    photosServiceSpy = jasmine.createSpyObj('PhotosService', [
      'loadNext',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        GalleryComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PLATFORM_ID, useValue: '' },
        { provide: PhotosService, usevalue: photosServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([
          { path: '', component: GalleryComponent }
        ])
      ],
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(GalleryComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    })

    photoStore = TestBed.inject(PhotosService);
    router = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
