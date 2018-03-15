import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedPurchaseComponent } from './protected-purchase.component';

describe('ProtectedPurchaseComponent', () => {
  let component: ProtectedPurchaseComponent;
  let fixture: ComponentFixture<ProtectedPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectedPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
