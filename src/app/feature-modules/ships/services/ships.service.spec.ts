/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShipsService } from './ships.service';

describe('Service: Ships', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipsService]
    });
  });

  it('should ...', inject([ShipsService], (service: ShipsService) => {
    expect(service).toBeTruthy();
  }));
});
