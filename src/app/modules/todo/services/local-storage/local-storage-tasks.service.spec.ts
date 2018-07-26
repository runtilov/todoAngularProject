import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageTasksService } from './local-storage-tasks.service';

describe('LocalStorageTasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageTasksService]
    });
  });

  it('should be created', inject([LocalStorageTasksService], (service: LocalStorageTasksService) => {
    expect(service).toBeTruthy();
  }));
});
