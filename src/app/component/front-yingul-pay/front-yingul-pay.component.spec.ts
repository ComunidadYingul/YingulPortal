import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontYingulPayComponent } from './front-yingul-pay.component';

describe('FrontYingulPayComponent', () => {
  let component: FrontYingulPayComponent;
  let fixture: ComponentFixture<FrontYingulPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontYingulPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontYingulPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
