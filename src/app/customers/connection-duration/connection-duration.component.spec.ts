import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionDurationComponent } from './connection-duration.component';
import {AppTestingModule} from '../../app-testing-module';

describe('ConnectionDurationComponent', () => {
  let component: ConnectionDurationComponent;
  let fixture: ComponentFixture<ConnectionDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(ConnectionDurationComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
