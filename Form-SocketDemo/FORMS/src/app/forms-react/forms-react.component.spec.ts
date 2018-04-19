import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsReactComponent } from './forms-react.component';

describe('FormsReactComponent', () => {
  let component: FormsReactComponent;
  let fixture: ComponentFixture<FormsReactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsReactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
