import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdetailComponent } from './idetail.component';

describe('IdetailComponent', () => {
  let component: IdetailComponent;
  let fixture: ComponentFixture<IdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
