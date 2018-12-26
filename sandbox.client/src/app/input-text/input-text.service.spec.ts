import { TestBed, inject } from '@angular/core/testing';

import { InputTextService } from './input-text.service';

describe('InputTextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputTextService]
    });
  });

  it('should be created', inject([InputTextService], (service: InputTextService) => {
    expect(service).toBeTruthy();
  }));
});
