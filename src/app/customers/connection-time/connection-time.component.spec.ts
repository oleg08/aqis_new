import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionTimeComponent } from './connection-time.component';
import {AppTestingModule} from '../../app-testing-module';

describe('ConnectionTimeComponent', () => {
  let component: ConnectionTimeComponent;
  let fixture: ComponentFixture<ConnectionTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
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
