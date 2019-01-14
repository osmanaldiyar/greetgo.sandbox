import { TestBed, inject } from '@angular/core/testing';

import { ClientsPageService } from './clients-page.service';

describe('ClientsPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientsPageService]
    });
  });

  it('should be created', inject([ClientsPageService], (service: ClientsPageService) => {
    expect(service).toBeTruthy();
  }));
});
