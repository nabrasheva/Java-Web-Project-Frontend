import { TestBed } from '@angular/core/testing';

import { ResetPasswordEmailServiceService } from './reset-password-email.service.service';

describe('ResetPasswordEmailServiceService', () => {
  let service: ResetPasswordEmailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordEmailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
