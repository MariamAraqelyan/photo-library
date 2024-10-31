import { TestBed } from '@angular/core/testing';

import { PhotosService } from './photos.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '../interfaces/photo.interface';
import { DBMainService } from './dbmain.service';
import { PHOTOS } from '../../../../test-data/photos';
import { FAVORITES } from '../../../../test-data/favorites';

describe('PhotosService', () => {
  let service: PhotosService;
  let dbMainService: any;

  beforeEach(() => {
    dbMainService = jasmine.createSpyObj('DBMainService', ['getRange', 'load']);

    TestBed.configureTestingModule({
      providers: [
        PhotosService,
        { provide: DBMainService, useValue: dbMainService },
      ],
    });

    service = TestBed.inject(PhotosService);

    // service['dbMainService'] = dbMainService;
    service['updatePhotos'] = new BehaviorSubject<Photo[]>(PHOTOS);
    service['saveState'] = new BehaviorSubject<Photo[]>(FAVORITES);
    service['state'] = service['saveState'] as Observable<Photo[]>;
    service['totalPhotos'] = 100;
  });

  it('should add to favorite', () => {
    const selectFirst = PHOTOS[0];

    service.addToFavorite(PHOTOS[0]);
    const state = service['state'].subscribe((photos) => {
      const favorite = photos.find((p) => p.id === selectFirst.id);

      expect(favorite?.favorite).toBe(true, 'Favorite status not changed');
    });
  });

  it('should remove from favorite', () => {
    const selectFirst = FAVORITES[0];

    service.removeFromFavorite(selectFirst);
    const state = service['state'].subscribe((photos) => {
      const favorite = photos.find((p) => p.id === selectFirst.id);

      expect(favorite).toBe(undefined, 'Favorite status not changed');
    });
  });

  it('check favorite status of list after refresh', () => {
    const updatedPhotos = service.getFavoriteStatus(PHOTOS);

    expect(updatedPhotos[0].favorite).toBe(
      true,
      'Favorite status not updated after refresh'
    );
  });
});
