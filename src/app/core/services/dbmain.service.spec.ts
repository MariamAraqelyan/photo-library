import { TestBed } from '@angular/core/testing';

import { DBMainService } from './dbmain.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DBMainService', () => {
  let service: DBMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(DBMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
