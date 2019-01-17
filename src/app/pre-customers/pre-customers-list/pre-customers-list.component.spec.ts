import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCustomersListComponent } from './pre-customers-list.component';

describe('PreCustomersListComponent', () => {
  let component: PreCustomersListComponent;
  let fixture: ComponentFixture<PreCustomersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreCustomersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
