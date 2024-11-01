import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { Photo } from '@interfaces/photo.interface';
import { PHOTOS } from '@testData/photos';

import { DBMainService } from './dbmain.service';

describe('DBMainService', () => {
  let service: DBMainService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });

    service = TestBed.inject(DBMainService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all photos from picsum open API', () => {
    service.load().subscribe((photos) => {
      expect(photos).toBeTruthy('No photos returned');

      expect(photos.length).toBe(39, 'incorrect number of photos');

      const photo = photos.find((photo) => photo.id === 10);

      expect(photo?.author).toBe('Paul Jarvis');
    });

    const req = httpTestingController.expectOne('https://picsum.photos/list');

    expect(req.request.method).toEqual('GET');

    // Pass test data on our httpRequest
    req.flush(PHOTOS);
  });

  it('should retrieve a range of photos from lower, upper arguments', fakeAsync(() => {
    service['fillDB'] = new BehaviorSubject<Photo[]>(PHOTOS);
    service['EmulatePhotosDB$'] =
    service['fillDB'].asObservable();

    service.getRange(2, 10).subscribe((photos) => {
      expect(photos).toBeTruthy('No photos returned');

      expect(photos.length).toBe(10, 'incorrect number of photos returned');

      const photo = photos.find((photo) => photo.id == 1016);

      expect(photo?.author).toBe('Philippe Wuyts');
    });

    tick(700);

    flush();
  }));

  it('check if db data is empty', () => {
    service['fillDB'] = new BehaviorSubject<Photo[]>(PHOTOS);

    let isEmpty = service.isEmpty();
    expect(isEmpty).toBe(false, 'Expected non empty database');

    service['fillDB'] = new BehaviorSubject<Photo[]>([]);

    isEmpty = service.isEmpty();
    expect(isEmpty).toBe(true, 'Expected non empty database');
  });
});
