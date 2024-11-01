import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, PLATFORM_ID } from '@angular/core';
import SpyObj = jasmine.SpyObj;

import { GalleryComponent } from './gallery.component';
import { PhotosService } from '@services/photos.service';
import { PHOTOS } from '@testData/photos';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SinglePhotoItemComponent } from '@commonUi/single-photo-item/single-photo-item.component';

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
    const route = { data: of({ data: PHOTOS }) } as any as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [
        GalleryComponent,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule, 
        RouterTestingModule,
        SinglePhotoItemComponent
      ],
      providers: [
        { provide: PLATFORM_ID, useValue: '' },
        { provide: PhotosService, usevalue: photosServiceSpy }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(GalleryComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      photoStore = TestBed.inject(PhotosService);
      router = TestBed.inject(ActivatedRoute);
    
    })

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only beginner', () => {
    photosServiceSpy.loadNext.and.returnValue(of(PHOTOS));
    fixture.detectChanges();
  });

  // it('add to favorite when click button', () => {
  //   fixture.detectChanges();

  //   spyOn(component, 'addToFavorite');

  //   let button = el.query(By.css('app-single-photo-item'));

  //   button.triggerEventHandler('addFavorite', null);
  //   fixture.whenStable().then(() => {
  //     expect(component.addToFavorite).toHaveBeenCalled();
  // });
  // });


});
