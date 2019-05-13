import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldComponentComponent } from './text-field-component.component';
import {AppTestingModule} from '../app-testing-module';

describe('TextFieldComponentComponent', () => {
  let component: TextFieldComponentComponent;
  let fixture: ComponentFixture<TextFieldComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(TextFieldComponentComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
