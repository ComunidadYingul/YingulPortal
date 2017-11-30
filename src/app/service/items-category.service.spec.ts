import { TestBed, inject } from '@angular/core/testing';

import { ItemsCategoryService } from './items-category.service';

describe('ItemsCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsCategoryService]
    });
  });

  it('should be created', inject([ItemsCategoryService], (service: ItemsCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
