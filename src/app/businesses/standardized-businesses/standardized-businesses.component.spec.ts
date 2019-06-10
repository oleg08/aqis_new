import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardizedBusinessesComponent } from './standardized-businesses.component';

describe('StandardizedBusinessesComponent', () => {
  let component: StandardizedBusinessesComponent;
  let fixture: ComponentFixture<StandardizedBusinessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardizedBusinessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardizedBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
