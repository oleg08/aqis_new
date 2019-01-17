import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionTimeComponent } from './connection-time.component';

describe('ConnectionTimeComponent', () => {
  let component: ConnectionTimeComponent;
  let fixture: ComponentFixture<ConnectionTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
