import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFrontComponent } from './create-front.component';

describe('CreateFrontComponent', () => {
  let component: CreateFrontComponent;
  let fixture: ComponentFixture<CreateFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
