import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmwsComponent } from './confirmws.component';

describe('ConfirmwsComponent', () => {
  let component: ConfirmwsComponent;
  let fixture: ComponentFixture<ConfirmwsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmwsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
