import { TestBed } from '@angular/core/testing';

import { SnackbarMessageService } from './snackbar-message-service';

describe('SnackbarMessageService', () => {
  let service: SnackbarMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
