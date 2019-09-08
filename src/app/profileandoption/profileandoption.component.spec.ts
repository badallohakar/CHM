import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileandoptionComponent } from './profileandoption.component';

describe('ProfileandoptionComponent', () => {
  let component: ProfileandoptionComponent;
  let fixture: ComponentFixture<ProfileandoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileandoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileandoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
