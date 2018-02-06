import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFrontComponent } from './user-front.component';

describe('UserFrontComponent', () => {
  let component: UserFrontComponent;
  let fixture: ComponentFixture<UserFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
