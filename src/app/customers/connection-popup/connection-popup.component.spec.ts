import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionPopupComponent } from './connection-popup.component';

describe('ConnectionPopupComponent', () => {
  let component: ConnectionPopupComponent;
  let fixture: ComponentFixture<ConnectionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
