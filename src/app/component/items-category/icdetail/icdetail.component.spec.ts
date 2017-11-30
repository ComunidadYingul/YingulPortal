import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcdetailComponent } from './icdetail.component';

describe('IcdetailComponent', () => {
  let component: IcdetailComponent;
  let fixture: ComponentFixture<IcdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
