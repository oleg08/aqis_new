import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionPopupComponent } from './connection-popup.component';
import {AppTestingModule} from '../../app-testing-module';

describe('ConnectionPopupComponent', () => {
  let component: ConnectionPopupComponent;
  let fixture: ComponentFixture<ConnectionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(ConnectionPopupComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
