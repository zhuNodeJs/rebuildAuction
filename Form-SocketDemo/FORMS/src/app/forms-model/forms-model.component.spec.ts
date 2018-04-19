import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModelComponent } from './forms-model.component';

describe('FormsModelComponent', () => {
  let component: FormsModelComponent;
  let fixture: ComponentFixture<FormsModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
