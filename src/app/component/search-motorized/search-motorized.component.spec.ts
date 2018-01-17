import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMotorizedComponent } from './search-motorized.component';

describe('SearchMotorizedComponent', () => {
  let component: SearchMotorizedComponent;
  let fixture: ComponentFixture<SearchMotorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMotorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMotorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
