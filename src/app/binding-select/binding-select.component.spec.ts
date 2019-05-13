import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingSelectComponent } from './binding-select.component';
import {AppTestingModule} from '../app-testing-module';

describe('BindingSelectComponent', () => {
  let component: BindingSelectComponent;
  let fixture: ComponentFixture<BindingSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(BindingSelectComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
