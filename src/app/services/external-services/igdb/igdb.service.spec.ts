import { TestBed, inject } from '@angular/core/testing';

import { IgdbService } from './igdb.service';

describe('IgdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IgdbService]
    });
  });

  it('should ...', inject([IgdbService], (service: IgdbService) => {
    expect(service).toBeTruthy();
  }));
});
