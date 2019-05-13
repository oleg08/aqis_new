import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSlideComponent } from './select-slide.component';
import {AppTestingModule} from '../app-testing-module';

describe('SelectSlideComponent', () => {
  let component: SelectSlideComponent;
  let fixture: ComponentFixture<SelectSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(SelectSlideComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
