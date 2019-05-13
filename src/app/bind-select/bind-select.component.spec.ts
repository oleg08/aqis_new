import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindSelectComponent } from './bind-select.component';
import {AppTestingModule} from '../app-testing-module';

describe('BindSelectComponent', () => {
  let component: BindSelectComponent;
  let fixture: ComponentFixture<BindSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(BindSelectComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
