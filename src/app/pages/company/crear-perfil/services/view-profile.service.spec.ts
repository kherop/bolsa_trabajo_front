import { TestBed } from '@angular/core/testing';

import { CompanyProfileService } from './view-profile.service';

xdescribe('ViewProfileService', () => {
  let service: CompanyProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
