import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsByNameComponent } from './items-by-name.component';

describe('ItemsByNameComponent', () => {
  let component: ItemsByNameComponent;
  let fixture: ComponentFixture<ItemsByNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsByNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
