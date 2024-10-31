import { TestBed } from '@angular/core/testing';

import { DBMainService } from './dbmain.service';

describe('DBMainService', () => {
  let service: DBMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
