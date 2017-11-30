import { TestBed, inject } from '@angular/core/testing';

import { ListCategoryService } from './list-category.service';

describe('ListCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListCategoryService]
    });
  });

  it('should be created', inject([ListCategoryService], (service: ListCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
