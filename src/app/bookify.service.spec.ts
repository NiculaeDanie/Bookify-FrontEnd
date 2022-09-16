import { TestBed } from '@angular/core/testing';

import { BookifyService } from './bookify.service';

describe('BookifyService', () => {
  let service: BookifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
