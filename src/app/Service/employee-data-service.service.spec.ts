import { TestBed } from '@angular/core/testing';

import { EmployeeDataServiceService } from './employee-data-service.service';

describe('EmployeeDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeDataServiceService = TestBed.get(EmployeeDataServiceService);
    expect(service).toBeTruthy();
  });
});
