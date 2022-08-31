import { TestBed } from '@angular/core/testing';

import { StorageNativeService } from './storage-native.service';

describe('StorageNativeService', () => {
  let service: StorageNativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageNativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
