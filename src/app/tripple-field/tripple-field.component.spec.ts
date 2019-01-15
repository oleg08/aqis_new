import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippleFieldComponent } from './tripple-field.component';

describe('TrippleFieldComponent', () => {
  let component: TrippleFieldComponent;
  let fixture: ComponentFixture<TrippleFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrippleFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrippleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
