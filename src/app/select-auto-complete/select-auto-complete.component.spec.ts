import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAutoCompleteComponent } from './select-auto-complete.component';
import {AppTestingModule} from '../app-testing-module';

describe('SelectAutoCompleteComponent', () => {
  let component: SelectAutoCompleteComponent;
  let fixture: ComponentFixture<SelectAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(SelectAutoCompleteComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
