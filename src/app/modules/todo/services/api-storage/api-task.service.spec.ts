import { TestBed, inject } from '@angular/core/testing';

import { ApiTasksService } from './api-tasks.service';

describe('LocalStorageTasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTasksService]
    });
  });

  it('should be created', inject([ApiTasksService], (service: ApiTasksService) => {
    expect(service).toBeTruthy();
  }));
});
