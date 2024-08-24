import { TestBed } from '@angular/core/testing';

import { NylasService } from './nylas.service';

describe('NylasService', () => {
  let service: NylasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NylasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
