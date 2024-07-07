import { TestBed } from '@angular/core/testing';

import { TablefetchService } from './tablefetch.service';

describe('TablefetchService', () => {
  let service: TablefetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablefetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
