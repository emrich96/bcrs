import { TestBed } from '@angular/core/testing';

import { SecurityQuestion.ServiceService } from './security-question.service.service';

describe('SecurityQuestion.ServiceService', () => {
  let service: SecurityQuestion.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityQuestion.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
