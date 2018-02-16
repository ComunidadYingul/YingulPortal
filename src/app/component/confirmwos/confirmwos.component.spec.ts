import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmwosComponent } from './confirmwos.component';

describe('ConfirmwosComponent', () => {
  let component: ConfirmwosComponent;
  let fixture: ComponentFixture<ConfirmwosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmwosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmwosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
