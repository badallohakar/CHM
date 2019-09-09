import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePrfileComponent } from './employee-prfile.component';

describe('EmployeePrfileComponent', () => {
  let component: EmployeePrfileComponent;
  let fixture: ComponentFixture<EmployeePrfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePrfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePrfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
