import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCloseableComponent } from './alert-closeable.component';
import {AppTestingModule} from '../app-testing-module';

describe('AlertCloseableComponent', () => {
  let component: AlertCloseableComponent;
  let fixture: ComponentFixture<AlertCloseableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(AlertCloseableComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
