import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCustomersDetailsComponent } from './pre-customers-details.component';

describe('PreCustomersDetailsComponent', () => {
  let component: PreCustomersDetailsComponent;
  let fixture: ComponentFixture<PreCustomersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreCustomersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCustomersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
