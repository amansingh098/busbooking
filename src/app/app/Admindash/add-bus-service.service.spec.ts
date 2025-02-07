import { TestBed } from '@angular/core/testing';

import { AddBusServiceService } from './add-bus-service.service';

describe('AddBusServiceService', () => {
  let service: AddBusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
