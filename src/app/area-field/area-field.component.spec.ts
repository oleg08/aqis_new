import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFieldComponent } from './area-field.component';
import {AppTestingModule} from '../app-testing-module';

describe('AreaFieldComponent', () => {
  let component: AreaFieldComponent;
  let fixture: ComponentFixture<AreaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(AreaFieldComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
